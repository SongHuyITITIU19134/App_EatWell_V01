import axios from "axios";
import EditProfileScreen from "../../screens/Setting Screen/PersonDetail";

const BACKEND_URL =
  "https://meal-plan-app-3331d-default-rtdb.asia-southeast1.firebasedatabase.app/usersData.json";

const API_Key = "AIzaSyANRAYKTAvMibAp1_AEnAmUDv-q-rCV9Ok";

export const getUserID = async (idToken) => {
  try {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_Key}`;
    const response = await axios.post(url, {
      idToken: idToken,
    });
    if (
      response.data &&
      response.data.users &&
      response.data.users.length > 0
    ) {
      const user = response.data.users[0];
      console.log("User ID:", user.localId);
      console.log("Email:", user.email);
      fetchUserDataFromBackend(user.email)
        .then((dataUser) => {
          if (dataUser) {
            console.log("email:", dataUser.emailUser);
            <EditProfileScreen data={dataUser} />;
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
      return user;
    } else {
      console.log("No user data found in the response");
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUserData = async (dataUser) => {
  try {
    const rp = await axios.post(BACKEND_URL, dataUser);
    console.log("Success", rp.data);
  } catch (error) {
    console.log(error);
  }
};

// export const fetchUserDataFromBackend = async () => {
//   try {
//     const rp = await axios.get(BACKEND_URL);
//     const UsersData = [];

//     for (const key in rp.data) {
//       const UsersDataObject = {
//         id: key,
//         emailUser: rp.data[key].email,
//         passUser: rp.data[key].pass,
//         firstNameUser: rp.data[key].firstName,
//         lastNameUser: rp.data[key].lastName,
//         nickName: rp.data[key].nickName,
//         ageUser: rp.data[key].age,
//         heightUser: rp.data[key].height,
//         weightUser: rp.data[key].weight,
//         addressUser: rp.data[key].address,
//         avatarUser: rp.data[key].imageLink,
//       };
//       UsersData.push(UsersDataObject);
//     }
//     console.log(UsersData);
//     return UsersData;
//   } catch (error) {
//     console.error("Error fetching users data", error);
//   }
// };
export const fetchUserDataFromBackend = async (email) => {
  try {
    const rp = await axios.get(BACKEND_URL);
    const userData = Object.values(rp.data).find(
      (user) => user.emailUser === email
    );

    if (userData) {
      const userObject = {
        id: userData.id,
        emailUser: userData.emailUser,
        passUser: userData.passUser,
        firstNameUser: userData.firstName,
        lastNameUser: userData.lastName,
        nickName: userData.nickName,
        ageUser: userData.age,
        heightUser: userData.height,
        weightUser: userData.weight,
        addressUser: userData.address,
        avatarUser: userData.imageLink,
      };

      console.log("userObject", userObject);
      return userObject;
    } else {
      console.log("User not found for the provided email");
      return null;
    }
  } catch (error) {
    console.error("Error fetching users data", error);
    throw error;
  }
};
