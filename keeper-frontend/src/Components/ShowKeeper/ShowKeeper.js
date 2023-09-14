import React from "react";
import "./ShowKeeper.css";
import axios from "axios";

export default function ShowKeeper({ keeperList, setKeeperList }) {
  const deleteKeeper = (id) => {
    axios
      .post("http://localhost/api/delete", {id})
      .then((res) => setKeeperList(res.data))
      .catch((err) => console.log("axios error", err));
  };

  return (
    <div className="show-keeper">
      {keeperList.map((keeper) => (
        <div className="keeper-card" key={keeper._id}>
          <h1 className="title">
            {keeper.title}
            <i
              className="fa fa-trash pointer"
              aria-hidden="true"
              onClick={() => deleteKeeper(keeper._id)}
            ></i>
          </h1>
          <textarea
            name=""
            className="description-box"
            value={keeper.description}
          ></textarea>
        </div>
      ))}
    </div>
  );
}
