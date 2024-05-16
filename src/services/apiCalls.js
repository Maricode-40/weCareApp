import axios from "axios";

const MAPI_URL = "http://localhost:3000/api/";
//const MAPI_URL=  "#";

export const loginCallBack = async (credentials) => {
  //console.log(credentials, "soy credencials en loginCall");

  const res = await axios.post(`${MAPI_URL}/auth/login`, credentials);
  //console.log(res);
  return res;
};
