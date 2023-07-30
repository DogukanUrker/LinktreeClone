import image from "../assets/iphone14prolinktreeclone.png";
import Wave from "react-wavify";
export default function index() {
  return (
    <>
      <div className="w-fit mx-auto select-none">
        <a href="/links/DogukanUrker" target="_blank">
          <img
            src={image}
            alt="DogukanUrker's Links"
            className="lg:mt-8 mt-4 lg:w-96 mb-4 w-[75%] h-[75%] mx-auto md:w-80"
          />
        </a>
      </div>
      <div className="w-fit mx-auto">
        {" "}
        <a
          href="/register"
          className="text-center text-xl text-indigo-500 hover:text-indigo-600 rounded-lg  duration-150 p-2"
        >
          Click for create custom link page
        </a>
      </div>
      <Wave
        fill="#6366F1"
        style={{
          display: "flex",
          marginTop: "0.5rem",
          height: "7.25rem",
        }}
        options={{
          height: 20,
          amplitude: 15,
          speed: 0.15,
          points: 2,
        }}
      />
    </>
  );
}
