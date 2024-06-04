import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, logout } from "../../app/slices/userSlice";
import { useEffect } from "react";
import { CNavigator } from "../../components/CNavigator/CNavigator";
import { useNavigate } from "react-router-dom";
import { CLink } from "../../components/CLink/CLink";

export const Header = () => {
  //Instancio Redux en modo lectura
  const rdxUserData = useSelector(getUserData);

  //Instancio Redux en modo escritura
  const dispatch = useDispatch();

  //Instancio useNavigate para poder cambiar de vista directamente
  const navigate = useNavigate();

  useEffect(() => {
    console.log(rdxUserData, "soy redux el slice de user");
  }, [rdxUserData]);

  return (
    <div className="headerDesign">
      {rdxUserData.credentials?.token ? (
        <>
          {rdxUserData.credentials.token.userRole === "superadmin" && (
            <CNavigator title={"SuperAdmin"} path="/admin" />
          )}
          <CNavigator title={rdxUserData.credentials.name} path="/profile" />
          <CLink path="/superappointments" title="Appointments" />

          <div onClick={() => dispatch(logout({ credentials: "" }))}>
            <CNavigator title={"logout"} path="/" />
          </div>
        </>
      ) : (
        <>
          <CLink path="/register" title="Register" />
          <CNavigator title={"login"} path="/login" />
          <div className="header" onClick={() => navigate("/login")}>
            <CNavigator />
            <CLink path="/" title="Home" />
          </div>
        </>
      )}
    </div>
  );
};
