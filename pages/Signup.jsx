import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");
        setLoading(true);

        // Frontend password check
        if (form.password !== form.password2) {
            setMsg("Passwords do not match.");
            setLoading(false);
            return;
        }

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
                    "Account created. Redirecting to login..."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1200);
            } else {
                console.log("Signup error:", data);

                setMsg(
                    data.username?.[0] ||
                    data.email?.[0] ||
                    data.password?.[0] ||
                    data.password2?.[0] ||
                    data.detail ||
                    "Signup failed."
                );
            }
        } catch (err) {
            console.error(err);

            setMsg("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <input
                        type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={form.password2}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border p-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 cursor-pointer disabled:opacity-50"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Sign Up"}
                    </button>

                    {msg && (
                        <p className="text-center  text-sm font-semibold text-gray-700">
                            {msg}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Signup;