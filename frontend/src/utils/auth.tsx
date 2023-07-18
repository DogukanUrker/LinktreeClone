import { useLocation, Navigate } from "react-router-dom";

export const setToken = (token) => {
  localStorage.setItem("Token", token);
};

export const fetchToken = (token) => {
  return localStorage.getItem("Token");
};

export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
