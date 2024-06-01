import { useSelector } from "react-redux";
import { getUserData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { bringAllUsersCall, deleteUserById } from "../../services/apiCalls";
import "./AdministratorProfile.css";

export const AdministratorProfile = () => {
  const [users, setUsers] = useState([]);
  const [areYouDeletingMe, setAreYouDeletingMe] = useState([null]);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    //console.log("ayWeEeyyyyY");
    const fetchUsers = async () => {
      const res = await bringAllUsersCall(token);
      //console.log(res, "hola");
      setUsers(res.data.users);
      //console.log(typeof users);
    };
    if (users.length === 0) {
      fetchUsers();
    }
  }, [users]);

  const deleteUser = async (id) => {
    //console.log(users);
    const res = await deleteUserById(id, token);
    console.log(res);
  };

  // initiates the deletion of the user and shows or hides the confirmation button,
  //delete confirmation button. that checks if the useState that keeps track of which user's record is being deleted is yours, in which case it is displayed.
  const deleteUserStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };

  return (
    <>
      <p>Total number of users: {Array.isArray(users) ? users.length : 0}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Delete 😱</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((users) => (
              <tr key={users.id}>
                <td> {users.id}</td>
                <td>{users.firstName}</td>
                <td>{users.lastName}</td>
                <td>{users.email}</td>
                <td>
                  <div
                    className="deleteButton"
                    onClick={() => deleteUserStepOne(users.id)}
                  ></div>
                  <div
                    className={
                      areYouDeletingMe === users.id
                        ? "deleteButton confirm-delete "
                        : "deleteButton confirm-delete display-none"
                    }
                    onClick={(e) => deleteUser(users.id)}
                  ></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
