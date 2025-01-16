import axios from "axios";
import { signOut } from "next-auth/react";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// add a response interceptor
apiClient.interceptors.response.use(
    (response) => response, // if the response is successful, just return it
    async (error) => {
        if (error.response?.status === 401) {
            // automatically log the user out if the token is invalid or expired
            await signOut({ callbackUrl: '/sign-in' });
        }
        return Promise.reject(error); // Pass the error to the calling function
    }
)

export default apiClient;