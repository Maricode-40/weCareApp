import { Navigate, Routes, Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";
import { AdministratorProfile } from "../../pages/AdministratorProfile/AdministratorProfile";


export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={<AdminRoute Component={AdministratorProfile} />}
      />
    </Routes>
  );
};
