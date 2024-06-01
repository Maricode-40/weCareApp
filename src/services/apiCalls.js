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

export const bringAppointmentsById = async (id,token) => {
  // puedo preparar la información para enviar al servidor
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(
    `${MAPI_URL}appointments/${id}`,
    config
  );

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