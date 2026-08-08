import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateCartItems,
        total,
    } = useCart();

    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const cartCount = cartItems.reduce(
        (count, item) =>
            count + Number(item.quantity || 0),
        0
    );

    const formatPrice = (price) => {
        return Number(price || 0).toFixed(2);
    };

    const getImageUrl = (image) => {
        if (!image) return "";

        return image.startsWith("http")
            ? image
            : `${BASE_URL}${image}`;
    };

    return (
        <main className="min-h-screen bg-[#f7f7f5] px-5 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* =========================
                    PAGE HEADER
                ========================== */}
                <div className="mb-10">

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#927f6b]">
                        Your bag
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f1f1d] sm:text-5xl">
                                Shopping Cart
                            </h1>

                            <p className="mt-3 text-sm text-[#746b61]">
                                {cartItems.length > 0
                                    ? `${cartCount} ${
                                        cartCount === 1
                                            ? "item"
                                            : "items"
                                    } in your cart`
                                    : "Your cart is currently empty"}
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#50483f] transition hover:text-black"
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

                            Continue shopping
                        </Link>

                    </div>
                </div>


                {/* =========================
                    EMPTY CART
                ========================== */}
                {cartItems.length === 0 ? (

                    <div className="flex min-h-[480px] items-center justify-center rounded-[32px] border border-[#ddd8d0] bg-[#f4efe7] px-6">

                        <div className="max-w-md text-center">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8cfc2] bg-white">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    className="h-8 w-8 text-[#64594e]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17"
                                    />

                                    <circle
                                        cx="8"
                                        cy="19"
                                        r="1"
                                    />

                                    <circle
                                        cx="17"
                                        cy="19"
                                        r="1"
                                    />
                                </svg>

                            </div>

                            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#24211e]">
                                Your cart is empty
                            </h2>

                            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#746b61]">
                                Looks like you haven't added
                                anything yet. Explore our products
                                and find something you like.
                            </p>

                            <Link
                                to="/"
                                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#24211e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-black active:scale-[0.98]"
                            >
                                Browse products

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14M13 6l6 6-6 6"
                                    />
                                </svg>
                            </Link>

                        </div>
                    </div>

                ) : (

                    /* =========================
                        CART LAYOUT
                    ========================== */
                    <div className="grid gap-7 lg:grid-cols-[1fr_380px]">

                        {/* =========================
                            CART PRODUCTS
                        ========================== */}
                        <section className="overflow-hidden rounded-[30px] border border-[#ddd8d0] bg-white">

                            {/* Header */}
                            <div className="flex items-center justify-between border-b border-[#e5e0d9] px-6 py-5 sm:px-7">

                                <div>
                                    <h2 className="text-lg font-semibold text-[#24211e]">
                                        Cart items
                                    </h2>

                                    <p className="mt-1 text-xs text-[#8a8075]">
                                        Review your products before
                                        checkout
                                    </p>
                                </div>

                                <span className="rounded-full border border-[#ddd5ca] bg-[#f4efe7] px-3 py-1.5 text-xs font-semibold text-[#64594e]">
                                    {cartCount}{" "}
                                    {cartCount === 1
                                        ? "item"
                                        : "items"}
                                </span>

                            </div>


                            {/* Products */}
                            <div>
                                {cartItems.map((item, index) => {

                                    const subtotal =
                                        Number(
                                            item.product_price
                                        ) *
                                        Number(
                                            item.quantity
                                        );

                                    return (
                                        <div
                                            key={item.id}
                                            className={`p-5 sm:p-7 ${
                                                index !==
                                                cartItems.length -
                                                1
                                                    ? "border-b border-[#e8e3dc]"
                                                    : ""
                                            }`}
                                        >

                                            <div className="flex flex-col gap-5 sm:flex-row">

                                                {/* =========================
                                                    IMAGE
                                                ========================== */}
                                                <div className="relative shrink-0 overflow-hidden rounded-[20px] border border-[#e1ddd6] bg-[#efefed]">

                                                    {item.product_image ? (
                                                        <img
                                                            src={getImageUrl(
                                                                item.product_image
                                                            )}
                                                            alt={
                                                                item.product_name
                                                            }
                                                            className="h-44 w-full object-cover sm:h-36 sm:w-36"
                                                        />
                                                    ) : (
                                                        <div className="flex h-44 w-full items-center justify-center text-gray-400 sm:h-36 sm:w-36">
                                                            No image
                                                        </div>
                                                    )}

                                                </div>


                                                {/* =========================
                                                    DETAILS
                                                ========================== */}
                                                <div className="flex min-w-0 flex-1 flex-col justify-between">

                                                    {/* Top */}
                                                    <div className="flex items-start justify-between gap-4">

                                                        <div className="min-w-0">

                                                            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#9a8977]">
                                                                Product
                                                            </p>

                                                            <h3 className="truncate text-xl font-semibold tracking-tight text-[#24211e]">
                                                                {
                                                                    item.product_name
                                                                }
                                                            </h3>

                                                            <p className="mt-2 text-sm text-[#746b61]">
                                                                $
                                                                {formatPrice(
                                                                    item.product_price
                                                                )}{" "}
                                                                each
                                                            </p>

                                                        </div>


                                                        {/* Remove */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeFromCart(
                                                                    item.id
                                                                )
                                                            }
                                                            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#ded8d0] text-[#8b8177] transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                            aria-label={`Remove ${item.product_name}`}
                                                        >
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                className="h-4 w-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    d="M6 6l12 12M18 6 6 18"
                                                                />
                                                            </svg>
                                                        </button>

                                                    </div>


                                                    {/* Bottom */}
                                                    <div className="mt-6 flex flex-wrap items-end justify-between gap-4">

                                                        {/* Quantity */}
                                                        <div>

                                                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a8977]">
                                                                Quantity
                                                            </p>

                                                            <div className="inline-flex items-center rounded-full border border-[#d8cfc2] bg-[#f4efe7] p-1">

                                                                <button
                                                                    type="button"
                                                                    disabled={
                                                                        Number(
                                                                            item.quantity
                                                                        ) <=
                                                                        1
                                                                    }
                                                                    onClick={() =>
                                                                        updateCartItems(
                                                                            item.id,
                                                                            Number(
                                                                                item.quantity
                                                                            ) -
                                                                            1
                                                                        )
                                                                    }
                                                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#50483f] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                                                                >
                                                                    <svg
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        className="h-3.5 w-3.5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            d="M5 12h14"
                                                                        />
                                                                    </svg>
                                                                </button>


                                                                <span className="min-w-10 text-center text-sm font-semibold text-[#24211e]">
                                                                    {
                                                                        item.quantity
                                                                    }
                                                                </span>


                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateCartItems(
                                                                            item.id,
                                                                            Number(
                                                                                item.quantity
                                                                            ) +
                                                                            1
                                                                        )
                                                                    }
                                                                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#50483f] transition hover:bg-white"
                                                                >
                                                                    <svg
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        className="h-3.5 w-3.5"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            d="M12 5v14M5 12h14"
                                                                        />
                                                                    </svg>
                                                                </button>

                                                            </div>
                                                        </div>


                                                        {/* Subtotal */}
                                                        <div className="text-right">

                                                            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a8977]">
                                                                Subtotal
                                                            </p>

                                                            <p className="text-xl font-semibold text-[#24211e]">
                                                                $
                                                                {formatPrice(
                                                                    subtotal
                                                                )}
                                                            </p>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </section>


                        {/* =========================
                            ORDER SUMMARY
                        ========================== */}
                        <aside className="h-fit rounded-[30px] border border-[#d8cfc2] bg-[#f4efe7] p-6 sm:p-7 lg:sticky lg:top-24">

                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#927f6b]">
                                Summary
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#24211e]">
                                Order summary
                            </h2>


                            {/* Summary values */}
                            <div className="mt-7 space-y-4">

                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-[#746b61]">
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-[#24211e]">
                                        $
                                        {formatPrice(total)}
                                    </span>

                                </div>


                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-[#746b61]">
                                        Shipping
                                    </span>

                                    <span className="font-semibold text-[#4d7257]">
                                        Free
                                    </span>

                                </div>


                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-[#746b61]">
                                        Items
                                    </span>

                                    <span className="font-semibold text-[#24211e]">
                                        {cartCount}
                                    </span>

                                </div>

                            </div>


                            {/* Divider */}
                            <div className="my-6 h-px bg-[#d8cfc2]" />


                            {/* Total */}
                            <div className="flex items-end justify-between">

                                <div>
                                    <p className="text-xs font-medium text-[#746b61]">
                                        Total
                                    </p>

                                    <p className="mt-1 text-[11px] text-[#9a8977]">
                                        Taxes calculated at checkout
                                    </p>
                                </div>

                                <p className="text-3xl font-semibold tracking-tight text-[#24211e]">
                                    ${formatPrice(total)}
                                </p>

                            </div>


                            {/* Checkout */}
                            <Link
                                to="/checkout"
                                className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#24211e] px-6 py-4 text-sm font-semibold text-white transition hover:bg-black active:scale-[0.98]"
                            >
                                Proceed to checkout

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14M13 6l6 6-6 6"
                                    />
                                </svg>
                            </Link>


                            {/* Secure checkout */}
                            <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-[#8c8176]">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-4 w-4"
                                >
                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        d="M8 10V7a4 4 0 0 1 8 0v3"
                                    />
                                </svg>

                                Secure checkout

                            </div>

                        </aside>

                    </div>
                )}
            </div>
        </main>
    );
}

export default CartPage;