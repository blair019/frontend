import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");

        if (form.password !== form.password2) {
            setMsg("Passwords do not match.");
            return;
        }

        if (form.password.length < 8) {
            setMsg("Password must be at least 8 characters.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${BASE_URL}/api/register/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (res.ok) {
                setMsg(
                    "Account created successfully. Redirecting to login..."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            } else {
                console.error("Signup error:", data);

                setMsg(
                    data.username?.[0] ||
                    data.email?.[0] ||
                    data.password?.[0] ||
                    data.password2?.[0] ||
                    data.detail ||
                    "Signup failed. Please try again."
                );
            }
        } catch (error) {
            console.error("Signup error:", error);

            setMsg(
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const passwordsMatch =
        form.password2.length > 0 &&
        form.password === form.password2;

    const passwordsDoNotMatch =
        form.password2.length > 0 &&
        form.password !== form.password2;

    return (
        <main className="min-h-[calc(100vh-72px)] bg-[#f7f7f5] px-5 py-12 sm:px-6">
            <div className="mx-auto grid min-h-[720px] max-w-6xl overflow-hidden rounded-[32px] border border-[#ddd8d0] bg-white shadow-sm lg:grid-cols-2">

                {/* =========================
                    LEFT SIDE
                ========================== */}
                <div className="relative hidden overflow-hidden bg-[#1f1f1d] p-12 text-white lg:flex lg:flex-col lg:justify-between">

                    {/* Decorative background */}
                    <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#9c8065]/30 blur-3xl" />


                    {/* Top content */}
                    <div className="relative z-10">

                        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-gray-300 backdrop-blur-md">
                            Join MohitCart
                        </div>

                        <h1 className="max-w-md text-5xl font-semibold leading-[1.05] tracking-[-0.04em]">
                            Start shopping
                            <span className="block text-[#b9aa97]">
                                your way.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
                            Create your account to save your cart,
                            manage your orders, and enjoy a smoother
                            shopping experience.
                        </p>

                    </div>


                    {/* Feature cards */}
                    <div className="relative z-10 space-y-3">

                        <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                            <div className="flex items-center gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
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
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Save your cart
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-400">
                                        Keep your products connected
                                        to your account.
                                    </p>
                                </div>

                            </div>
                        </div>


                        <div className="rounded-[22px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                            <div className="flex items-center gap-4">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black">
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
                                            d="m5 12 4 4L19 6"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Fast checkout
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-gray-400">
                                        Sign in and place your orders
                                        in just a few steps.
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>


                {/* =========================
                    SIGNUP SIDE
                ========================== */}
                <div className="flex items-center justify-center bg-[#f4efe7] p-7 sm:p-12 lg:p-14">

                    <div className="w-full max-w-md">

                        {/* Mobile logo */}
                        <Link
                            to="/"
                            className="mb-9 inline-flex items-center gap-2 lg:hidden"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-950 text-white">
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
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5"
                                    />
                                </svg>
                            </div>

                            <span className="text-xl font-bold text-gray-950">
                                Mohit
                                <span className="text-gray-400">
                                    Cart
                                </span>
                            </span>
                        </Link>


                        {/* Heading */}
                        <div className="mb-8">

                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#927f6b]">
                                New account
                            </p>

                            <h2 className="text-4xl font-semibold tracking-[-0.035em] text-[#1f1f1d]">
                                Create account
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#746b61]">
                                Fill in your details to start
                                shopping with MohitCart.
                            </p>

                        </div>


                        {/* =========================
                            FORM
                        ========================== */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >

                            {/* USERNAME */}
                            <div>

                                <label
                                    htmlFor="username"
                                    className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                >
                                    Username
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
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="Choose a username"
                                        autoComplete="username"
                                        required
                                        className="h-13 w-full rounded-[16px] border border-[#d3c8ba] bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#807363] focus:ring-4 focus:ring-[#d8cfc2]/40"
                                    />

                                </div>
                            </div>


                            {/* EMAIL */}
                            <div>

                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                >
                                    Email
                                </label>

                                <div className="relative">

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19383]"
                                    >
                                        <rect
                                            x="3"
                                            y="5"
                                            width="18"
                                            height="14"
                                            rx="2"
                                        />

                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m4 7 8 6 8-6"
                                        />
                                    </svg>

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@email.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-[16px] border border-[#d3c8ba] bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#807363] focus:ring-4 focus:ring-[#d8cfc2]/40"
                                    />

                                </div>
                            </div>


                            {/* PASSWORD */}
                            <div>

                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                >
                                    Password
                                </label>

                                <div className="relative">

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19383]"
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

                                    <input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full rounded-[16px] border border-[#d3c8ba] bg-white py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#807363] focus:ring-4 focus:ring-[#d8cfc2]/40"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#8e8171] transition hover:text-gray-950"
                                    >
                                        <EyeIcon
                                            hidden={showPassword}
                                        />
                                    </button>

                                </div>

                                {form.password && (
                                    <p
                                        className={`mt-2 text-[11px] ${
                                            form.password.length >= 8
                                                ? "text-green-700"
                                                : "text-[#927f6b]"
                                        }`}
                                    >
                                        {form.password.length >= 8
                                            ? "✓ Password length is good"
                                            : "Use at least 8 characters"}
                                    </p>
                                )}

                            </div>


                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label
                                    htmlFor="password2"
                                    className="mb-2 block text-xs font-semibold text-[#4f4840]"
                                >
                                    Confirm password
                                </label>

                                <div className="relative">

                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a19383]"
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

                                    <input
                                        id="password2"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password2"
                                        value={form.password2}
                                        onChange={handleChange}
                                        placeholder="Repeat your password"
                                        autoComplete="new-password"
                                        required
                                        className={`w-full rounded-[16px] border bg-white py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-4 ${
                                            passwordsDoNotMatch
                                                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                                : passwordsMatch
                                                    ? "border-green-500 focus:border-green-500 focus:ring-green-100"
                                                    : "border-[#d3c8ba] focus:border-[#807363] focus:ring-[#d8cfc2]/40"
                                        }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#8e8171] transition hover:text-gray-950"
                                    >
                                        <EyeIcon
                                            hidden={
                                                showConfirmPassword
                                            }
                                        />
                                    </button>

                                </div>

                                {passwordsMatch && (
                                    <p className="mt-2 text-[11px] font-medium text-green-700">
                                        ✓ Passwords match
                                    </p>
                                )}

                                {passwordsDoNotMatch && (
                                    <p className="mt-2 text-[11px] font-medium text-red-600">
                                        Passwords do not match
                                    </p>
                                )}

                            </div>


                            {/* MESSAGE */}
                            {msg && (
                                <div
                                    className={`rounded-[14px] border px-4 py-3 text-sm ${
                                        msg.includes(
                                            "successfully"
                                        )
                                            ? "border-green-200 bg-green-50 text-green-700"
                                            : "border-red-200 bg-red-50 text-red-700"
                                    }`}
                                >
                                    {msg}
                                </div>
                            )}


                            {/* SUBMIT */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#24211e] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create account

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

                        </form>


                        {/* LOGIN */}
                        <div className="mt-7 border-t border-[#d8cfc2] pt-6 text-center">

                            <p className="text-sm text-[#746b61]">
                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="font-semibold text-[#28231f] underline decoration-[#b4a696] underline-offset-4 transition hover:text-black"
                                >
                                    Sign in
                                </Link>
                            </p>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}


/* =========================
    EYE ICON
========================= */
function EyeIcon({ hidden }) {
    if (hidden) {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <path
                    strokeLinecap="round"
                    d="M3 3l18 18"
                />

                <path
                    strokeLinecap="round"
                    d="M10.6 10.7a2 2 0 0 0 2.7 2.7"
                />

                <path
                    strokeLinecap="round"
                    d="M9.8 4.2A10.7 10.7 0 0 1 12 4c5.5 0 9 6 9 6a17 17 0 0 1-3 3.8M6.5 6.5C4.3 8 3 10 3 10s3.5 6 9 6c1 0 2-.2 2.8-.5"
                />
            </svg>
        );
    }

    return (
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
                d="M2.5 12S6 6 12 6s9.5 6 9.5 6S18 18 12 18 2.5 12 2.5 12Z"
            />

            <circle
                cx="12"
                cy="12"
                r="2.5"
            />
        </svg>
    );
}

export default Signup;