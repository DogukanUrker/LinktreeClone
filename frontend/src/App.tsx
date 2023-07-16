import { Routes, Route } from "react-router-dom";
import Login from "./views/login";
import Profile from "./views/profile";
import { RequireToken } from "./utils/auth";

function App() {
  return (
    <>
      {" "}
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
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
