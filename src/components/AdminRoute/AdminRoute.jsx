import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { amIAdmin } from "../../app/slices/userSlice";
import { getUserData } from "../../app/slices/userSlice";

export const AdminRoute = ({ Component }) => {
  /**
   * privateRoute & restricted path- that receives a component by props (a new view).
   * If you are admin, it returns the received component, otherwise it sends you back to  home.
   * don't try to load the component if you don't have access.
   */

  const isAdmin = useSelector(amIAdmin);
  console.log(useSelector(getUserData));
  return isAdmin ? <Component /> : <Navigate to="/" />;
};
