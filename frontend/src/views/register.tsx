import { useNavigate, Navigate } from "react-router";
import { fetchToken, setToken, setUser } from "../utils/auth";
import { useState } from "react";
import axios from "axios";
import { API } from "../dependencies";
export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const addUser = () => {
    if (username == "" && email == "" && password == "") {
      return;
    } else {
      axios
        .post(`${API}userRegister/`, {
          username: username,
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };
  return (
    <div>
      <div className="grid h-screen place-items-center select-none">
        {fetchToken() ? (
          <Navigate to="/profile" />
        ) : (
          <div className="container mx-auto w-64 p-4 bg-zinc-800 rounded-2xl">
            <form className="flex items-stretch flex-wrap">
              <input
                type="text"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-indigo-400 bg-zinc-800/50 text-white p-1 rounded-md transition outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="username"
              />
              <input
                type="email"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-indigo-400 bg-zinc-800/50 text-white p-1 rounded-md transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
              />
              <input
                type="password"
                autoComplete="new-password"
                className="block mx-auto text-center my-2 border-2 border-solid border-indigo-400 bg-zinc-800/50 text-white p-1 rounded-md transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="password"
              />
              <button
                className="block m-auto my-2 bg-indigo-500 p-2 text-base font-medium hover:bg-indigo-600 transition duration-200 rounded-md text-slate-50"
                type="button"
                onClick={addUser}
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
