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
        <div>
          <p>{link.author}</p>
          <p>{link.text}</p>
          <p>{link.link}</p>
          <p>{link.bgColor}</p>
          <p>{link.textColor}</p>
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
