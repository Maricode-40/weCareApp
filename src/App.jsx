import "./App.css";
import { Login } from "./pages/Login/Login";
import { Body } from "./pages/Body/Body";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
//import { useEffect } from "react";

function App() {
//const [count, setCount] = useState(0);

  //useEffect(() => {
  // console.log("renderize component");
  //}, []);
  return (
    <>
  <Login />
      <Body />
    </>
  );
}

export default App;
