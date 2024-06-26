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
  const [selected, setSelected] = useState(null);
  const [appointmentId, setAppointmentId] = useState([""]);
  //we store them and then we retrieve/recall the appointments.
  const [citas, setCitas] = useState([]);

  // we get the data from Redux
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  const inputHandlerAppointment = (e) => {
    //console.log(typeof e.target.value, e.target.name);
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
      console.log("AY WEEEYYYYY");
      const fetchAppointments = async () => {
        try {
          console.log(token);
          const fetched = await bringAppointments(userReduxData, token);
          console.log(fetched.dates);
          setCitas(fetched.dates);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAppointments();
      //console.log(citas);
    }
  }, [appointmentId]);

  return (
    <>
      <h3> Enter Client ID to create appointment </h3>
      <CustomInput
        typeProp="number"
        nameProp="clientId"
        placeholderProp="clientId"
        handlerProp={(e) => inputHandlerAppointment(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <div className="first">
        Actual date: {dayjs(appointments).format("dddd, MMMM D, YYYY h:mm A")}
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(e) => {
          const formattedDate = dayjs(e).toISOString();
          setSelected(formattedDate);
        }}
      />
      <div className="second">
        {selected && <div> Selected date: {selected}</div>}{" "}
      </div>

      <CustomInput
        typeProp="date"
        nameProp="dayDate"
        placeholderProp="dayDate"
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
        nameProp="price"
        placeholderProp="price"
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

      <h4>Create Appointments</h4>
      <button onClick={() => dateCreation(appsDate)}>Create</button>

      <div className="appointsDesign">
        {citas?.map((cita) => (
          <div key={cita.id}>
            <h1 className="appsNumber"> UserID: {cita.id} </h1>
            <h2 className="listApps"> Appointment Date: {cita.dayDate}</h2>
            <h3 className="userSearch"> Description - {cita.description}</h3>
            <h3 className="userSearch"> Price - {cita.price}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
