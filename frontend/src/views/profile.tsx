import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "../utils/auth";
import { useNavigate } from "react-router";
import { HexColorPicker } from "react-colorful";
import { API } from "../dependencies";
export default function Profile() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    navigate("/");
  };
  const [data, setData] = useState([]);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#fff");
  const [bgColor, setBGColor] = useState("#000");
  useEffect(() => {
    axios
      .get(`${API}fetchLinks/${fetchUser()}`)
      .then((json) => setData(json.data));
  }, []);
  const renderLinks = () => {
    return data.map((link) => {
      return (
        <div>
          <form className="flex lg:flex-row flex-col justify-evenly items-center mb-4">
            <input
              disabled
              type="text"
              value={link.text}
              className="w-28 p-2 m-2 rounded-md bg-zinc-800/50 text-white text-center focus:outline-none"
            />
            <input
              disabled
              type="text"
              value={link.link}
              className="w-72 p-2 m-2 rounded-md bg-zinc-800/50 text-white text-center focus:outline-none"
            />
            <div className="w-fit text-center">
              <p className="text-white">Text Color:</p>
              <HexColorPicker color={link.textColor} className="m-4 " />
            </div>
            <div className="w-fit text-center">
              <p className="text-white">Background Color:</p>
              <HexColorPicker color={link.bgColor} className="m-4 " />
            </div>
            <button
              onClick={() => deleteLink(link.text)}
              className="p-2 bg-red-500 rounded-md text-white hover:bg-red-600 duration-150"
            >
              Delete
            </button>
          </form>
        </div>
      );
    });
  };
  const deleteLink = (linkText: string) => {
    axios
      .delete(`${API}deleteLink/${linkText}`)
      .then(function (response) {
        console.log(response);
        navigate("/profile");
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };
  const addLink = () => {
    if (!text) {
      return;
    } else {
      axios
        .post(`${API}addLink/`, {
          author: fetchUser(),
          link: link,
          text: text,
          textColor: textColor,
          bgColor: bgColor,
        })
        .then(function (response) {
          console.log(response);
          navigate("/profile");
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };
  const addLinkComponent = () => {
    return (
      <form className="flex lg:flex-row flex-col justify-evenly items-center">
        <input
          type="text"
          className="w-28 text-center p-2 m-2 rounded-md outline-indigo-700 bg-zinc-800/50 text-white focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="Text"
          onChange={(event) => setText(event.target.value)}
        />
        <input
          type="text"
          className="w-72 text-center p-2 m-2 rounded-md outline-indigo-700 bg-zinc-800/50 text-white focus:outline-none focus:ring focus:ring-indigo-400"
          placeholder="URL"
          onChange={(event) => setLink(event.target.value)}
        />
        <div className="w-fit text-center ">
          <p className="text-white">Text Color:</p>
          <HexColorPicker
            color={textColor}
            onChange={setTextColor}
            className="m-4 "
          />
        </div>
        <div className="w-fit text-center">
          <p className="text-white">Background Color:</p>
          <HexColorPicker
            color={bgColor}
            onChange={setBGColor}
            className="m-4 "
          />
        </div>
        <button
          onClick={addLink}
          className="p-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-600 duration-150"
        >
          Add Link
        </button>
      </form>
    );
  };
  return (
    <>
      <div className="w-fit mt-4 text-center mx-auto text-white transition duration-200">
        <a
          href={"/links/" + fetchUser()}
          target="_blank"
          className="bg-indigo-500 hover:bg-indigo-600 p-2 rounded-md"
        >
          Links Page
        </a>
        <button
          className="inline-block ml-2 mr-3 py-2 px-6 bg-gray-700 hover:bg-gray-800 text-sm text-white font-bold rounded-md transition duration-200"
          onClick={Logout}
        >
          sign out
        </button>
      </div>
      <div className="mt-12 w-fit mx-auto">
        {renderLinks()} {addLinkComponent()}
      </div>
    </>
  );
}
