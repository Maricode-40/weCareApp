import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

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
    console.log(userData);
  };
  const handlerSubmit = (e) => {
    const registerMe = async () => {
      const res = await registerNewUserCall(userData);
      console.log(res);
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };
    registerNewUserCall();
  };

  return (
    <div className="container">
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="email@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
      </Form>
      );
    </div>
  );
};
