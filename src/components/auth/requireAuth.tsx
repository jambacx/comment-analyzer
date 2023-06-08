import { RootState } from "@src/redux/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, ComponentType, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function requireAuth(
  WrappedComponent: ComponentType<any> & Record<string, any>
) {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userToken = useSelector((state: RootState) => state?.auth?.token);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        router.replace("/authentication/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Copy static properties
  for (const key in WrappedComponent) {
    // Use an explicit index signature to satisfy TypeScript
    (WithAuth as Record<string, any>)[key] = WrappedComponent[key];
  }

  return WithAuth;
}

export default requireAuth;
