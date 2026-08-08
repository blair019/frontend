import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth.js";

function OrdersPage() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedOrder, setExpandedOrder] = useState(null);


    // =====================================================
    // FETCH ORDERS
    // =====================================================

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await authFetch(
                    `${BASE_URL}/api/orders/`
                );

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                        data.detail ||
                        "Failed to load orders."
                    );
                }

                setOrders(data);

            } catch (error) {
                console.error(
                    "Fetch orders error:",
                    error
                );

                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        fetchOrders();

    }, [BASE_URL, navigate]);


    // =====================================================
    // HELPERS
    // =====================================================

    const formatPrice = (price) => {
        return Number(price || 0).toFixed(2);
    };


    const formatDate = (date) => {
        if (!date) {
            return "Recently placed";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Recently placed";
        }

        return parsedDate.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };


    const getStatus = (status) => {
        const value = String(
            status || "Placed"
        ).toLowerCase();

        if (
            value === "delivered" ||
            value === "completed"
        ) {
            return {
                label: status || "Delivered",
                className:
                    "border-green-200 bg-green-50 text-green-700",
                dot: "bg-green-500",
            };
        }

        if (
            value === "cancelled" ||
            value === "canceled" ||
            value === "failed"
        ) {
            return {
                label: status || "Cancelled",
                className:
                    "border-red-200 bg-red-50 text-red-700",
                dot: "bg-red-500",
            };
        }

        if (
            value === "shipped" ||
            value === "shipping" ||
            value === "out for delivery"
        ) {
            return {
                label: status,
                className:
                    "border-blue-200 bg-blue-50 text-blue-700",
                dot: "bg-blue-500",
            };
        }

        if (
            value === "processing" ||
            value === "confirmed"
        ) {
            return {
                label: status,
                className:
                    "border-amber-200 bg-amber-50 text-amber-700",
                dot: "bg-amber-500",
            };
        }

        return {
            label: status || "Placed",
            className:
                "border-[#d8cfc2] bg-[#f4efe7] text-[#64594e]",
            dot: "bg-[#927f6b]",
        };
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f7f7f5] px-5 py-10 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-6xl">

                    <div className="mb-10">
                        <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />

                        <div className="mt-4 h-12 w-64 animate-pulse rounded bg-gray-200" />

                        <div className="mt-4 h-4 w-80 animate-pulse rounded bg-gray-200" />
                    </div>


                    <div className="space-y-5">

                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="rounded-[28px] border border-[#ddd8d0] bg-white p-7"
                            >

                                <div className="animate-pulse">

                                    <div className="flex items-center justify-between gap-5">

                                        <div>
                                            <div className="h-5 w-32 rounded bg-gray-200" />

                                            <div className="mt-3 h-3 w-40 rounded bg-gray-200" />
                                        </div>

                                        <div className="h-8 w-24 rounded-full bg-gray-200" />

                                    </div>


                                    <div className="mt-8 flex gap-3">

                                        <div className="h-14 w-14 rounded-xl bg-gray-200" />

                                        <div>
                                            <div className="h-4 w-40 rounded bg-gray-200" />

                                            <div className="mt-2 h-3 w-24 rounded bg-gray-200" />
                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </main>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {
        return (
            <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-[#f7f7f5] px-5">

                <div className="w-full max-w-md rounded-[30px] border border-[#ddd8d0] bg-white p-10 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">

                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-7 w-7"
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

                    </div>


                    <h2 className="mt-5 text-xl font-semibold text-[#24211e]">
                        Couldn't load your orders
                    </h2>


                    <p className="mt-2 text-sm leading-6 text-[#746b61]">
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-6 cursor-pointer rounded-full bg-[#24211e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                    >
                        Try again
                    </button>

                </div>

            </main>
        );
    }


    return (
        <main className="min-h-screen bg-[#f7f7f5] px-5 py-10 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* =================================================
                    PAGE HEADER
                ================================================== */}

                <div className="mb-10">

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#927f6b]">
                        Your purchases
                    </p>


                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-[#1f1f1d] sm:text-5xl">
                                My Orders
                            </h1>


                            <p className="mt-3 text-sm leading-6 text-[#746b61]">
                                View your purchases, order
                                details, and delivery information.
                            </p>

                        </div>


                        <Link
                            to="/"
                            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#d8cfc2] bg-white px-5 py-3 text-sm font-semibold text-[#50483f] transition hover:bg-[#f4efe7]"
                        >
                            Continue shopping

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
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


                {/* =================================================
                    NO ORDERS
                ================================================== */}

                {orders.length === 0 ? (

                    <div className="flex min-h-[500px] items-center justify-center rounded-[32px] border border-[#d8cfc2] bg-[#f4efe7] p-8">

                        <div className="max-w-md text-center">

                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d8cfc2] bg-white">

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="h-8 w-8 text-[#62574c]"
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
                                </svg>

                            </div>


                            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#24211e]">
                                No orders yet
                            </h2>


                            <p className="mt-3 text-sm leading-6 text-[#746b61]">
                                You haven't placed an order yet.
                                Browse our products and your
                                purchases will appear here.
                            </p>


                            <Link
                                to="/"
                                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#24211e] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
                            >
                                Start shopping

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

                    /* =================================================
                        ORDER LIST
                    ================================================== */

                    <div className="space-y-5">

                        {orders.map((order) => {

                            const status =
                                getStatus(order.status);

                            const expanded =
                                expandedOrder === order.id;

                            const itemCount =
                                order.items?.reduce(
                                    (count, item) =>
                                        count +
                                        Number(
                                            item.quantity || 0
                                        ),
                                    0
                                ) || 0;


                            return (
                                <article
                                    key={order.id}
                                    className="overflow-hidden rounded-[28px] border border-[#ddd8d0] bg-white transition-shadow duration-300 hover:shadow-sm"
                                >

                                    {/* =====================================
                                        ORDER MAIN INFO
                                    ====================================== */}

                                    <div className="p-6 sm:p-7">

                                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

                                            {/* ORDER NUMBER */}
                                            <div>

                                                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#927f6b]">
                                                    Order number
                                                </p>


                                                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#24211e]">
                                                    #
                                                    {String(
                                                        order.id
                                                    ).padStart(
                                                        5,
                                                        "0"
                                                    )}
                                                </h2>


                                                <p className="mt-2 text-xs text-[#8a8075]">
                                                    {formatDate(
                                                        order.created_at
                                                    )}
                                                </p>

                                            </div>


                                            {/* STATUS + TOTAL */}
                                            <div className="flex flex-wrap items-center gap-5">

                                                <div
                                                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold ${status.className}`}
                                                >

                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                                                    />

                                                    {status.label}

                                                </div>


                                                <div className="text-right">

                                                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a8977]">
                                                        Total
                                                    </p>


                                                    <p className="mt-1 text-xl font-semibold text-[#24211e]">
                                                        $
                                                        {formatPrice(
                                                            order.total_amount
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* =====================================
                                            PRODUCT PREVIEW
                                        ====================================== */}

                                        {order.items?.length > 0 && (

                                            <div className="mt-7 rounded-[20px] border border-[#ebe6df] bg-[#faf9f7] p-4">

                                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                                    <div className="flex items-center gap-4">

                                                        {/* THUMBNAILS */}
                                                        <div className="flex -space-x-3">

                                                            {order.items
                                                                .slice(
                                                                    0,
                                                                    4
                                                                )
                                                                .map(
                                                                    (
                                                                        item
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            className="h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-[#eeeae4] shadow-sm"
                                                                        >

                                                                            {item.product_image ? (
                                                                                <img
                                                                                    src={
                                                                                        item.product_image
                                                                                    }
                                                                                    alt={
                                                                                        item.product_name
                                                                                    }
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            ) : (
                                                                                <div className="flex h-full w-full items-center justify-center">

                                                                                    <svg
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="none"
                                                                                        stroke="currentColor"
                                                                                        strokeWidth="1.5"
                                                                                        className="h-5 w-5 text-gray-400"
                                                                                    >
                                                                                        <path
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            d="M6 7h12l-1 13H7L6 7Z"
                                                                                        />
                                                                                    </svg>

                                                                                </div>
                                                                            )}

                                                                        </div>
                                                                    )
                                                                )}

                                                        </div>


                                                        {/* PRODUCT TEXT */}
                                                        <div>

                                                            <p className="text-sm font-semibold text-[#423c36]">
                                                                {itemCount}{" "}
                                                                {itemCount ===
                                                                1
                                                                    ? "item"
                                                                    : "items"}
                                                            </p>


                                                            <p className="mt-1 max-w-[350px] truncate text-xs text-[#8a8075]">

                                                                {order.items
                                                                    .slice(
                                                                        0,
                                                                        2
                                                                    )
                                                                    .map(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item.product_name
                                                                    )
                                                                    .join(
                                                                        ", "
                                                                    )}

                                                                {order.items
                                                                        .length >
                                                                    2 &&
                                                                    ` +${
                                                                        order
                                                                            .items
                                                                            .length -
                                                                        2
                                                                    } more`}

                                                            </p>

                                                        </div>

                                                    </div>


                                                    {/* PAYMENT */}
                                                    <div className="flex items-center gap-2 text-xs text-[#746b61]">

                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            className="h-4 w-4"
                                                        >
                                                            <rect
                                                                x="3"
                                                                y="6"
                                                                width="18"
                                                                height="12"
                                                                rx="2"
                                                            />

                                                            <path d="M3 10h18" />
                                                        </svg>

                                                        {order.payment_method ||
                                                            "COD"}

                                                    </div>

                                                </div>

                                            </div>
                                        )}


                                        {/* =====================================
                                            FOOTER
                                        ====================================== */}

                                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">

                                            <p className="text-xs text-[#92877c]">
                                                Order #
                                                {String(
                                                    order.id
                                                ).padStart(
                                                    5,
                                                    "0"
                                                )}
                                            </p>


                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedOrder(
                                                        expanded
                                                            ? null
                                                            : order.id
                                                    )
                                                }
                                                className="group flex cursor-pointer items-center gap-2 rounded-full border border-[#d8cfc2] bg-[#f4efe7] px-5 py-2.5 text-xs font-semibold text-[#50483f] transition hover:bg-[#e9dfd2]"
                                            >
                                                {expanded
                                                    ? "Hide details"
                                                    : "View details"}

                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                                        expanded
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m6 9 6 6 6-6"
                                                    />
                                                </svg>

                                            </button>

                                        </div>

                                    </div>


                                    {/* =====================================
                                        EXPANDED ORDER
                                    ====================================== */}

                                    {expanded && (

                                        <div className="border-t border-[#d8cfc2] bg-[#f4efe7] p-6 sm:p-7">

                                            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

                                                {/* =========================
                                                    ORDER ITEMS
                                                ========================== */}

                                                <div>

                                                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#927f6b]">
                                                        Order items
                                                    </p>


                                                    <div className="space-y-3">

                                                        {order.items?.map(
                                                            (
                                                                item
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        item.id
                                                                    }
                                                                    className="flex items-center gap-4 rounded-[18px] border border-[#ded6cb] bg-white p-3"
                                                                >

                                                                    {/* IMAGE */}
                                                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[13px] bg-[#eeece8]">

                                                                        {item.product_image ? (
                                                                            <img
                                                                                src={
                                                                                    item.product_image
                                                                                }
                                                                                alt={
                                                                                    item.product_name
                                                                                }
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div className="flex h-full w-full items-center justify-center">

                                                                                <svg
                                                                                    viewBox="0 0 24 24"
                                                                                    fill="none"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    className="h-5 w-5 text-gray-400"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        d="M6 7h12l-1 13H7L6 7Z"
                                                                                    />
                                                                                </svg>

                                                                            </div>
                                                                        )}

                                                                    </div>


                                                                    {/* INFO */}
                                                                    <div className="min-w-0 flex-1">

                                                                        <Link
                                                                            to={
                                                                                item.product_id
                                                                                    ? `/product/${item.product_id}`
                                                                                    : "#"
                                                                            }
                                                                        >
                                                                            <h3 className="truncate text-sm font-semibold text-[#302b26]">
                                                                                {
                                                                                    item.product_name
                                                                                }
                                                                            </h3>
                                                                        </Link>


                                                                        <p className="mt-1 text-xs text-[#8a8075]">
                                                                            $
                                                                            {formatPrice(
                                                                                item.price
                                                                            )}{" "}
                                                                            ×{" "}
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                        </p>

                                                                    </div>


                                                                    {/* SUBTOTAL */}
                                                                    <p className="shrink-0 text-sm font-semibold text-[#302b26]">
                                                                        $
                                                                        {formatPrice(
                                                                            item.subtotal
                                                                        )}
                                                                    </p>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>

                                                </div>


                                                {/* =========================
                                                    DELIVERY INFO
                                                ========================== */}

                                                <div>

                                                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#927f6b]">
                                                        Delivery information
                                                    </p>


                                                    <div className="rounded-[20px] border border-[#d8cfc2] bg-[#eee6dc] p-5">

                                                        {/* CUSTOMER */}
                                                        <div>

                                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#927f6b]">
                                                                Customer
                                                            </p>

                                                            <p className="mt-1 text-sm font-semibold text-[#302b26]">
                                                                {order.name ||
                                                                    "Customer"}
                                                            </p>

                                                        </div>


                                                        <div className="my-5 h-px bg-[#d8cfc2]" />


                                                        {/* ADDRESS */}
                                                        <div>

                                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#927f6b]">
                                                                Delivery address
                                                            </p>

                                                            <p className="mt-1 whitespace-pre-line text-sm leading-6 text-[#62594f]">
                                                                {order.address ||
                                                                    "Address unavailable"}
                                                            </p>

                                                        </div>


                                                        <div className="my-5 h-px bg-[#d8cfc2]" />


                                                        {/* PHONE */}
                                                        <div>

                                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#927f6b]">
                                                                Phone
                                                            </p>

                                                            <p className="mt-1 text-sm text-[#62594f]">
                                                                {order.phone ||
                                                                    "Not available"}
                                                            </p>

                                                        </div>


                                                        <div className="my-5 h-px bg-[#d8cfc2]" />


                                                        {/* PAYMENT */}
                                                        <div>

                                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#927f6b]">
                                                                Payment
                                                            </p>

                                                            <p className="mt-1 text-sm font-semibold text-[#302b26]">
                                                                {order.payment_method ||
                                                                    "COD"}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* =================================
                                                ORDER TOTAL
                                            ================================== */}

                                            <div className="mt-8 flex items-center justify-between border-t border-[#d8cfc2] pt-6">

                                                <div>

                                                    <p className="text-xs font-medium text-[#746b61]">
                                                        Order total
                                                    </p>

                                                    <p className="mt-1 text-[10px] text-[#92877c]">
                                                        Including all products
                                                    </p>

                                                </div>


                                                <p className="text-3xl font-semibold tracking-[-0.04em] text-[#24211e]">
                                                    $
                                                    {formatPrice(
                                                        order.total_amount
                                                    )}
                                                </p>

                                            </div>

                                        </div>
                                    )}

                                </article>
                            );
                        })}

                    </div>
                )}

            </div>

        </main>
    );
}

export default OrdersPage;