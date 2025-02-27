import axios from "axios";

const API_URL = "http://localhost:3000";

export const addProduct = async (formData: FormData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/admin/add-product`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const editProduct = async (productId: string, formData: FormData) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found.");
        }
        const response = await axios.put(`${API_URL}/admin/edit-product/${productId}`, formData, {
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error editing product:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to edit product.",
            error: error.response?.data || error.message
        };
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authentication token found.");

        const response = await axios.delete(`${API_URL}/admin/product/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return { success: true, data: response.data };
    } catch (error: any) {
        console.error("Error deleting product:", error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete product.",
            error: error.response?.data || error.message
        };
    }
};


export const getCategories = async ()=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/admin/categories`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const addCategory = async (category: FormData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/admin/add-category`, category, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", 
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

export const getCategoryById = async (categoryId: string) =>
{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/admin/category/${categoryId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error;
    }
}

export const editCategory = async (categoryId: string, category: { name: string }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/admin/edit-category/${categoryId}`, category,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error editing category:", error);
        throw error;
    }
}

export const deleteCategory = async (categoryId: string) =>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/admin/category/${categoryId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}


export const getUsers = async (page: number, sort: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { page, sort } 
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const addUser= async (user: { name: string; phone:string; email: string; password: string; role: string, password_confirmation:string }) => {
    try{
        const token = localStorage.getItem("token");
        const response = await axios.post(`${API_URL}/admin/add-user`, user, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }catch(error){
        console.log("Error while add use: ", error);
        throw error;
    }
}

export const getUserById = async (userId: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/admin/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const updateUser = async (userId: string, user: { name: string; email: string; role: string }) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${API_URL}/admin/user/${userId}`, user, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const blockUser = async (userId: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.patch(`${API_URL}/admin/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error blocking user:", error);
        throw error;
    }
}


export const getOrders = async () =>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/admin/orders`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export const getOrderById = async (orderId: string) =>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/admin/order/${orderId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching order:", error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId: string, status: "pending" | "shipping" | "completed" | "cancelled" | "returned") => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
            `${API_URL}/admin/order/${orderId}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
};
