import React, { useState } from "react";
import axios from "axios";
import "./AddKeeper.css";

export default function AddKeeper({setKeeperList}) {
  const [keeperObj, setKeeperObj] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeeperObj({
      ...keeperObj,
      [name]: value,
    });
  };

  const add = () => {
    if (keeperObj.title) {
      axios
        .post("http://localhost/api/addNew", keeperObj)
        .then((res) => setKeeperList(res.data))
        .catch((err) => console.log("axios error", err));
    }
    setKeeperObj({
      title:'',
      description:'',
    });
  };

  return (
    <div className="add-keeper">
      <input
        type="text"
        className="input-box title-input"
        name="title"
        placeholder="Add Title"
        onChange={handleChange}
        value={keeperObj.title}
      ></input>
      <textarea
        name="description"
        className="input-box description"
        placeholder="Add Description"
        onChange={handleChange}
        value={keeperObj.description}
      ></textarea>
      <div className="add-button" onClick={add}>
        Add
      </div>
    </div>
  );
}
