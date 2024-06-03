import { useSelector } from "react-redux"
import { getAllWebcreators } from "../../services/apiCalls";
import { getUserData } from "../../app/slices/userSlice"
import { useState, useEffect } from "react";

export const Webcreators = () => {
  const [webcreators, setWebcreators] = useState([]);
  const myPassport = useSelector(getUserData)

  useEffect(() => {
    const fetchWebcreator = async () => {
      const response = await getAllWebcreators();
      setWebcreators(response.data);
    };
    fetchWebcreator();
  }, []);

  const navigate = (id) => {
    console.log(id);
  };
  console.log(webcreators);
  return (
    <div className="container" id="tableContainer">
      {webcreators.map((webcreators) => {
        return (
          <div key={webcreators.id} className="row tableRow">
            <p>{webcreators.user.firstName}</p>
            <p>{webcreators.user.phone}</p>
            <p>{webcreators.style}</p>
            <p>{webcreators.user.email}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`${webcreators.id}`);
              }}
            >
              View more
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Webcreators;
