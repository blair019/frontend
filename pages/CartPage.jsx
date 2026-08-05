import { useCart } from "../context/CartContext.jsx";

function CartPage() {
    const {
        cartItems,
        removeFromCart,
        updateCartItems,
    } = useCart();

    const total = cartItems.reduce(
        (acc, item) =>
            acc + Number(item.price) * Number(item.quantity),
        0
    );

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
                            <div>
                                <h2 className="text-lg font-bold">
                                    {item.name}
                                </h2>

                                <p className="text-gray-600">
                                    ${Number(item.price).toFixed(2)}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Subtotal: $
                                    {(
                                        Number(item.price) *
                                        Number(item.quantity)
                                    ).toFixed(2)}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="rounded bg-gray-300 px-3 py-1 hover:bg-gray-400"
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
                                    className="rounded bg-gray-300 px-3 py-1 hover:bg-gray-400"
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
                                    className="ml-3 text-red-500 hover:text-red-700"
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
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;