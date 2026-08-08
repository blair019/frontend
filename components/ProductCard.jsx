import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function ProductCard({ product }) {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const { addToCart } = useCart();
    const navigate = useNavigate();

    const productImage = product.image?.startsWith("http")
        ? product.image
        : `${BASE_URL}${product.image}`;

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!localStorage.getItem("access_token")) {
            navigate("/login");
            return;
        }

        try {
            await addToCart(product.id);
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    return (
        <article className="group overflow-hidden rounded-[28px] border border-[#d8cfc2] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* =========================
                PRODUCT IMAGE
            ========================== */}
            <div className="relative overflow-hidden bg-gray-100">

                <Link to={`/product/${product.id}`}>
                    <div className="aspect-[4/5] overflow-hidden">
                        <img
                            src={productImage}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                    </div>
                </Link>

                {/* Category */}
                {product.category?.name && (
                    <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3.5 py-2 text-[11px] font-semibold text-gray-700 shadow-sm backdrop-blur-md">
                        {product.category.name}
                    </span>
                )}

                {/* Quick add */}
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white active:scale-95"
                    aria-label={`Add ${product.name} to cart`}
                >
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
                </button>
            </div>


            {/* =========================
                CONNECTED DETAILS
            ========================== */}
            <div className="border-t border-[#d8cfc2] bg-[#f4efe7] p-5">

                {/* Name + Price */}
                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0 flex-1">

                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#927f6b]">
                            {product.category?.name || "Product"}
                        </p>

                        <Link to={`/product/${product.id}`}>
                            <h2 className="truncate text-[18px] font-semibold tracking-tight text-[#1f1f1f] transition-colors hover:text-[#756657]">
                                {product.name}
                            </h2>
                        </Link>

                    </div>

                    <span className="rounded-full border border-[#d3c6b6] bg-[#e9dfd2] px-3 py-1.5 text-sm font-bold text-[#25221f]">
                        ${Number(product.price).toFixed(2)}
                    </span>
                </div>


                {/* Description */}
                {product.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#746b61]">
                        {product.description}
                    </p>
                )}


                {/* Divider */}
                <div className="my-4 h-px bg-[#d8cfc2]" />


                {/* Bottom actions */}
                <div className="flex items-center justify-between gap-3">

                    <Link
                        to={`/product/${product.id}`}
                        className="group/link inline-flex items-center gap-2 text-xs font-semibold text-[#50483f] transition hover:text-black"
                    >
                        View product

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14M13 6l6 6-6 6"
                            />
                        </svg>
                    </Link>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="cursor-pointer rounded-full bg-[#24211e] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-black active:scale-95"
                    >
                        Add to cart
                    </button>

                </div>
            </div>
        </article>
    );
}

export default ProductCard;