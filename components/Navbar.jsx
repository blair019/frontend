import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    return (
        <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md">
            <Link
                to="/"
                className="text-2xl font-bold text-gray-800"
            >
                MohitCart
            </Link>

            <Link
                to="/cart"
                className="relative font-medium text-gray-800 hover:text-gray-600"
            >
                Cart

                {cartCount > 0 && (
                    <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                        {cartCount}
                    </span>
                )}
            </Link>
        </nav>
    );
}

export default Navbar;