import { Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Profile from "./views/profile";
import Links from "./views/links";
import { RequireToken } from "./utils/auth";
import Navbar from "./components/navbar";
import NotFound from "./views/notFound";
import Index from "./views/index";
function App() {
  return (
    <>
      {" "}
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="links">
            <Route path=":userName" element={<Links />} />
          </Route>
          <Route
            path="/profile"
            element={
              <RequireToken>
                <Profile />
              </RequireToken>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
