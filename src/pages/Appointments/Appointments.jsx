import "./Appointments.css";
import { bringAppointments, appointmentCreate } from "../../services/apiCalls";
import { getUserData } from "../../app/slices/userSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const Appointments = () => {
  const [appsDate, setAppsDate] = useState({
    dayDate: "",
    price: "",
    description: "",
    webcreatorId: "",
    clientId: "",
  });

  const [appointments, setAppointment] = useState(Date());
  const [selected, setSelected] = useState();
  const [appointmentId, setAppointmentId] = useState([""]);
  //we store them and then we retrieve/recall the appointments.
  const [citas, setCitas] = useState([1]);

  // we get the data from Redux
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const userId = userReduxData.decodificado.userId;
  const userRole = userReduxData.decodificado.Role;
  const [totalAppointments, setTotalAppointments] = useState([]);

  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  //const userType = userReduxData.decodificado.Role;

  const inputHandlerAppointment = (e) => {
    console.log(typeof e.target.value, e.target.name);
    setAppsDate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dateCreation = async () => {
    try {
      const res = await appointmentCreate(appsDate, token);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //console.log("holassss ");
    if (citas.length === 0) {
      const fetchAppointments = async () => {
        try {
          //console.log(token);
          const fetched = await bringAppointments(userId, token);
          //console.log(fetched.dates);
          setCitas(fetched.dates);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAppointments();
      console.log(citas);
    }
  }, [appointmentId]);

  return (
    <>
      <div className="first">
        Actual date: {dayjs(appointments).format("dddd, MMMM D, YYYY h:mm A")}
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(e) =>
          setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
        }
      />
      <div className="second">
        {selected && <div> Selected date: {selected}</div>}{" "}
      </div>

      <CustomInput
        typeProp="date"
        nameProp="dayDate"
        placeholderProp="AppointmentDate"
        handlerProp={(e) => inputHandlerAppointment(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <CustomInput
        typeProp="number"
        nameProp="price"
        placeholderProp="price"
        handlerProp={(e) => inputHandlerAppointment(e)}
        onBlur={(e) => onBlurHandler(e)}
      />

      <CustomInput
        typeProp="text"
        nameProp="description"
        placeholderProp="description"
        handlerProp={(e) => inputHandlerAppointment(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <CustomInput
        typeProp="number"
        nameProp="webcreatorId"
        placeholderProp="webcreatorId"
        handlerProp={(e) => inputHandlerAppointment(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <CustomInput
        typeProp="number"
        nameProp="clientId"
        placeholderProp="clientId"
        handlerProp={(e) => inputHandlerAppointment(e)}
        onBlur={(e) => onBlurHandler(e)}
      />

      <h4>Create Appointments</h4>
      <button onClick={() => dateCreation(appsDate)}>Create</button>

      <div className="appointsDesign">
        {citas.map((cita) => (
          <div key={cita.id}>
            <h1 className="appsNumber"> UserID: {cita.id} </h1>

            <h2 className="listApps">Appointment Date: {cita.dayDate}</h2>
            <h3 className="userSearch"> Price - {cita.price}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
