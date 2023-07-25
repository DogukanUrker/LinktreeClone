import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/fetchLinks/test")
      .then((json) => setData(json.data));
  }, []);
  const renderLinks = () => {
    return data.map((link) => {
      return (
        <div
          className="w-36 p-4 text-center m-4 rounded-md transition duration-150 ease-in-ou"
          style={{ backgroundColor: link.bgColor }}
        >
          <a href={link.link} target="_blank" style={{ color: link.textColor }}>
            {link.text}
          </a>
        </div>
      );
    });
  };

  return (
    <>
      <div>
        <div id="links">{renderLinks()}</div>
      </div>
    </>
  );
}
