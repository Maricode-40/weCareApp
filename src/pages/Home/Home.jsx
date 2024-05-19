import "./Home.css";

import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { login } from "../../app/slices/userSlice";
import { loginCallBack } from "../../services/apiCalls";

export const Home = () => {
  const user = {
    email: "Gennaro94@yahoo.com",
    password: "12345678",
  };

  const superadmin = {
    email: "superadmin3@superadmin.com",
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
  

      <h2>WE CARE APP </h2>


      <div className="card">
        <button onClick={() => loginMe(user)}>Login as User </button>
        <br />
        <button onClick={() => loginMe(superadmin)}>Login as SuperAdmin</button>

  
      </div>
    </>
  );
};
