import { useState, useEffect } from "react";
import axios from "axios";
import { fetchUser } from "../utils/auth";
import { useNavigate } from "react-router";
export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [bgColor, setBGColor] = useState("");
  const [textColor, setTextColor] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/fetchLinks/${fetchUser()}`)
      .then((json) => setData(json.data));
  }, []);
  const renderLinks = () => {
    return data.map((link) => {
      return (
        <div>
          <form>
            <input
              type="text"
              className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
              value={link.text}
            />
            <input
              type="text"
              className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
              value={link.link}
            />
            <input
              type="text"
              className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
              value={link.bgColor}
            />
            <input
              type="text"
              className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
              value={link.textColor}
            />
            <button
              onClick={() => deleteLink(link.text)}
              className="p-2 bg-red-500 rounded-md text-white hover:bg-red-600 transtion duration-150"
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
      .delete(`http://localhost:8000/deleteLink/${linkText}`)
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
        .post("http://localhost:8000/addLink/", {
          author: fetchUser(),
          link: link,
          text: text,
          bgColor: bgColor,
          textColor: textColor,
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
      <form>
        <input
          type="text"
          className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
          placeholder="Text"
          onChange={(event) => setText(event.target.value)}
        />
        <input
          type="text"
          className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
          placeholder="URL"
          onChange={(event) => setLink(event.target.value)}
        />
        <input
          type="text"
          className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
          placeholder="Text Color HEX"
          onChange={(event) => setTextColor(event.target.value)}
        />
        <input
          type="text"
          className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
          placeholder="Background Color HEX"
          onChange={(event) => setBGColor(event.target.value)}
        />
        <button
          onClick={addLink}
          className="p-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-600 transtion duration-150"
        >
          Add Link
        </button>
      </form>
    );
  };
  return (
    <>
      <div className="mt-[5%] w-fit mx-auto">
        {renderLinks()} {addLinkComponent()}
      </div>
    </>
  );
}
