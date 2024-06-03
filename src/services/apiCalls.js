import axios from "axios";

const MAPI_URL = "http://localhost:3000/api/";
//const MAPI_URL=  "http://localhost:3000/";

//Register
export const registerNewUserCall = async (credentials) => {
  //console.log(credentials);
  return await axios.post(`${MAPI_URL}auth/register`, credentials);
};

export const loginCallBack = async (credentials) => {
  //console.log(credentials, "soy credencials en loginCall");

  const res = await axios.post(`${MAPI_URL}/auth/login`, credentials);
  //console.log(res);
  return res;
};

export const bringAllUsersCall = (token) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${MAPI_URL}users`, config);
};

export const deleteUserById = (id, token) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${MAPI_URL}users/${id}`, config);
};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${MAPI_URL}users/profile`, config);
  return res.data;
};

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.put(`${MAPI_URL}users/profile/`, data, config);
  console.log(res, "yo soy updateProfile");
  return res;
};

//as admin //
export const bringAppointments = async (id, token) => {
  // puedo preparar la información para enviar al servidor
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  c;
  const res = await axios.get(`${MAPI_URL}appointments`, config);
  console.log(res);
  return res.data;
};

export const deleteAppointmentById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${MAPI_URL}appointments/${id}`, config);
};
//CREATE APPOINTMENTS AS ADMIN 1st route
export const appointmentCreate = async (appsDate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //console.log(appsDate, "any admin date created?");
  const res = await axios.post(`${MAPI_URL}appointments`, appsDate, config);
  //console.log(config, "Admincall");
  return res;
};
//for user clients creation OK NOW
export const createUserAppointments = async (userApps, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(userApps, "any date created?");
  const res = await axios.post(`${MAPI_URL}/appointments`, userApps, config);
  //console.log(config, "AY WEYYY");

  return res;
};
//update appointments
export const editAppointmentCall = async (userApps, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(userApps, "any date created?");
  const res = await axios.put(
    `${MAPI_URL}appointments/${id}`,
    userApps,
    config
  );
  return res;
};

//bring client appointments
export const bringUsersAppointments = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //console.log(id, token);
  const res = await axios.get(`${MAPI_URL}users/${id}/appointments`, config);
  console.log(res);
  return res.data;
};

//delete appointment for users clients
export const deleteAppointments = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(`${MAPI_URL}appointments/${id}`, config);
  return res;
};

export const bringAllAppointments = async (token, page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${MAPI_URL}/appointments/?page=${page}`, config);
  return res.data;
};

//get all webcreators for everyone
export const getAllWebcreators = async () => {
  const res = await axios.get(`${MAPI_URL}webcreators/`);
  return res;
};
