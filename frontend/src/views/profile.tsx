import { useNavigate } from "react-router";
export default function Profile() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("randomToken");
    navigate("/");
  };

  return (
    <>
      <div className="container mx-auto select-none w-fit text-center mt-10">
        <h1>User profile page</h1>
        <button onClick={signOut}>sign out</button>
      </div>
    </>
  );
}
