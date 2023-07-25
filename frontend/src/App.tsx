import { Routes, Route, useParams } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import Profile from "./views/profile";
import Links from "./views/links";
import Edit from "./views/edit";
import { RequireToken } from "./utils/auth";
import Navbar from "./components/navbar";
function App() {
  return (
    <>
      {" "}
      <div className="App">
        <Navbar></Navbar>
        <Routes>
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
          <Route
            path="/edit"
            element={
              <RequireToken>
                <Edit />
              </RequireToken>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
