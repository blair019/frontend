import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx"
import ProductDetails from "./ProductDetails.jsx";
import {authFetch} from "../utils/auth.js";


function CheckoutPage() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navitems = useNavigate();
    const { clearCart} = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await authFetch(`${BASE_URL}/api/order/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            const json = await res.json();

            if (res.ok) {
                setMessage("Order placed successfully");
                fetch(`${BASE_URL}/api/cart/`);
                clearCart();
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            } else {
                setMessage(data.error || "Failed to place order.");
            }
        }catch(error) {
            setMessage("Error occured");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 >Checkout</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        value={form.address}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                    name="payment_method"
                    value={form.payment_method}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2"
                    >
                        <option value="COD">COD</option>
                        <option value="CreditCard">Credit Card</option>
                        <option value="Paypal">Paypal</option>
                    </select>
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-lg bg-blue-500 text-white py-2 hover:bg-blue-600 transition duration-300"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>

                    {message && (
                        <p className="text-center  font-semibold mt-4">
                            {message}
                        </p>
                    )}


                </form>
            </div>
        </div>
    )

}


export default CheckoutPage;