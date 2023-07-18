import { useLocation, Navigate } from "react-router-dom";

export const setToken = (token) => {
  localStorage.setItem("Token", token);
};

export const setUser = (user) => {
  localStorage.setItem("User", user);
};

export const fetchToken = (token) => {
  return localStorage.getItem("Token");
};

export const fetchUser = (user) => {
  return localStorage.getItem("User");
};

export function RequireToken({ children }) {
  let auth = fetchToken();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
