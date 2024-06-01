import { CButton } from "../../components/CButton/CButton";
import { CInput } from "../../components/CInput/CInput";
import "./Login.css";
import { useState } from "react";
import { loginCallBack } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { login, getUserData } from "../../app/slices/userSlice.js";
import { decodeToken } from "react-jwt";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  //connection with redux only to read data
  const rdxUserData = useSelector(getUserData);
  //connection with redux to write data
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");

  const inputHandler = (e) => {
    //console.log(e.target.value);
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
    try {
      //this function is going to  trigger the login
      const answer = await loginCallBack(credentials);
      //console.log(answer);
      if (answer.data.token) {
        const uDecodificado = decodeToken(answer.data.token);

        const passport = {
          token: answer.data.token,
          decodificado: uDecodificado,
        };

        dispatch(login({ credentials: passport }));
        //console.log(passport, uDecodificado, answer.data);

        setMsg(`${uDecodificado.firstName}, Welcome back .`);

        setTimeout(() => {
          navigate("/admin");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setLoginError("server is down");
      } else {
        setLoginError(error.response.data.error);
      }
    }
  };

  return (
    <div className="loginDesign">
      <CInput
        type={"email"}
        name={"email"}
        className={"basic"}
        value={credentials.email || ""}
        onChange={inputHandler}
      />
      <CInput
        type={"password"}
        name={"password"}
        className={"basic"}
        value={credentials.password || ""}
        onChange={inputHandler}
      />
      <CButton title={"login me"} clickFunction={loginMe} />
      {msg !== "" && <div>{msg}</div>}
      {loginError !== "" ? <div>{loginError}</div> : null}
    </div>
  );
};
