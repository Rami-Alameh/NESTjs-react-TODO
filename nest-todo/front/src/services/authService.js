const TOKEN_KEY = 'jwtToken';

export const setToken = (newToken) => {
  localStorage.setItem(TOKEN_KEY, newToken);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export const logout = () => {
  // Clear the token from localStorage
  clearToken();
  // Perform any additional cleanup or tasks related to logout, if needed
};

