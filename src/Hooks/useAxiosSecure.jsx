import axios from "axios";
import React, { use, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { user, logoutUser } = use(AuthContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        //   console.log('Attaching token:', user?.accessToken);
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logoutUser()
            .then(() => {
              console.log("Signed out user due to unauthorized response");
            })
            .catch((logoutError) => {
              console.error("Logout error:", logoutError);
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logoutUser]);

  return axiosInstance;
};

export default useAxiosSecure;
