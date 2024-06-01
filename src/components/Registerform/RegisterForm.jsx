import { useNavigate, Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { CButton } from "../CButton/CButton";
import { registerNewUserCall } from "../../services/apiCalls";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    //console.log(userData);
  };
  const handlerSubmit = (e) => {

    const registerUser= async () => {
      const res = await registerNewUserCall(userData);
     // console.log(res);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };
    registerUser();
  };

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            onChange={handleChange}
            name="firstName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            onChange={handleChange}
            name="password"
          />
        </Form.Group>
        <CButton
          title={"Register Now!"}
          className={"buttonDesign"}
          clickFunction={handlerSubmit}
        />
      </Form>
    </div>
  );
};
