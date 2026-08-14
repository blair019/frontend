import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    authFetch,
} from "../utils/auth.js";


const CartContext = createContext(null);


export const CartProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const [cartToast, setCartToast] = useState({
        visible: false,
        type: "loading",
        title: "",
        message: "",
    });

    const toastTimerRef = useRef(null);


    // =====================================================
    // TOAST HELPERS
    // =====================================================

    const clearToastTimer = () => {
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
            toastTimerRef.current = null;
        }
    };


    const showCartToast = ({
                               type,
                               title,
                               message = "",
                               duration,
                           }) => {
        clearToastTimer();

        setCartToast({
            visible: true,
            type,
            title,
            message,
        });

        if (duration) {
            toastTimerRef.current = setTimeout(() => {
                setCartToast((current) => ({
                    ...current,
                    visible: false,
                }));
            }, duration);
        }
    };


    // =====================================================
    // FETCH CART
    // =====================================================

    const fetchCart = async () => {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/cart/`
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Failed to load cart."
                );
            }

            setCartItems(data.items || []);
            setTotal(data.total || 0);

            return data;

        } catch (error) {
            console.error(
                "Error fetching cart:",
                error
            );

            throw error;
        }
    };


    useEffect(() => {
        fetchCart().catch(() => {
            // Avoid breaking the app if the user
            // is not authenticated yet.
        });

        return () => {
            clearToastTimer();
        };
    }, []);


    // =====================================================
    // ADD PRODUCT TO CART
    // =====================================================

    const addToCart = async (
        productId,
        productName = "Product"
    ) => {
        showCartToast({
            type: "loading",
            title: "Adding to cart...",
            message: productName,
        });

        try {
            const res = await authFetch(
                `${BASE_URL}/api/cart/add/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        product_id: productId,
                    }),
                }
            );


            let data = {};

            try {
                data = await res.json();
            } catch {
                data = {};
            }


            if (!res.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Failed to add product to cart."
                );
            }


            await fetchCart();


            showCartToast({
                type: "success",
                title: "Added to cart",
                message: productName,
                duration: 2200,
            });


            return data;

        } catch (error) {
            console.error(
                "Error adding to cart:",
                error
            );


            showCartToast({
                type: "error",
                title: "Couldn't add to cart",
                message:
                    error.message ||
                    "Please try again.",
                duration: 3000,
            });


            throw error;
        }
    };


    // =====================================================
    // REMOVE PRODUCT FROM CART
    // =====================================================

    const removeFromCart = async (itemId) => {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/cart/remove/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        item_id: itemId,
                    }),
                }
            );


            let data = {};

            try {
                data = await res.json();
            } catch {
                data = {};
            }


            if (!res.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Failed to remove item."
                );
            }


            await fetchCart();

        } catch (error) {
            console.error(
                "Error deleting cart:",
                error
            );

            throw error;
        }
    };


    // =====================================================
    // UPDATE PRODUCT QUANTITY
    // =====================================================

    const updateCartItems = async (
        itemId,
        quantity
    ) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }


        try {
            const res = await authFetch(
                `${BASE_URL}/api/cart/update/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        item_id: itemId,
                        quantity,
                    }),
                }
            );


            let data = {};

            try {
                data = await res.json();
            } catch {
                data = {};
            }


            if (!res.ok) {
                throw new Error(
                    data.error ||
                    data.detail ||
                    "Failed to update cart."
                );
            }


            await fetchCart();

        } catch (error) {
            console.error(
                "Error updating cart:",
                error
            );

            throw error;
        }
    };


    // =====================================================
    // CLEAR CART LOCAL STATE
    // =====================================================

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);

        clearToastTimer();

        setCartToast({
            visible: false,
            type: "loading",
            title: "",
            message: "",
        });
    };


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItems,
                total,
                clearCart,
            }}
        >
            {children}


            {/* =================================================
                GLOBAL CART TOAST
            ================================================== */}

            <div
                className={`pointer-events-none fixed bottom-5 left-1/2 z-[9999] w-[calc(100%-32px)] max-w-sm -translate-x-1/2 transition-all duration-300 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[340px] sm:translate-x-0 ${
                    cartToast.visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-5 opacity-0"
                }`}
                aria-live="polite"
                aria-atomic="true"
            >
                <div className="overflow-hidden rounded-[20px] border border-[#d8cfc2] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.16)]">

                    <div className="flex items-center gap-3 p-4">

                        {/* ICON */}
                        <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                                cartToast.type === "success"
                                    ? "bg-green-50 text-green-700"
                                    : cartToast.type === "error"
                                        ? "bg-red-50 text-red-600"
                                        : "bg-[#f4efe7] text-[#50483f]"
                            }`}
                        >

                            {cartToast.type === "loading" && (
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#9c8c79]/30 border-t-[#50483f]" />
                            )}


                            {cartToast.type === "success" && (
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
                            )}


                            {cartToast.type === "error" && (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="M6 6l12 12M18 6 6 18"
                                    />
                                </svg>
                            )}

                        </div>


                        {/* TEXT */}
                        <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-[#24211e]">
                                {cartToast.title}
                            </p>

                            {cartToast.message && (
                                <p className="mt-0.5 truncate text-xs text-[#746b61]">
                                    {cartToast.message}
                                </p>
                            )}

                        </div>


                        {/* CART ICON */}
                        {cartToast.type === "success" && (
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-5 w-5 shrink-0 text-[#8e8171]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17"
                                />
                            </svg>
                        )}

                    </div>


                    {/* Loading line */}
                    {cartToast.type === "loading" && (
                        <div className="h-1 overflow-hidden bg-[#eee8df]">
                            <div className="h-full w-1/2 animate-pulse bg-[#756657]" />
                        </div>
                    )}

                </div>
            </div>

        </CartContext.Provider>
    );
};


export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error(
            "useCart must be used inside a CartProvider."
        );
    }

    return context;
};