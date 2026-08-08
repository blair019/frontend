import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import ProductList from "../pages/ProductList.jsx";
import ProductDetail from "../pages/ProductDetails.jsx";
import Navbar from "../components/Navbar.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import PrivateRouter from "../components/PrivateRouter.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import OrderPage from "../pages/Orderpage.jsx";

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================== */}

                <Route
                    path="/"
                    element={<ProductList />}
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetail />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />


                {/* =========================
                    PRIVATE ROUTES
                ========================== */}

                <Route element={<PrivateRouter />}>

                    <Route
                        path="/cart"
                        element={<CartPage />}
                    />

                    <Route
                        path="/checkout"
                        element={<CheckoutPage />}
                    />

                    <Route
                        path="/orders"
                        element={<OrderPage />}
                    />

                </Route>

            </Routes>
        </Router>
    );
}

export default App;