import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header/Header";
import AddKeeper from "./Components/AddKeeper/AddKeeper";
import ShowKeeper from "./Components/ShowKeeper/ShowKeeper";

function App() {
  const [keeperList, setKeeperList] = useState([]); // Initialize keeperList as an empty array

  useEffect(() => {
    axios
      .get("http://localhost/api/getAll")
      .then((res) => setKeeperList(res.data))
      .catch((err) => console.log("useEffect axios error", err));
  }, []);

  return (
    <div className="App">
      {console.log(keeperList)}
      <Header />
      <AddKeeper keeperList={keeperList} setKeeperList={setKeeperList} />
      <ShowKeeper keeperList={keeperList} setKeeperList={setKeeperList}/>
    </div>
  );
}

export default App;
