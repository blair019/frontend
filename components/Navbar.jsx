import { useState } from "react";
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext.jsx";

import {
    clearTokens,
    getAccessToken,
} from "../utils/auth.js";


function Navbar() {
    const {
        cartItems,
        clearCart,
    } = useCart();

    const navigate = useNavigate();

    // Makes navbar update when route changes,
    // especially after login/logout
    useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);


    // =========================
    // CART COUNT
    // =========================
    const cartCount = cartItems.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );


    // =========================
    // AUTH STATUS
    // =========================
    const isLoggedIn = !!getAccessToken();


    // =========================
    // LOGOUT
    // =========================
    const handleLogout = () => {
        // Clear cart from React state
        clearCart();

        // Remove access + refresh tokens
        clearTokens();

        // Close mobile menu
        setMobileOpen(false);

        // Redirect to login
        navigate("/login");
    };


    const closeMenu = () => {
        setMobileOpen(false);
    };


    const navLinkClass = ({ isActive }) =>
        `relative text-sm font-medium transition-colors duration-200 ${
            isActive
                ? "text-gray-950"
                : "text-gray-500 hover:text-gray-950"
        }`;


    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/70 bg-white/85 backdrop-blur-xl">

                <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                    {/* =========================
                        LOGO
                    ========================== */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="group flex items-center gap-2.5"
                    >

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white transition-transform duration-200 group-hover:scale-105">

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
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 19a2 2 0 1 1-4 0"
                                />
                            </svg>

                        </div>


                        <span className="text-xl font-bold tracking-tight text-gray-950">
                            Mohit

                            <span className="text-gray-400">
                                Cart
                            </span>
                        </span>

                    </Link>


                    {/* =========================
                        DESKTOP NAVIGATION
                    ========================== */}
                    <div className="hidden items-center gap-8 md:flex">

                        <NavLink
                            to="/"
                            className={navLinkClass}
                        >
                            Home
                        </NavLink>


                        <NavLink
                            to="/"
                            className={navLinkClass}
                        >
                            Shop
                        </NavLink>


                        {isLoggedIn && (
                            <NavLink
                                to="/orders"
                                className={navLinkClass}
                            >
                                Orders
                            </NavLink>
                        )}

                    </div>


                    {/* =========================
                        DESKTOP ACTIONS
                    ========================== */}
                    <div className="hidden items-center gap-2 md:flex">

                        {!isLoggedIn ? (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
                                >
                                    Log in
                                </Link>


                                <Link
                                    to="/signup"
                                    className="rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-gray-800 active:scale-[0.97]"
                                >
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-950"
                            >
                                Logout
                            </button>
                        )}


                        {/* =========================
                            CART
                        ========================== */}
                        {isLoggedIn && (
                            <Link
                                to="/cart"
                                className="relative ml-1 flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition duration-200 hover:bg-gray-100 hover:text-gray-950"
                                aria-label="View cart"
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-[22px] w-[22px]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 19a2 2 0 1 1-4 0"
                                    />
                                </svg>


                                {cartCount > 0 && (
                                    <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gray-950 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                                        {cartCount > 99
                                            ? "99+"
                                            : cartCount}
                                    </span>
                                )}

                            </Link>
                        )}

                    </div>


                    {/* =========================
                        MOBILE ACTIONS
                    ========================== */}
                    <div className="flex items-center gap-1 md:hidden">

                        {/* MOBILE CART */}
                        {isLoggedIn && (
                            <Link
                                to="/cart"
                                onClick={closeMenu}
                                className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
                                aria-label="View cart"
                            >

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-[22px] w-[22px]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17"
                                    />
                                </svg>


                                {cartCount > 0 && (
                                    <span className="absolute -right-0.5 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-gray-950 px-1 text-[9px] font-bold text-white">
                                        {cartCount > 99
                                            ? "99+"
                                            : cartCount}
                                    </span>
                                )}

                            </Link>
                        )}


                        {/* HAMBURGER */}
                        <button
                            type="button"
                            onClick={() =>
                                setMobileOpen(!mobileOpen)
                            }
                            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
                            aria-label="Toggle navigation"
                        >

                            {mobileOpen ? (
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
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="M4 7h16M4 12h16M4 17h16"
                                    />
                                </svg>
                            )}

                        </button>

                    </div>

                </nav>


                {/* =========================
                    MOBILE MENU
                ========================== */}
                <div
                    className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
                        mobileOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 border-t-0 opacity-0"
                    }`}
                >

                    <div className="space-y-1 px-5 py-5">

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Home
                        </Link>


                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Shop
                        </Link>


                        {isLoggedIn && (
                            <>
                                <Link
                                    to="/orders"
                                    onClick={closeMenu}
                                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    Orders
                                </Link>


                                <Link
                                    to="/cart"
                                    onClick={closeMenu}
                                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    <span>Cart</span>

                                    {cartCount > 0 && (
                                        <span className="flex min-w-6 items-center justify-center rounded-full bg-gray-950 px-2 py-1 text-[10px] font-bold text-white">
                                            {cartCount > 99
                                                ? "99+"
                                                : cartCount}
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}


                        <div className="my-3 border-t border-gray-100" />


                        {!isLoggedIn ? (
                            <div className="grid grid-cols-2 gap-2">

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Log in
                                </Link>


                                <Link
                                    to="/signup"
                                    onClick={closeMenu}
                                    className="rounded-xl bg-gray-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                                >
                                    Sign up
                                </Link>

                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full cursor-pointer rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        )}

                    </div>

                </div>

            </header>


            {/* Space for fixed navbar */}
            <div className="h-[72px]" />
        </>
    );
}

export default Navbar;