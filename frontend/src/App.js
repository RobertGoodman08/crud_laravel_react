import Home from "./pages/Home";
import React from "react";
import {Link} from "react-router-dom";
import MyRouter from "./routers";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
        <Navbar />

        <MyRouter />
    </div>
  );
}

export default App;
