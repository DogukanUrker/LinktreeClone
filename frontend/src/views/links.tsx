import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { colorL, colorR } from "../utils/randomColor";
export default function Links() {
  let { userName } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/fetchLinks/${userName}`)
      .then((json) => setData(json.data));
  }, []);
  const renderLinks = () => {
    return data.map((link) => {
      return (
        <a
          href={link.link}
          target="_blank"
          className="w-36 p-4 m-4 rounded-md transition duration-150 ease-in-ou block font-medium text-lg"
          style={{ backgroundColor: link.bgColor, color: link.textColor }}
        >
          {link.text}
        </a>
      );
    });
  };

  return (
    <>
      <div
        className={`bg-gradient-to-r ${colorL} ${colorR} select-none text-center`}
      >
        <div className="absolute left-[50%] mt-8">
          <h1 className="font-medium text-4xl relative left-[-50%]">
            {userName}
          </h1>
        </div>
        <div className=" container  grid h-screen place-items-center w-fit mx-auto">
          <div>{renderLinks()}</div>
        </div>
      </div>
    </>
  );
}
