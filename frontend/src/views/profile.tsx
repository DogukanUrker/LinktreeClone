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
          </form>
        </div>
      );
    });
  };
  const addLink = () => {
    if (link == "" && text == "" && bgColor == "" && textColor == "") {
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
  return (
    <>
      <div className="mt-4 w-fit m-auto">
        <h1 className="text-2xl text-center select-none">Add New Link</h1>
        <form>
          <input
            type="text"
            className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
            placeholder="text"
            onChange={(event) => setText(event.target.value)}
          />
          <input
            type="text"
            className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
            placeholder="link"
            onChange={(event) => setLink(event.target.value)}
          />
          <input
            type="text"
            className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
            placeholder="textColor"
            onChange={(event) => setBGColor(event.target.value)}
          />
          <input
            type="text"
            className="w-fit p-2 m-2 border-slate-400 border-2 rounded-md outline-indigo-500"
            placeholder="bgcolor"
            onChange={(event) => setTextColor(event.target.value)}
          />
          <button
            onClick={addLink}
            className="p-2 bg-indigo-500 rounded-md text-white hover:bg-indigo-600 transtion duration-150"
          >
            Add Link
          </button>
        </form>
      </div>
      <div className="mt-4 w-fit mx-auto mt-4">{renderLinks()}</div>
    </>
  );
}
