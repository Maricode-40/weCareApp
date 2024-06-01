import "./CNavigator.css";
import { useNavigate } from "react-router-dom";

export const CNavigator = ({title, path}) => {

    const navigate = useNavigate()



    return (
        <div className= "navigateDesign"onClick={()=>navigate(path)}>{title} 

        </div>
    )
}