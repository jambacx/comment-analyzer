import { createContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";

import axios from "axios";
import authConfig from "@src/configs/auth";

import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType
} from "./types";

// ** Defaults
const defaultProvider: AuthValuesType = {
  loading: true,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async (response) => {
        params.rememberMe
          ? window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              response.data.accessToken
            )
          : null;
        const returnUrl = router.query.returnUrl;

        params.rememberMe
          ? window.localStorage.setItem(
              "userData",
              JSON.stringify(response.data.userData)
            )
          : null;

        const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";

        router.replace(redirectURL as string);
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/login");
  };

  const values = {
    loading,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
