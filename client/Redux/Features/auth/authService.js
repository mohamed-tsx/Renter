import axios from "axios";
const API_URL = "http://localhost:4321/user/";

// Register user
const register = async (user) => {
  const response = await axios.post(`${API_URL}?role=${user.role}`, user);
  console.log(response);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

//Logout user
const logout = async (user) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
