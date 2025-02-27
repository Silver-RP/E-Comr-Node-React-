import axios from "axios";

const API_URL = "http://localhost:3000";

export const getHomeProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching home products:", error);
    throw error;
  }
};

export const getShopProducts = async (page: number, sort: string) => {
  try {
    const response = await axios.get(`${API_URL}/shop?page=${page}&sort=${sort}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shop products:", error);
    throw error;
  }
};

export const fetchProduct = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const fetchCategoryProducts = async (cateId: string) => {
  try {
    const response = await axios.get(`${API_URL}/category-pro/${cateId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw error;
  }
}

export const addToCartRequest = async (productId: string, token: string, quantity: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-to-cart`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding to cart:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to add to cart",
    };
  }
};

export const fetchCartRequest = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      success: true,
      cart: Array.isArray(response.data.cart) ? response.data.cart : [],
    };
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return { success: false, cart: [] };
  }
};

export const updateCartRequest = async (productId: string, token: string, quantity: number) => {
  try {
    const response = await axios.put(
      `${API_URL}/cart-update`,
      { productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      success: response.data.success || false,
      cart: response.data.cart || [],
    };
  } catch (error: any) {
    console.error("Failed to update cart: ", error.response?.data || error.message);
    return {
      success: false,
      cart: [],
      message: error.response?.data?.message || "Failed to update cart",
    };
  }
};

export const removeCartItem = async (productId: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete product from cart:", error);
  }
};

export const addPlaceOrder = async (orderData: any) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post(`${API_URL}/place-order`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to place order:", error);
  }
};

export const getPlaceOrder = async (orderId: string) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to getPlaceOrder:", error);
    return null;
  }
};

export const getPlaceOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
  } catch (error) {
    console.error("Failed to getPlaceOrders:", error);
    return null;
    
  }
}

export const toggleWishlist = async (productId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/add-to-wishlist`,
      { productId },  
      { headers: { Authorization: `Bearer ${token}` }, }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to toggleWishlist:", error);
    return { success: false, message: "Failed to update wishlist" };
  }
};

export const getWishlist = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to getWishlist:", error);
    return null;
  }
}

export const cancelOrder = async (orderId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/cancel-order/${orderId}`,
      {}, 
      { headers: { Authorization: `Bearer ${token}` }, }
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to cancel order:", error);
    return error.response?.data || { success: false, message: "Failed to cancel order" };
  }
};





