import { RootState } from "@src/redux/store";
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";
import { useDispatch, useSelector } from "react-redux";

function requireAuth(
  WrappedComponent: ComponentType<any> & Record<string, any>
) {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userToken = useSelector((state: RootState) => state?.auth?.token);

    useEffect(() => {
      const token = window.localStorage.getItem("access_token");

      if (!token) {
        console.log("ok");
        router.replace("/authentication/login");
      }
    }, [router]);

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
