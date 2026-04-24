const AUTH_KEY = 'medbook_admin_logged_in';

export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = '123456';

export const isLoggedIn = () => localStorage.getItem(AUTH_KEY) === 'true';

export const login = (username, password) => {
  const isValid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;

  if (isValid) {
    localStorage.setItem(AUTH_KEY, 'true');
  }

  return isValid;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
