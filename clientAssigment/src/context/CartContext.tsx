import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addToCartRequest, fetchCartRequest, updateCartRequest, removeCartItem, addPlaceOrder } from "../api/app";
import { useNotification } from "./NotificationContext";

// Define types
interface CartProduct {
  _id: string;
}
interface CartItem {
  productId: string | CartProduct;
  quantity: number;
}


interface CartContextType {
  cart: CartItem[];
  addToCart: (
    productId: string,
    token: string,
    quantity: number
  ) => Promise<{ success: boolean }>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  totalCartQuantity: number;
  loadCart: (token: string) => Promise<void>;
  handleRemoveItem: (productId: string ) => Promise<void>;
  handlePlaceOrder: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
const { showNotification } = useNotification() as unknown as { showNotification: (message: string) => void };


  const loadCart = async (token: string) => {
    try {
      const response: any = await fetchCartRequest(token);
      if (response.success && response.cart) {
        setCart(response.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCart(token);
    }
  }, []);

  const addToCart = async ( productId: string, token: string, quantity: number) => {
    try {
      const response: any = await addToCartRequest(productId, token, quantity);
      if (response.success === true) {
        await loadCart(token);
        showNotification("Added to cart successfully!");
      }
      return response;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { success: false };
    }
  };

  const updateCartQuantity = async (productId: string, newQuantity: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user must be logged in.");
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) => {
          const id = typeof item.productId === "object" ? item.productId._id : item.productId; 
          return id === productId ? { ...item, quantity: newQuantity } : item;
        })
      );


      const response: any = await updateCartRequest(
        productId,
        token,
        newQuantity
      );
      if (!response.success) {
        console.error("Failed to update cart on the server");
        await loadCart(token);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!window.confirm("Are you sure you want to remove this item?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("User not logged in.");
        return;
      }

      const response = await removeCartItem(productId, token);

      if (response.success === true) {
        setCart((prevCart) =>
          prevCart.filter((item) =>
            typeof item.productId === "string"
              ? item.productId !== productId
              : item.productId._id !== productId
          )
        );

      } else {
        console.error("Failed to remove item from cart.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handlePlaceOrder = async () => {
  
    const form = document.forms.namedItem("checkout-form") as HTMLFormElement | null;
    if (!form) {
      console.error("Checkout form not found!");
      return;
    }
    const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
    const total = cartData.total || 0;
    const shippingFee = cartData.shippingFee || 0;
    const shippingMethod = cartData.shippingMethod || "Free shipping";

  
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value.trim();
    const city = (form.elements.namedItem("city") as HTMLInputElement)?.value.trim();
    const address = (form.elements.namedItem("address") as HTMLInputElement)?.value.trim();
    const addressDetails = (form.elements.namedItem("address-details") as HTMLInputElement)?.value.trim();
    const paymentMethod = (document.querySelector('input[name="payment_method"]:checked') as HTMLInputElement)?.id;
  
    if (!name || !phone || !city || !address || !addressDetails || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const response = await addPlaceOrder({ name, phone, city, address, addressDetails, paymentMethod, shippingFee, shippingMethod, total });
      console.log("response order: ", response)
      if (response?.success) {
        alert("Order placed successfully!");
        localStorage.removeItem("cart"); 
        setCart([]); 
        window.location.href = `/order-confirmation/${response.orderId}`; 
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
    }
  };
  
  



  const totalCartQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        totalCartQuantity,
        loadCart,
        handleRemoveItem,
        handlePlaceOrder,
        // showNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
