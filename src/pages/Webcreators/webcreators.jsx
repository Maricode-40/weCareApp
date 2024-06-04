import { useSelector } from "react-redux";
import { getAllWebcreators } from "../../services/apiCalls";
import { getUserData } from "../../app/slices/userSlice";
import { useState, useEffect } from "react";

export const Webcreators = () => {
  const [webcreators, setWebcreators] = useState([]);
  const myPassport = useSelector(getUserData);

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
      {webcreators.map((webdesigner) => {
        return (
          <div key={webdesigner.id} className="row tableRow">
            <p>{webdesigner.userId}</p>
            <p>{webdesigner.area}</p>
            <p>{webdesigner.style}</p>

            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`${webdesigner.id}`);
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
