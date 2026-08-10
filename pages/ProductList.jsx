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
     * Get unique categories
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
     * Search + filter + sort
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

        // Sort
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

    const scrollToProducts = () => {
        document
            .getElementById("products")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    };

    return (
        <main className="min-h-screen bg-[#f8f8f8]">

            {/* =====================================================
                HERO
            ====================================================== */}
            <section className="px-3 pt-4 sm:px-4 lg:px-3">
                <div
                    className="
                        relative
                        mx-auto
                        min-h-[600px]
                        max-w-[1500px]
                        overflow-hidden

                        rounded-[32px]

                        border
                        border-[#ddd6c8]

                        bg-[#f3f0e9]

                        sm:min-h-[620px]
                        lg:min-h-[650px]
                    "
                >

                    {/* =============================================
                        TOP LABELS
                    ============================================== */}
                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            top-0
                            z-30

                            flex
                            items-center
                            justify-between

                            px-7
                            pt-9

                            sm:px-10

                            lg:px-14
                            lg:pt-12
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-[#060b18]

                                sm:text-xs
                            "
                        >
                            ProspectPick
                        </p>

                        <p
                            className="
                                hidden

                                text-[10px]
                                uppercase
                                tracking-[0.22em]
                                text-[#374151]

                                sm:block
                                sm:text-xs
                            "
                        >
                            Everyday products, curated
                        </p>
                    </div>


                    {/* =============================================
                        CENTER CONTENT
                    ============================================== */}
                    <div
                        className="
                            absolute
                            inset-0

                            flex
                            flex-col
                            items-center
                            justify-center

                            px-6
                            pb-16
                            pt-20

                            text-center
                        "
                    >

                        {/* Small title */}
                        <p
                            className="
                                mb-8

                                text-[11px]
                                font-medium
                                uppercase
                                tracking-[0.42em]
                                text-[#060b18]

                                sm:text-xs

                                lg:text-sm
                            "
                        >
                            Find your next
                        </p>


                        {/* Giant PICK */}
                        <h1
                            className="
                                select-none

                                text-[clamp(8rem,25vw,23rem)]
                                font-black
                                leading-[0.68]
                                tracking-[-0.11em]
                                text-[#060b18]
                            "
                        >
                            PICK
                        </h1>


                       
                    </div>


                    {/* =============================================
                        DECORATIVE LEFT LINE
                    ============================================== */}
                    <div
                        className="
                            absolute
                            left-8
                            top-1/2

                            hidden
                            h-px
                            w-20
                            bg-[#b9b2a6]

                            lg:block
                        "
                    />


                    {/* =============================================
                        DECORATIVE RIGHT LINE
                    ============================================== */}
                    <div
                        className="
                            absolute
                            right-8
                            top-1/2

                            hidden
                            h-px
                            w-20
                            bg-[#b9b2a6]

                            lg:block
                        "
                    />


                    {/* =============================================
                        BOTTOM CTA
                    ============================================== */}
                    <button
                        type="button"
                        onClick={scrollToProducts}
                        className="
                            absolute
                            bottom-8
                            left-7
                            z-30

                            cursor-pointer

                            rounded-full
                            bg-[#060b18]

                            px-6
                            py-4

                            text-xs
                            font-bold
                            text-white

                            transition-all
                            duration-300

                            hover:-translate-y-1
                            hover:bg-[#171d2c]
                            hover:shadow-lg

                            active:translate-y-0
                            active:scale-[0.98]

                            sm:left-10
                            sm:text-sm

                            lg:bottom-9
                            lg:left-14
                        "
                    >
                        Shop all products

                        <span className="ml-2">
                            →
                        </span>
                    </button>


                    {/* =============================================
                        BOTTOM CATEGORIES
                    ============================================== */}
                    <p
                        className="
                            absolute
                            bottom-10
                            right-14
                            z-30

                            hidden

                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-[#4b5563]

                            md:block

                            lg:text-xs
                        "
                    >
                        Wood

                        <span className="mx-2 text-[#a1a1aa]">
                            ·
                        </span>

                        Household

                        <span className="mx-2 text-[#a1a1aa]">
                            ·
                        </span>

                        Metal

                        <span className="mx-2 text-[#a1a1aa]">
                            ·
                        </span>

                        Plastic
                    </p>

                </div>
            </section>


            {/* =====================================================
                PRODUCTS SECTION
            ====================================================== */}
            <section
                id="products"
                className="
                    mx-auto
                    max-w-7xl

                    px-5
                    py-16

                    sm:px-6

                    lg:px-8
                "
            >

                {/* =============================================
                    HEADING
                ============================================== */}
                <div
                    className="
                        mb-8

                        flex
                        flex-col
                        justify-between
                        gap-4

                        sm:flex-row
                        sm:items-end
                    "
                >
                    <div>
                        <p
                            className="
                                mb-2

                                text-sm
                                font-semibold
                                uppercase
                                tracking-widest
                                text-gray-400
                            "
                        >
                            Collection
                        </p>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                tracking-tight
                                text-gray-950

                                sm:text-4xl
                            "
                        >
                            Shop Products
                        </h2>

                        {!loading && !error && (
                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                "
                            >
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "product"
                                    : "products"}{" "}
                                found
                            </p>
                        )}
                    </div>
                </div>


                {/* =================================================
                    SEARCH + SORT
                ================================================== */}
                <div
                    className="
                        mb-6

                        flex
                        flex-col
                        gap-3

                        sm:flex-row
                    "
                >

                    {/* SEARCH */}
                    <div className="relative flex-1">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="
                                absolute
                                left-4
                                top-1/2

                                h-5
                                w-5

                                -translate-y-1/2

                                text-gray-400
                            "
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
                            className="
                                h-12
                                w-full

                                rounded-2xl

                                border
                                border-gray-200

                                bg-white

                                pl-12
                                pr-12

                                text-sm
                                text-gray-900

                                outline-none

                                transition

                                placeholder:text-gray-400

                                focus:border-gray-400
                                focus:ring-4
                                focus:ring-gray-100
                            "
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="
                                    absolute
                                    right-4
                                    top-1/2

                                    -translate-y-1/2

                                    text-xl
                                    text-gray-400

                                    transition

                                    hover:text-gray-800
                                "
                            >
                                ×
                            </button>
                        )}
                    </div>


                    {/* SORT */}
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                        className="
                            h-12

                            cursor-pointer

                            rounded-2xl

                            border
                            border-gray-200

                            bg-white

                            px-4

                            text-sm
                            font-medium
                            text-gray-700

                            outline-none

                            transition

                            focus:border-gray-400
                            focus:ring-4
                            focus:ring-gray-100

                            sm:min-w-[190px]
                        "
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


                {/* =================================================
                    CATEGORY FILTERS
                ================================================== */}
                {categories.length > 1 && (
                    <div
                        className="
                            mb-10

                            flex
                            gap-2

                            overflow-x-auto

                            pb-2
                        "
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() =>
                                    setSelectedCategory(category)
                                }
                                className={`
                                    cursor-pointer
                                    whitespace-nowrap

                                    rounded-full

                                    px-5
                                    py-2.5

                                    text-sm
                                    font-medium

                                    transition

                                    ${
                                    selectedCategory === category
                                        ? "bg-gray-950 text-white"
                                        : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950"
                                }
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}


                {/* =================================================
                    LOADING
                ================================================== */}
                {loading && (
                    <div
                        className="
                            grid
                            grid-cols-1

                            gap-6

                            sm:grid-cols-2

                            lg:grid-cols-3

                            xl:grid-cols-4
                        "
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(
                            (item) => (
                                <ProductSkeleton
                                    key={item}
                                />
                            )
                        )}
                    </div>
                )}


                {/* =================================================
                    ERROR
                ================================================== */}
                {!loading && error && (
                    <div
                        className="
                            rounded-3xl

                            border
                            border-gray-200

                            bg-white

                            px-6
                            py-16

                            text-center
                        "
                    >
                        <div
                            className="
                                mx-auto
                                mb-5

                                flex
                                h-14
                                w-14
                                items-center
                                justify-center

                                rounded-full
                                bg-gray-100
                            "
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="
                                    h-6
                                    w-6
                                    text-gray-600
                                "
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

                        <h3
                            className="
                                text-lg
                                font-semibold
                                text-gray-950
                            "
                        >
                            Couldn't load products
                        </h3>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-gray-500
                            "
                        >
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
                            className="
                                mt-6

                                rounded-full
                                bg-gray-950

                                px-6
                                py-2.5

                                text-sm
                                font-semibold
                                text-white

                                transition

                                hover:bg-gray-800
                            "
                        >
                            Try again
                        </button>
                    </div>
                )}


                {/* =================================================
                    PRODUCTS
                ================================================== */}
                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (
                        <div
                            className="
                                grid
                                grid-cols-1

                                gap-x-5
                                gap-y-8

                                sm:grid-cols-2

                                lg:grid-cols-3

                                xl:grid-cols-4
                            "
                        >
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


                {/* =================================================
                    EMPTY STATE
                ================================================== */}
                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (
                        <div
                            className="
                                rounded-3xl

                                border
                                border-gray-200

                                bg-white

                                py-20

                                text-center
                            "
                        >
                            <div
                                className="
                                    mx-auto
                                    mb-5

                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center

                                    rounded-full
                                    bg-gray-100
                                "
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="
                                        h-7
                                        w-7
                                        text-gray-500
                                    "
                                >
                                    <circle
                                        cx="11"
                                        cy="11"
                                        r="7"
                                    />

                                    <path d="m20 20-3.5-3.5" />
                                </svg>
                            </div>

                            <h3
                                className="
                                    text-xl
                                    font-semibold
                                    text-gray-950
                                "
                            >
                                No products found
                            </h3>

                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-gray-500
                                "
                            >
                                Try changing your search or category.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory("All");
                                    setSortBy("default");
                                }}
                                className="
                                    mt-6

                                    rounded-full
                                    bg-gray-950

                                    px-6
                                    py-2.5

                                    text-sm
                                    font-semibold
                                    text-white

                                    transition

                                    hover:bg-gray-800
                                "
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
            </section>
        </main>
    );
}


/* =====================================================
    LOADING SKELETON
====================================================== */
function ProductSkeleton() {
    return (
        <div className="animate-pulse">
            <div
                className="
                    aspect-[4/5]
                    rounded-3xl
                    bg-gray-200
                "
            />

            <div className="mt-4">
                <div
                    className="
                        h-3
                        w-20
                        rounded
                        bg-gray-200
                    "
                />

                <div
                    className="
                        mt-3
                        h-5
                        w-3/4
                        rounded
                        bg-gray-200
                    "
                />

                <div
                    className="
                        mt-3
                        h-4
                        w-24
                        rounded
                        bg-gray-200
                    "
                />
            </div>
        </div>
    );
}

export default ProductList;