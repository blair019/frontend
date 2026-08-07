import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductList from "../pages/ProductList.jsx";
import ProductDetail from "../pages/ProductDetails.jsx";
import Navbar from "../components/Navbar.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";

function App() {
    return (
        <div >
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;