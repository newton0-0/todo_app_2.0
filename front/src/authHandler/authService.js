// authService.js
import jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'jwtToken';

// Save the JWT token to localStorage
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get the JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove the JWT token from localStorage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Decode the JWT token to get user information
export const getUserFromToken = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

// Perform user login and store the JWT token
export const login = async (username, password) => {
  // Make a POST request to your backend with username and password
  // Obtain the JWT token from the response and save it
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    saveToken(data.accessToken);
    return data;
  } else {
    const error = await response.json();
    throw error;
  }
};

// Perform user signup
export const signup = async (username, password) => {
  // Make a POST request to your backend with username and password
  // Handle the signup logic on the backend
  // Return an appropriate response or throw an error if signup fails
  const response = await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    // Optionally, you can handle the successful signup response here
    return response.json();
  } else {
    const error = await response.json();
    throw error;
  }
};

// Perform user logout by removing the JWT token
export const logout = () => {
  removeToken();
};
