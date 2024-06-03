import "./Home.css";
import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { login } from "../../app/slices/userSlice";
import { loginCallBack } from "../../services/apiCalls";

export const Home = () => {
  const user = {
    email: "Buster4@gmail.com",
    password: "12345678",
  };

  const superadmin = {
    email: "superadmin1@superadmin.com",
    password: "12345678",
  };

  const dispatch = useDispatch();

  const loginMe = async (role) => {
    console.log(role);
    const answer = await loginCallBack(role);

    if (answer.data.token) {
      const uDecodificado = decodeToken(answer.data.token);
      const passport = {
        token: answer.data.token,
        decodificado: uDecodificado,
      };
      console.log(passport);
      dispatch(login(passport));

      //console.log(passport);
    }
  };
  return (
    <>
      <div className="card">
        <h2>WE CARE APP </h2>
        <button onClick={() => loginMe(user)}>
          Login to your User Profile{" "}
        </button>
        <br />
        <button onClick={() => loginMe(superadmin)}> SuperAdmin Login </button>
      </div>
    </>
  );
};
