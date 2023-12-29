// const API_BASE_URL = "http://localhost:4000/user";
const API_BASE_URL =
  "http://54.144.87.229:5000/user";

export const fetchData = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

  // if (!response.ok) {
  //   throw new Error("Network response was not ok");
  // }

  return response.json();
};

export const registerUser = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetchData("signup", options);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const login = async (data) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  };
  try {
    const response = await fetchData("signin", options);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
