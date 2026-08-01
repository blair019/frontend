import { useEffect, useState } from "react";

const App = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/products/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`);
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load products.");
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 ">
            <h1>Products</h1>

            {error && <p>{error}</p>}

            {products.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <strong>{product.name}</strong> - ${product.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;