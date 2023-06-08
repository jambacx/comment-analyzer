import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const checkIfUserIsAuthenticated = () => {
  const token = window.localStorage.getItem("access_token");

  return token ? true : false;
};
