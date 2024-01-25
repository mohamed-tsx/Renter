import axios from "axios";

const API_URL = "http://localhost:4321/property/";

const addProperty = async (propertyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Make the API call to add the property
    const response = await axios.post(
      API_URL + "addproperty",
      propertyData,
      config
    );

    // Extract property data without 'owner'
    const { owner, ...propertyWithoutOwner } = response.data.data;

    // Update the 'ownedProperties' in the user stored in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    user.ownedProperties.push(propertyWithoutOwner);

    // Save the updated user back to localStorage
    localStorage.setItem("user", JSON.stringify(user));

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding property:", error);
    throw error; // Rethrow the error for handling in the calling code
  }
};

const propertyService = {
  addProperty,
};

export default propertyService;
