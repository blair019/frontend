import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken} from "../utils/auth.js";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const BASE_URL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Fetch Cart from BE

    const fetchCart = async () => {
        try {
                const res = await authFetch(`${BASE_URL}/api/cart/`);
                const data = await res.json();
                setCartItems(data.items || []);
                setTotal(data.total || 0);

        }catch (error) {
            console.log("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, [])


    // Add product to cart
    const addToCart = async (product) => {
        try {
            await authFetch(`${BASE_URL}/api/cart/add/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({product_id: product}),
            })
            fetchCart();
        }catch (error) {
            console.log("Error adding to cart",error);
        }
    }

    // Remove product from cart
    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`${BASE_URL}/api/cart/remove/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ item_id: itemId }),
            })
            fetchCart();
        } catch(error) {
            console.log("Error deleting cart:", error);
        }
    }

    // Update product quantity
    const updateCartItems = async (itemId, quantity) => {
        if (quantity < 1) {
            await removeFromCart(itemId);
            return;
        }
          try  {
              await authFetch(`${BASE_URL}/api/cart/update/`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({item_id: itemId, quantity}),
              })
              fetchCart();
          } catch(error) {
              console.log("Error updating cart:", error);
          }
    }

    const clearCart = async () => {
        setCartItems([]);
        setTotal(0)
    }


    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItems,
                total,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used inside a CartProvider.");
    }

    return context;
};