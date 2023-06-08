// ** React Imports
import { ReactNode, ReactElement, useEffect, useState } from "react";
import { RootState } from "@src/redux/store";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: any) => {
  const { children } = props;
  const router = useRouter();
  const [localStorageToken, setLocalStorageToken] = useState<string | null>(
    null
  );

  const userToken = useSelector((state: RootState) => state?.auth?.token);

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");

    setLocalStorageToken(token);

    if (!router.isReady) {
      return;
    }
    console.log(userToken, token);
    if (!token || userToken === null) {
      console.log(userToken, token);
      if (router.asPath !== "/") {
        router.replace({
          pathname: "/authentication/login",
          query: { returnUrl: router.asPath }
        });
      }
    } else {
      console.log("sa");
    }
  }, [router.route]);

  return <>{children}</>;
};

export default AuthGuard;
