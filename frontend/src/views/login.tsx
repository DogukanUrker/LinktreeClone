import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../utils/auth";
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
          console.log(response.data.token, "response.data.token");
          if (response.data.token) {
            setToken(response.data.token);
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
            You are already logged in!
          </p>
        ) : (
          <div className="container mx-auto w-64 p-4 bg-gray-200/50 rounded-2xl">
            <form className="flex items-stretch flex-wrap">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="block mx-auto my-2 border-2 border-solid border-emerald-400 p-1 rounded transition outline-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
              />
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block mx-auto my-2 border-2 border-solid border-emerald-400 p-1 rounded transition outline-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={login}
                className="block m-auto my-2 bg-emerald-500 p-2 text-base font-medium hover:bg-emerald-600 transition rounded text-slate-50"
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
