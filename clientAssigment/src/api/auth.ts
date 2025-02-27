import axios from "axios";

const API_URL = "http://localhost:3000";

export const registerUser = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error: any) {
        console.error("Error registering user:", error?.response?.data || error.message);
        return error?.response?.data || null; 
    }
};

export const verifyEmailRequest = async (token: string) => {
    try {
        const response = await axios.post(`${API_URL}/verify-email/${token}`);
        return response.data;
    } catch (error: any) {
        console.error("Error verifying email:", error?.response?.data || error.message);
        return error?.response?.data || null;
    }
}

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        return response.data;
    } catch (error: any) {
        console.error("Login error:", error?.response?.data || error.message);
        return error?.response?.data || { success: false, message: "Server error" };
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/logout`);
        return response.data;
    } catch (error: any) {
        console.error("Error logging out:", error?.response?.data || error.message);
        return error?.response?.data || null;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        return response.data;
    } catch (error: any) {
        console.error("Error sending forgot password email:", error?.response?.data || error.message);
        return error?.response?.data || null;
    }
}

export const resetPassword = async (token:string, password: string, password_confirmation: string) => {
    try {
        const response = await axios.post(`${API_URL}/reset-password`, {token, password, password_confirmation });
        return response.data;
    } catch (error: any) {
        console.error("Error resetting password:", error?.response?.data || error.message);
        return error?.response?.data || null;
    }
}
