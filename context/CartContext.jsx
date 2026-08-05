import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add product to cart
    const addToCart = (product) => {
        setCartItems((currentCartItems) => {
            const existingItem = currentCartItems.find(
                (item) => item.id === product.id
            );

            // Increase quantity when product already exists
            if (existingItem) {
                return currentCartItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: Number(item.quantity) + 1,
                        }
                        : item
                );
            }

            // Add a new product
            return [
                ...currentCartItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    // Remove product from cart
    const removeFromCart = (id) => {
        setCartItems((currentCartItems) =>
            currentCartItems.filter((item) => item.id !== id)
        );
    };

    // Update product quantity
    const updateCartItems = (id, quantity) => {
        const newQuantity = Number(quantity);

        if (newQuantity < 1) {
            return;
        }

        setCartItems((currentCartItems) =>
            currentCartItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: newQuantity,
                    }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCartItems,
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