import axios from "axios";
import EditProfileScreen from "../screens/Setting Screen/PersonDetail";
import { addUserData, getUserID } from "./httpRequest/ApiUser";

const API_Key = "AIzaSyANRAYKTAvMibAp1_AEnAmUDv-q-rCV9Ok";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_Key}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  await getUserID(token);

  return token;
}

export function CreateUser(email, password) {
  const UserData = {
    emailUser: email,
    passUser: password,
  };
  addUserData(UserData);
  return authenticate("signUp", email, password);
}
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
