import axios from "axios";
const API_URL = "http://localhost:4321/user/";

// Register user
const register = async (user) => {
  const response = await axios.post(`${API_URL}?role=${user.role}`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
};

export default authService;
