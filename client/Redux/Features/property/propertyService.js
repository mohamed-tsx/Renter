import axios from "axios";

const API_URL = "http://localhost:4321/property/";

const addProperty = async (propertyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "addproperty",
    propertyData,
    config
  );

  console.log(response.data);
  return response.data;
};

const propertyService = {
  addProperty,
};

export default propertyService;
