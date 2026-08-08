import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";

function ProductList() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${BASE_URL}/api/products/`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                setProducts(data);
            } catch (error) {
                console.error("Product fetch error:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [BASE_URL, reloadKey]);

    /*
     * Get unique categories from products
     */
    const categories = useMemo(() => {
        const productCategories = products
            .map((product) => product.category?.name)
            .filter(Boolean);

        return [
            "All",
            ...new Set(productCategories),
        ];
    }, [products]);

    /*
     * Search + filter + sorting
     */
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter((product) => {
                return (
                    product.name
                        ?.toLowerCase()
                        .includes(query) ||
                    product.description
                        ?.toLowerCase()
                        .includes(query) ||
                    product.category?.name
                        ?.toLowerCase()
                        .includes(query)
                );
            });
        }

        // Category
        if (selectedCategory !== "All") {
            result = result.filter(
                (product) =>
                    product.category?.name ===
                    selectedCategory
            );
        }

        // Sorting
        switch (sortBy) {
            case "price-low":
                result.sort(
                    (a, b) =>
                        Number(a.price) - Number(b.price)
                );
                break;

            case "price-high":
                result.sort(
                    (a, b) =>
                        Number(b.price) - Number(a.price)
                );
                break;

            case "name":
                result.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            default:
                break;
        }

        return result;
    }, [
        products,
        search,
        selectedCategory,
        sortBy,
    ]);

    return (
        <main className="min-h-screen bg-[#f8f8f8]">

            {/* =========================
                HERO
            ========================== */}
            <section className="px-5 pt-10 sm:px-6 lg:px-8">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-gray-950 px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-24">

                    {/* Decorative backgrounds */}
                    <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

                    <div className="relative z-10 max-w-2xl">
                        <div className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-gray-200 backdrop-blur-md">
                            Explore our collection
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Find something
                            <span className="block text-gray-400">
                                made for you.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
                            Browse our latest products,
                            discover new items, and find
                            exactly what you're looking for.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                document
                                    .getElementById("products")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                    });
                            }}
                            className="mt-8 cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gray-200 active:scale-[0.98]"
                        >
                            Shop products
                        </button>
                    </div>
                </div>
            </section>


            {/* =========================
                PRODUCT SECTION
            ========================== */}
            <section
                id="products"
                className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8"
            >

                {/* Heading */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
                            Collection
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                            Shop Products
                        </h2>

                        {!loading && !error && (
                            <p className="mt-2 text-sm text-gray-500">
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "product"
                                    : "products"}{" "}
                                found
                            </p>
                        )}
                    </div>
                </div>


                {/* =========================
                    SEARCH + SORT
                ========================== */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row">

                    {/* Search */}
                    <div className="relative flex-1">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="7"
                            />
                            <path d="m20 20-3.5-3.5" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="h-12 w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800"
                            >
                                ×
                            </button>
                        )}
                    </div>


                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                        className="h-12 rounded-2xl border cursor-pointer border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-gray-400 focus:ring-4 focus:ring-gray-100 sm:min-w-[190px]"
                    >
                        <option value="default">
                            Sort by
                        </option>

                        <option value="name">
                            Name A-Z
                        </option>

                        <option value="price-low">
                            Price: Low to High
                        </option>

                        <option value="price-high">
                            Price: High to Low
                        </option>
                    </select>
                </div>


                {/* =========================
                    CATEGORY FILTERS
                ========================== */}
                {categories.length > 1 && (
                    <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                                className={`cursor-pointer whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                                    selectedCategory ===
                                    category
                                        ? "bg-gray-950 text-white"
                                        : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}


                {/* =========================
                    LOADING
                ========================== */}
                {loading && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(
                            (item) => (
                                <ProductSkeleton
                                    key={item}
                                />
                            )
                        )}
                    </div>
                )}


                {/* =========================
                    ERROR
                ========================== */}
                {!loading && error && (
                    <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
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

                        <h3 className="text-lg font-semibold text-gray-950">
                            Couldn't load products
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {error.message}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setReloadKey(
                                    (previous) =>
                                        previous + 1
                                )
                            }
                            className="mt-6 rounded-full bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                        >
                            Try again
                        </button>
                    </div>
                )}


                {/* =========================
                    PRODUCTS
                ========================== */}
                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (
                        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProducts.map(
                                (product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                )
                            )}
                        </div>
                    )}


                {/* =========================
                    EMPTY STATE
                ========================== */}
                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (
                        <div className="rounded-3xl border border-gray-200 bg-white py-20 text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-7 w-7 text-gray-500"
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="7"
                                    />
                                    <path d="m20 20-3.5-3.5" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-950">
                                No products found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Try changing your search or
                                category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory(
                                        "All"
                                    );
                                    setSortBy("default");
                                }}
                                className="mt-6 rounded-full bg-gray-950 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
            </section>
        </main>
    );
}


/*
 * Loading skeleton
 */
function ProductSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="aspect-[4/5] rounded-3xl bg-gray-200" />

            <div className="mt-4">
                <div className="h-3 w-20 rounded bg-gray-200" />

                <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />

                <div className="mt-3 h-4 w-24 rounded bg-gray-200" />
            </div>
        </div>
    );
}

export default ProductList;