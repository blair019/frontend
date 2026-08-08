import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function ProductDetails() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${BASE_URL}/api/product/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Failed to load product."
                    );
                }

                const data = await response.json();

                setProduct(data);
            } catch (error) {
                console.error(
                    "Product fetch error:",
                    error
                );

                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, BASE_URL]);

    const handleAddToCart = async () => {
        if (!localStorage.getItem("access_token")) {
            navigate("/login");
            return;
        }

        try {
            setAdding(true);

            await addToCart(product.id);

            setAdded(true);

            setTimeout(() => {
                setAdded(false);
            }, 1800);
        } catch (error) {
            console.error(
                "Failed to add product:",
                error
            );
        } finally {
            setAdding(false);
        }
    };

    /*
     * Support both:
     * /media/image.jpg
     *
     * and:
     * http://127.0.0.1:8000/media/image.jpg
     */
    const productImage = product?.image?.startsWith(
        "http"
    )
        ? product.image
        : `${BASE_URL}${product?.image || ""}`;

    /*
     * LOADING
     */
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f8f8f8] px-5 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white">
                        <div className="grid md:grid-cols-2">

                            <div className="aspect-square animate-pulse bg-gray-200 md:aspect-auto md:min-h-[620px]" />

                            <div className="bg-[#f4efe7] p-8 sm:p-10 lg:p-14">
                                <div className="h-4 w-24 animate-pulse rounded bg-[#ded5c9]" />

                                <div className="mt-5 h-10 w-3/4 animate-pulse rounded bg-[#ded5c9]" />

                                <div className="mt-6 h-8 w-32 animate-pulse rounded bg-[#ded5c9]" />

                                <div className="mt-8 space-y-3">
                                    <div className="h-4 animate-pulse rounded bg-[#ded5c9]" />
                                    <div className="h-4 animate-pulse rounded bg-[#ded5c9]" />
                                    <div className="h-4 w-3/4 animate-pulse rounded bg-[#ded5c9]" />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * ERROR
     */
    if (error) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f8f8] px-5">
                <div className="max-w-md rounded-[28px] border border-gray-200 bg-white p-10 text-center">

                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-6 w-6 text-gray-600"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="9"
                            />

                            <path d="M12 8v5" />
                            <path d="M12 17h.01" />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-950">
                        Product unavailable
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {error.message}
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-flex rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Back to products
                    </Link>

                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                No product found.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8f8f8] px-5 py-10 sm:px-6 lg:px-8 lg:py-16">

            <div className="mx-auto max-w-6xl">

                {/* =========================
                    BACK NAVIGATION
                ========================== */}
                <div className="mb-6">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-950"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 12H5M11 18l-6-6 6-6"
                            />
                        </svg>

                        Back to products
                    </Link>
                </div>


                {/* =========================
                    PRODUCT
                ========================== */}
                <section className="overflow-hidden rounded-[32px] border border-[#d8cfc2] bg-white shadow-sm">

                    <div className="grid md:grid-cols-2">

                        {/* =========================
                            IMAGE SIDE
                        ========================== */}
                        <div className="relative min-h-[420px] overflow-hidden bg-[#eeeeec] sm:min-h-[520px] md:min-h-[650px]">

                            <img
                                src={productImage}
                                alt={product.name}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                            />

                            {/* Category badge */}
                            {product.category?.name && (
                                <span className="absolute left-5 top-5 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-md">
                                    {product.category.name}
                                </span>
                            )}

                        </div>


                        {/* =========================
                            DETAILS SIDE
                        ========================== */}
                        <div className="flex bg-[#f4efe7]">

                            <div className="flex w-full flex-col p-7 sm:p-10 lg:p-14">

                                {/* Category label */}
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#927f6b]">
                                    {product.category?.name ||
                                        "Product"}
                                </p>


                                {/* Product title */}
                                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#1f1f1f] sm:text-5xl">
                                    {product.name}
                                </h1>


                                {/* Price */}
                                <div className="mt-6">
                                    <span className="inline-flex rounded-full border border-[#d3c6b6] bg-[#e9dfd2] px-5 py-2.5 text-xl font-bold text-[#25221f]">
                                        $
                                        {Number(
                                            product.price
                                        ).toFixed(2)}
                                    </span>
                                </div>


                                {/* Divider */}
                                <div className="my-8 h-px bg-[#d8cfc2]" />


                                {/* Description */}
                                <div>
                                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#927f6b]">
                                        Description
                                    </p>

                                    <p className="text-[15px] leading-7 text-[#665d53]">
                                        {product.description ||
                                            "No description available for this product."}
                                    </p>
                                </div>


                                {/* =========================
                                    PRODUCT INFO
                                ========================== */}
                                <div className="mt-8 grid grid-cols-2 gap-3">

                                    <div className="rounded-[18px] border border-[#d8cfc2] bg-[#eee6dc] p-4">
                                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="h-4 w-4 text-[#514a43]"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M20 7 12 3 4 7v10l8 4 8-4V7Z"
                                                />

                                                <path d="m4 7 8 4 8-4M12 11v10" />
                                            </svg>
                                        </div>

                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#927f6b]">
                                            Product
                                        </p>

                                        <p className="mt-1 truncate text-sm font-semibold text-[#282521]">
                                            {product.name}
                                        </p>
                                    </div>


                                    <div className="rounded-[18px] border border-[#d8cfc2] bg-[#eee6dc] p-4">
                                        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/70">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                                className="h-4 w-4 text-[#514a43]"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 3v13M7 8l5-5 5 5"
                                                />
                                            </svg>
                                        </div>

                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#927f6b]">
                                            Category
                                        </p>

                                        <p className="mt-1 truncate text-sm font-semibold text-[#282521]">
                                            {product.category
                                                    ?.name ||
                                                "General"}
                                        </p>
                                    </div>

                                </div>


                                {/* Push buttons down */}
                                <div className="mt-auto pt-10">

                                    {/* ADD TO CART */}
                                    <button
                                        type="button"
                                        onClick={
                                            handleAddToCart
                                        }
                                        disabled={adding}
                                        className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-semibold transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed ${
                                            added
                                                ? "bg-green-700 text-white"
                                                : "bg-[#24211e] text-white hover:bg-black"
                                        }`}
                                    >
                                        {adding ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                                Adding...
                                            </>
                                        ) : added ? (
                                            <>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m5 12 4 4L19 6"
                                                    />
                                                </svg>

                                                Added to cart
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.8"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 7h12l-1 13H7L6 7Z"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 9V6a3 3 0 0 1 6 0v3"
                                                    />

                                                    <path
                                                        strokeLinecap="round"
                                                        d="M12 12v4M10 14h4"
                                                    />
                                                </svg>

                                                Add to cart
                                            </>
                                        )}
                                    </button>


                                    {/* Secondary */}
                                    <div className="mt-3 grid grid-cols-2 gap-3">

                                        <Link
                                            to="/"
                                            className="flex items-center justify-center rounded-full border border-[#cfc3b5] px-5 py-3 text-xs font-semibold text-[#50483f] transition hover:bg-[#e9dfd2]"
                                        >
                                            Continue shopping
                                        </Link>

                                        <Link
                                            to="/cart"
                                            className="flex items-center justify-center rounded-full border border-[#cfc3b5] px-5 py-3 text-xs font-semibold text-[#50483f] transition hover:bg-[#e9dfd2]"
                                        >
                                            View cart
                                        </Link>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}

export default ProductDetails;