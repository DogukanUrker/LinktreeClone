import { useState } from "react";
import axios from "axios";
import { fetchUser } from "../utils/auth";
export default function Edit() {
  const [link, setLink] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const addLink = () => {
    if (link == "" && bgColor == "" && textColor == "") {
      return;
    } else {
      axios
        .post("http://localhost:8000/addLink/", {
          author: fetchUser(),
          link: link,
          bgColor: bgColor,
          textColor: textColor,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };
  return (
    <>
      <div className="container mx-auto select-none w-fit text-center mt-10">
        <form>
          <input
            type="text"
            className="block mx-auto text-center my-2 border-2 border-solid border-indigo-400 p-1 rounded transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            placeholder="link"
            onChange={(event) => setLink(event.target.value)}
          />
          <input
            type="text"
            className="block mx-auto text-center my-2 border-2 border-solid border-indigo-400 p-1 rounded transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            placeholder="background color hex"
            onChange={(event) => setBgColor(event.target.value)}
          />
          <input
            type="text"
            className="block mx-auto text-center my-2 border-2 border-solid border-indigo-400 p-1 rounded transition duration-200 outline-indigo-700 focus:outline-none focus:ring focus:ring-indigo-400"
            placeholder="text color hex"
            onChange={(event) => setTextColor(event.target.value)}
          />
          <button
            className="block m-auto my-2 bg-indigo-500 p-2 text-base font-medium hover:bg-indigo-600 transition rounded-md text-slate-50"
            type="button"
            onClick={addLink}
          >
            Add Link
          </button>
        </form>
      </div>
    </>
  );
}
