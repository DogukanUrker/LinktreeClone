import { useNavigate } from "react-router-dom";
import { fetchToken, fetchUser } from "../utils/auth";
export default function Navbar() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };
  const url = window.location.pathname;
  if (!url.includes("links")) {
    return (
      <>
        <nav className="relative px-4 py-4 flex justify-between items-center bg-gradient-to-r from-indigo-500/90 via-purple-500/90 to-pink-600/90 max-w-6xl mx-auto rounded-xl mt-2">
          <a className="text-3xl font-bold leading-none" href="/">
            <h1 className="text-white">Linktree Clone</h1>
          </a>
          {fetchToken() ? (
            <div>
              <button
                className="inline-block ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-md transition duration-200"
                onClick={Logout}
              >
                sign out
              </button>
              <a
                className="inline-block py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold rounded-md transition duration-200"
                href="/profile"
              >
                {fetchUser()}
              </a>
            </div>
          ) : (
            <div>
              <a
                className="inline-block ml-auto mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-md transition duration-200"
                href="/login"
              >
                Login
              </a>
              <a
                className="inline-block py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold rounded-md transition duration-200"
                href="/register"
              >
                Sign up
              </a>
            </div>
          )}
        </nav>
      </>
    );
  }
}
