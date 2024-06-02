import { bringProfile } from "../../services/apiCalls";
import { useState, useEffect } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { inputValidator } from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedAmount, getUserData } from "../../app/slices/userSlice";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const veces = useSelector(getLoggedAmount);
  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    //console.log(token);
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  const updateProfileHandler = () => {
    console.log(profileData);
    if (
      !inputValidator(profileData.firstName, "firstName") ||
      !inputValidator(profileData.email, "email")
    ) {
      console.log("name or email not valid");
      setErrorMessage("can not update profile data");
      return;
    }
    try {
      updateProfile(profileData, token);
    } catch (err) {
      console.log(err);
    }
  };

  const resetLoggedCount = () => {
    console.log(veces);
  };

  return (
    <>
      <CustomInput
        typeProp="text"
        nameProp="firstName"
        placeholderProp="firstName"
        value={profileData.firstName}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="email"
        nameProp="email"
        placeholderProp="email"
        value={profileData.email}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="text"
        nameProp="role"
        placeholderProp="role"
        value={profileData.role}
        isDisabled=""
        handlerProp={inputHandler}
      />
      {isEditing ? (
        <div className="button-container">
          <button onClick={() => updateProfileHandler()}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <button onClick={() => resetLoggedCount()}>Modificar</button>
          <BootstrapModal
            profileData={profileData}
            inputHandler={inputHandler}
            token={token}
          />
        </>
      )}
    </>
  );
};
