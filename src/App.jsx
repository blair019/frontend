import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProductList from "../pages/ProductList.jsx";
import ProductDetail from "../pages/ProductDetails.jsx";

function App() {
    return (
        <div >
            <Router>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;