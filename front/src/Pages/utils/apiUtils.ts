import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const fetchUserType = async () => {
  try {
    const token = localStorage.getItem("@VolleyHub:token");
    const response = await axios.get(`${apiUrl}/user-type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userType = response.data.user_type;
    const isAuthenticated = userType !== null && userType !== undefined;
    return { userType, isAuthenticated };
  } catch (error) {
    return { userType: "", isAuthenticated: false };
  }
};


export default fetchUserType;
