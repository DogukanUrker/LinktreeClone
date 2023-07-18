import { useNavigate } from "react-router";
import { fetchToken, setToken } from "../utils/auth";
import { useState } from "react";
import axios from "axios";

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
        .post("http://localhost:8000/userRegister/", {
          username: username,
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response, "response.data.token");

          setToken(response.data.token);
          navigate("/profile");
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
          <p className="text-2xl font-medium text-red-600">
            You are already logged in!
          </p>
        ) : (
          <div className="container mx-auto w-64 p-4 bg-gray-200/50 rounded-2xl">
            <form className="flex items-stretch flex-wrap">
              <input
                className="block mx-auto my-2 border-2 border-solid border-emerald-400 p-1 rounded transition outline-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
              />
              <input
                className="block mx-auto my-2 border-2 border-solid border-emerald-400 p-1 rounded transition outline-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
              <input
                className="block mx-auto my-2 border-2 border-solid border-emerald-400 p-1 rounded transition outline-emerald-700 focus:outline-none focus:ring focus:ring-emerald-400"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              <button
                className="block m-auto my-2 bg-emerald-500 p-2 text-base font-medium hover:bg-emerald-600 transition rounded text-slate-50"
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
