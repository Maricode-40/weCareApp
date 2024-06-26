import { Navigate, Routes, Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";
import { AdministratorProfile } from "../../pages/AdministratorProfile/AdministratorProfile";
import { Appointments } from "../Appointments/Appointments";
import { Profile } from "../Profile/Profile";
import { AppointmentUserProfile } from "../Users/AppointmentUserProfile";
import Webcreators from "../Webcreators/webcreators";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/superappointments" element={<Appointments />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/client" element={<AppointmentUserProfile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/webcreators" element={<Webcreators />} />
      <Route
        path="/admin"
        element={<AdminRoute Component={AdministratorProfile} />}
      />
    </Routes>
  );
};
