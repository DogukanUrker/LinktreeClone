import image from "../assets/iphone14prolinktreeclone.png";
export default function index() {
  return (
    <>
      <div className="w-fit mx-auto select-none">
        <img src={image} alt="" className="w-72 mt-12 lg:w-96 h-fit mb-4" />
      </div>
      <div className="w-fit mx-auto">
        {" "}
        <a
          href="/register"
          className="text-center text-xl text-indigo-500 hover:text-indigo-600 rounded-lg  duration-150 p-2"
        >
          Click for create link pages
        </a>
      </div>
    </>
  );
}
