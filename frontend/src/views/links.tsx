import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { gradient } from "../utils/randomGradient";
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
          className="w-36 p-4 m-4 mx-auto rounded-md transition duration-150 ease-in-ou block font-medium text-lg hover:scale-125"
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
        className={`${gradient} select-none text-center grid place-items-center h-screen w-screen`}
      >
        <div className="w-fit">
          <h1 className="font-semibold text-3xl mb-8 ">{userName}</h1>
          {renderLinks()}
        </div>
      </div>
    </>
  );
}
