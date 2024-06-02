import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CustomInput/CustomInput";
import { updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./BootstrapModal.css";

function BootstrapModal({ profileData, inputHandler, token }) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    setTimeout(() => {
      navigate("/profile");
    });

    //console.log("close");
    setShow(false);
  };
  const handleUpdate = async () => {
    try {
      await updateProfile(profileData, token);
      console.log("user updated");
      setTimeout(() => {
        setShow(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Modificar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your data!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInput
            typeProp="text"
            nameProp="firstName"
            placeholderProp="firstName"
            value={profileData.firstName}
            isDisabled=""
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp="lastName"
            value={profileData.lastName}
            isDisabled=""
            handlerProp={inputHandler}
          />

          <CustomInput
            typeProp="email"
            nameProp="email"
            placeholderProp="email"
            value={profileData.email}
            isDisabled=""
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;
