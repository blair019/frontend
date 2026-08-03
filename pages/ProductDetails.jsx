import {Link, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";

function ProductDetails() {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL}/api/product/${id}`, {})
            .then(response => {
                if (!response.ok) {
                    throw new Error("Response returned error");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data)
                setLoading(false);
            })
            .catch((error) => {
                setError(error)
                setLoading(false);
            })
    }, [id,BASE_URL])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>No product found</div>
    }
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover rounder-lg mb-4"
                    />

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 mb-5">{product.description}</p>
                        <p className="text-2xl font-semibold text-gray-600 mb-6">{product.price}</p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Add to Cart
                        </button>
                        <div>
                            <a
                                href={"/"}
                                className="text-blue-600 hover:underline"
                            >
                                Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;