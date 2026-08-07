import { useCart } from "../context/CartContext.jsx";
import {Link} from "react-router-dom";

function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateCartItems,
        total
    } = useCart();

    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;


    return (
        <div className="min-h-screen bg-gray-100 px-8 pb-8 pt-24">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <p className="mb-6 text-center text-xl font-semibold text-gray-600">
                    Your cart is empty
                </p>
            ) : (
                <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4"
                        >
                            <div className="flex items-center gap-4">
                                {item.product_image && (
                                    <img
                                        src={`${BASE_URL}${item.product_image}`}
                                        alt={`${item.product_name}`}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                )}

                            </div>
                            <div>
                                <h2 className="text-lg font-bold">
                                    {item.product_name}
                                </h2>

                                <p className="text-gray-600">
                                    ${Number(item.product_price).toFixed(2)}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Subtotal: $
                                    {(
                                        Number(item.product_price) *
                                        Number(item.quantity)
                                    ).toFixed(2)}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="cursor-pointer rounded bg-gray-300 px-3 py-1 hover:bg-gray-400"
                                    onClick={() =>
                                        updateCartItems(
                                            item.id,
                                            item.quantity - 1
                                        )
                                    }
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>

                                <span className="min-w-6 text-center font-semibold">
                                    {item.quantity}
                                </span>

                                <button
                                    type="button"
                                    className="cursor-pointer rounded bg-gray-300 px-3 py-1 hover:bg-gray-400"
                                    onClick={() =>
                                        updateCartItems(
                                            item.id,
                                            item.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>

                                <button
                                    type="button"
                                    className="cursor-pointer ml-3 text-red-500 hover:text-red-700"
                                    onClick={() =>
                                        removeFromCart(item.id)
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 flex items-center justify-between border-t border-gray-300 pt-4">
                        <h2 className="text-xl font-bold">
                            Total:
                        </h2>

                        <p className="text-xl font-semibold">
                            ${total.toFixed(2)}
                        </p>

                        <Link to={`/checkout`} className="bg-blue-600 text-white px-6 py-6 rounded-lg hover:bg-blue-700  transition duration-300">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;