import axios from 'axios';

const API_URL = 'http://localhost:5005/api/bookings';

export const getBookings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBooking = async (booking) => {
  const response = await axios.post(API_URL, booking);
  return response.data;
};

export const updateBooking = async (id, booking) => {
  const response = await axios.put(`${API_URL}/${id}`, booking);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
