import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

namespace HTTP {
  interface RequestConfig extends AxiosRequestConfig<Record<string, any>> {
    params?: Record<string, any>;
    body?: Record<string, any>;
    isSecure?: boolean;
    defaults?: Record<string, any>;
  }

  const instance: AxiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: false,
    proxy: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
  });

  instance.interceptors.request.use(config => {
    if (config) {
      const accessToken = Cookies.get("access_token");

      if (accessToken) {
        config.headers["access-token"] = accessToken;
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response && error.response.data && error.response.data.code && error.response.data.code != 102) {
        window.location.href = `/${error.response.data.code}${window.location.search}`;
      }
      return Promise.reject(error);
    }
  );

  const request = async <T>(options: AxiosRequestConfig): Promise<T> => {
    try {
      if (options.url) {
        options.url = encodeURI(options.url);
      }

      return await instance.request<T, any>({
        ...options,
      });
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        throw error.response.data;
      } else if (error) {
        throw error;
      }
      throw new Error("Unhandled error");
    }
  };

  export const get = async <T>(url: string, options?: RequestConfig): Promise<T> => {
    return await request<T>({
      method: "GET",
      url,
      params: options?.params,
      ...options,
    });
  };

  export const post = async <T>(url: string, options?: RequestConfig): Promise<T> => {
    return await request<T>({
      method: "POST",
      url,
      ...options,
      data: options,
    });
  };
}

export default HTTP;
