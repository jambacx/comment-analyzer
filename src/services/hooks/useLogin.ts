import { useEffect } from 'react';
import { useFetcher } from '../useFetcher';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setToken } from "@src/redux/authSlice";
import Cookies from 'js-cookie';

interface LoginData {
    email: string;
    password: string;
}

export function useLogin() {
    const { status, error, response, fetcher } = useFetcher();
    const router = useRouter();
    const dispatch = useDispatch();

    const login = async (loginData: LoginData) => {
        fetcher({
            method: "post",
            url: "/customer/auth/login",
            options: loginData
        });
    };

    useEffect(() => {
        if (status === "done" && !error && response) {
            if (response?.data) {
                const token = response?.data?.token;
                Cookies.set("access_token", token, { expires: 7 });
                dispatch(setToken(token))
            }
            router.push('/');
        }
    }, [status, error, response]);

    return {
        error, status, response, login
    };
}
