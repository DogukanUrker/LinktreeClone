import { useNavigate, Navigate } from "react-router";
import { fetchToken, setToken, setUser } from "../utils/auth";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username == "" && password == "") {
      return;
    } else {
      axios
        .post("http://localhost:8000/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          if (response.data.token) {
            setToken(response.data.token);
            setUser(response.data.user);
            navigate("/profile");
          }
        })
        .catch(function (error) {
          alert("user not found");
          console.log(error, "error");
        });
    }
  };

  return (
    <div>
      <div className="grid h-screen place-items-center select-none">
        {fetchToken() ? (
          <p className="text-2xl font-medium text-red-600">
            <Navigate to="/" />
          </p>
        ) : (
          <div className="container mx-auto w-64 p-4 bg-gray-50 rounded-2xl">
            <form className="flex items-stretch flex-wrap">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block mx-auto my-2 border-2 text-center border-solid border-indigo-400 p-1 rounded transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
              />
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block mx-auto my-2 border-2 text-center border-solid border-indigo-400 p-1 rounded transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={login}
                className="block m-auto my-2 bg-indigo-500 p-2 text-base font-medium hover:bg-indigo-600 transition duration-200 rounded-md text-slate-50"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
