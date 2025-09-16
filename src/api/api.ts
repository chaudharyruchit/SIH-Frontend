// src/api/api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'; // Change to your backend URL

// Generic Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// -------------------
// REGISTER USER
// -------------------
export const registerUser = async (userData: {
  role: 'student' | 'alumni' | 'admin';
  fullName?: string;
  email: string;
  password: string;
  college?: string;
  rollNo?: string;
}) => {
  try {
    // Backend expects different fields based on role
    const payload: any = {
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    if (userData.role === 'admin') {
      payload.college = userData.college; // admin only needs college
    } else {
      // student or alumni
      payload.fullName = userData.fullName;
      payload.college = userData.college;
      payload.rollNo = userData.rollNo;
    }

    const response = await api.post('/register/', payload);
    return response.data; // typically contains success message or token
  } catch (error: any) {
    throw error.response?.data || { detail: 'Server error' };
  }
};

// -------------------
// LOGIN USER
// -------------------
export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post('/login/', loginData);
    return response.data; // typically contains auth token and user info
  } catch (error: any) {
    throw error.response?.data || { detail: 'Invalid credentials' };
  }
};

// -------------------
// OPTIONAL: GET USER INFO
// -------------------
export const getUserProfile = async (token: string) => {
  try {
    const response = await api.get('/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { detail: 'Cannot fetch profile' };
  }
};
