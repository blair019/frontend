import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { authFetch } from "../utils/auth.js";

function CheckoutPage() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const navigate = useNavigate();

    const {
        cartItems,
        total,
        clearCart,
    } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const getImageUrl = (image) => {
        if (!image) return "";

        return image.startsWith("http")
            ? image
            : `${BASE_URL}${image}`;
    };

    const formatPrice = (price) => {
        return Number(price || 0).toFixed(2);
    };

    const cartCount = cartItems.reduce(
        (count, item) =>
            count + Number(item.quantity || 0),
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setSuccess(false);

        try {
            const res = await authFetch(
                `${BASE_URL}/api/order/create/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const json = await res.json();

            if (res.ok) {
                setSuccess(true);

                setMessage(
                    "Order placed successfully! Redirecting to your orders..."
                );

                clearCart();

                setTimeout(() => {
                    navigate("/orders");
                }, 1500);
            } else {
                setMessage(
                    json.error ||
                    json.detail ||
                    "Failed to place order."
                );

                setLoading(false);
            }
        } catch (error) {
            console.error(
                "Checkout error:",
                error
            );

            setMessage(
                "An error occurred while placing your order."
            );

            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f7f7f5] px-5 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* =========================
                    BACK
                ========================== */}
                <Link
                    to="/cart"
                    className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#746b61] transition hover:text-[#24211e]"
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

                    Back to cart
                </Link>


                {/* =========================
                    HEADER
                ========================== */}
                <div className="mb-10">

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#927f6b]">
                        Almost there
                    </p>

                    <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f1f1d] sm:text-5xl">
                        Checkout
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-[#746b61]">
                        Enter your delivery information and
                        choose your preferred payment method
                        to complete your order.
                    </p>

                </div>


                {/* =========================
                    MAIN GRID
                ========================== */}
                <div className="grid gap-7 lg:grid-cols-[1fr_390px]">

                    {/* =========================
                        CHECKOUT FORM
                    ========================== */}
                    <section className="overflow-hidden rounded-[30px] border border-[#ddd8d0] bg-white">

                        {/* FORM HEADER */}
                        <div className="border-b border-[#e5e0d9] px-6 py-6 sm:px-8">

                            <div className="flex items-center gap-4">

                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f4efe7] text-[#50483f]">

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
                                            d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                                        />

                                        <circle
                                            cx="12"
                                            cy="10"
                                            r="2.5"
                                        />
                                    </svg>

                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-[#24211e]">
                                        Delivery details
                                    </h2>

                                    <p className="mt-1 text-xs text-[#8b8177]">
                                        Where should we send
                                        your order?
                                    </p>
                                </div>

                            </div>

                        </div>


                        {/* =========================
                            FORM
                        ========================== */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 sm:p-8"
                        >

                            <div className="space-y-6">

                                {/* NAME */}
                                <div>

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                    >
                                        Full name
                                    </label>

                                    <div className="relative">

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19383]"
                                        >
                                            <circle
                                                cx="12"
                                                cy="8"
                                                r="4"
                                            />

                                            <path
                                                strokeLinecap="round"
                                                d="M4 21c0-4 3.6-7 8-7s8 3 8 7"
                                            />
                                        </svg>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            value={form.name}
                                            onChange={
                                                handleChange
                                            }
                                            required
                                            className="h-14 w-full rounded-[16px] border border-[#d3c8ba] bg-[#faf9f7] pl-12 pr-4 text-sm text-[#24211e] outline-none transition placeholder:text-[#aaa198] focus:border-[#807363] focus:bg-white focus:ring-4 focus:ring-[#d8cfc2]/40"
                                        />

                                    </div>
                                </div>


                                {/* ADDRESS */}
                                <div>

                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                    >
                                        Delivery address
                                    </label>

                                    <textarea
                                        id="address"
                                        name="address"
                                        placeholder="House number, street, city, province..."
                                        value={
                                            form.address
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                        rows="5"
                                        className="w-full resize-none rounded-[16px] border border-[#d3c8ba] bg-[#faf9f7] p-4 text-sm leading-6 text-[#24211e] outline-none transition placeholder:text-[#aaa198] focus:border-[#807363] focus:bg-white focus:ring-4 focus:ring-[#d8cfc2]/40"
                                    />

                                </div>


                                {/* PHONE */}
                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                    >
                                        Phone number
                                    </label>

                                    <div className="relative">

                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19383]"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 3h3l1.5 5-2 1.5a16 16 0 0 0 5 5L16 12l5 1.5v3C21 19 19 21 16.5 21 9 21 3 15 3 7.5 3 5 5 3 7 3Z"
                                            />
                                        </svg>

                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            placeholder="09XXXXXXXXX"
                                            value={
                                                form.phone
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                            className="h-14 w-full rounded-[16px] border border-[#d3c8ba] bg-[#faf9f7] pl-12 pr-4 text-sm text-[#24211e] outline-none transition placeholder:text-[#aaa198] focus:border-[#807363] focus:bg-white focus:ring-4 focus:ring-[#d8cfc2]/40"
                                        />

                                    </div>
                                </div>


                                {/* =========================
                                    PAYMENT
                                ========================== */}
                                <div>

                                    <div className="mb-3">

                                        <p className="text-xs font-semibold text-[#4f4840]">
                                            Payment method
                                        </p>

                                        <p className="mt-1 text-[11px] text-[#958a7e]">
                                            Choose how you'd
                                            like to pay.
                                        </p>

                                    </div>


                                    <div className="grid gap-3 sm:grid-cols-3">

                                        {/* COD */}
                                        <PaymentOption
                                            value="COD"
                                            label="Cash"
                                            subtitle="On delivery"
                                            selected={
                                                form.payment_method ===
                                                "COD"
                                            }
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    payment_method:
                                                        "COD",
                                                })
                                            }
                                        />


                                        {/* CARD */}
                                        <PaymentOption
                                            value="CreditCard"
                                            label="Card"
                                            subtitle="Credit card"
                                            selected={
                                                form.payment_method ===
                                                "CreditCard"
                                            }
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    payment_method:
                                                        "CreditCard",
                                                })
                                            }
                                        />


                                        {/* PAYPAL */}
                                        <PaymentOption
                                            value="Paypal"
                                            label="PayPal"
                                            subtitle="Online"
                                            selected={
                                                form.payment_method ===
                                                "Paypal"
                                            }
                                            onClick={() =>
                                                setForm({
                                                    ...form,
                                                    payment_method:
                                                        "Paypal",
                                                })
                                            }
                                        />

                                    </div>

                                </div>


                                {/* =========================
                                    MESSAGE
                                ========================== */}
                                {message && (
                                    <div
                                        className={`flex items-start gap-3 rounded-[16px] border p-4 text-sm ${
                                            success
                                                ? "border-green-200 bg-green-50 text-green-700"
                                                : "border-red-200 bg-red-50 text-red-700"
                                        }`}
                                    >

                                        {success ? (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="mt-0.5 h-5 w-5 shrink-0"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="9"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m8 12 2.5 2.5L16 9"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="mt-0.5 h-5 w-5 shrink-0"
                                            >
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="9"
                                                />

                                                <path
                                                    strokeLinecap="round"
                                                    d="M12 8v5M12 17h.01"
                                                />
                                            </svg>
                                        )}

                                        <span>
                                            {message}
                                        </span>

                                    </div>
                                )}


                                {/* PLACE ORDER */}
                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        success
                                    }
                                    className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#24211e] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                    {loading ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                            Processing order...
                                        </>
                                    ) : success ? (
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

                                            Order placed
                                        </>
                                    ) : (
                                        <>
                                            Place order

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
                                        </>
                                    )}

                                </button>


                                {/* Secure */}
                                <div className="flex items-center justify-center gap-2 text-[11px] text-[#958a7e]">

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

                                    Your checkout information is
                                    securely processed

                                </div>

                            </div>

                        </form>

                    </section>


                    {/* =========================
                        ORDER SUMMARY
                    ========================== */}
                    <aside className="h-fit overflow-hidden rounded-[30px] border border-[#d8cfc2] bg-[#f4efe7] lg:sticky lg:top-24">

                        {/* HEADER */}
                        <div className="border-b border-[#d8cfc2] p-6">

                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#927f6b]">
                                Your order
                            </p>

                            <div className="mt-2 flex items-end justify-between">

                                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#24211e]">
                                    Order summary
                                </h2>

                                <span className="text-xs font-medium text-[#817569]">
                                    {cartCount}{" "}
                                    {cartCount === 1
                                        ? "item"
                                        : "items"}
                                </span>

                            </div>

                        </div>


                        {/* =========================
                            ITEMS
                        ========================== */}
                        <div className="max-h-[320px] space-y-4 overflow-y-auto p-6">

                            {cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="flex gap-3"
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] border border-[#d8cfc2] bg-white">

                                        {item.product_image && (
                                            <img
                                                src={getImageUrl(
                                                    item.product_image
                                                )}
                                                alt={
                                                    item.product_name
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        )}

                                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#24211e] px-1 text-[9px] font-bold text-white">
                                            {
                                                item.quantity
                                            }
                                        </span>

                                    </div>


                                    {/* DETAILS */}
                                    <div className="min-w-0 flex-1">

                                        <h3 className="truncate text-sm font-semibold text-[#302b26]">
                                            {
                                                item.product_name
                                            }
                                        </h3>

                                        <p className="mt-1 text-xs text-[#897d71]">
                                            $
                                            {formatPrice(
                                                item.product_price
                                            )}{" "}
                                            each
                                        </p>

                                    </div>


                                    <p className="shrink-0 text-sm font-semibold text-[#302b26]">
                                        $
                                        {formatPrice(
                                            Number(
                                                item.product_price
                                            ) *
                                            Number(
                                                item.quantity
                                            )
                                        )}
                                    </p>

                                </div>

                            ))}

                        </div>


                        {/* =========================
                            TOTALS
                        ========================== */}
                        <div className="border-t border-[#d8cfc2] p-6">

                            <div className="space-y-4">

                                <div className="flex items-center justify-between text-sm">

                                    <span className="text-[#746b61]">
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-[#24211e]">
                                        $
                                        {formatPrice(
                                            total
                                        )}
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

                            </div>


                            <div className="my-6 h-px bg-[#d8cfc2]" />


                            {/* TOTAL */}
                            <div className="flex items-end justify-between">

                                <div>
                                    <p className="text-xs font-semibold text-[#64594e]">
                                        Total
                                    </p>

                                    <p className="mt-1 text-[10px] text-[#9a8e82]">
                                        Final order amount
                                    </p>
                                </div>

                                <p className="text-3xl font-semibold tracking-[-0.04em] text-[#24211e]">
                                    $
                                    {formatPrice(total)}
                                </p>

                            </div>

                        </div>

                    </aside>

                </div>

            </div>
        </main>
    );
}


/* =========================
    PAYMENT OPTION
========================= */
function PaymentOption({
                           label,
                           subtitle,
                           selected,
                           onClick,
                       }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`cursor-pointer rounded-[18px] border p-4 text-left transition-all duration-200 ${
                selected
                    ? "border-[#39332d] bg-[#f4efe7] ring-1 ring-[#39332d]"
                    : "border-[#ded7ce] bg-white hover:border-[#b9afa4]"
            }`}
        >
            <div className="flex items-start justify-between gap-2">

                <div>

                    <p className="text-sm font-semibold text-[#302b26]">
                        {label}
                    </p>

                    <p className="mt-1 text-[10px] text-[#958a7e]">
                        {subtitle}
                    </p>

                </div>

                <span
                    className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                        selected
                            ? "border-[#24211e] bg-[#24211e]"
                            : "border-[#b9afa4]"
                    }`}
                >
                    {selected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                </span>

            </div>
        </button>
    );
}

export default CheckoutPage;