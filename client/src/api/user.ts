import axios from 'axios';

const API_URL = 'http://localhost:3000';

export async function getUsers() {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
}

export const changeUserInfo = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/change-user-info`, data, 
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
    );  
    return response.data;

  } catch (error) {
    console.log("Error while change user info:", error);
    return (error as any)?.response?.data || null;
  }
}
