// src/api/api.ts
import axios from 'axios';
console.log("Backend URL (from env):", import.meta.env.VITE_API_URL);
// Load API base URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


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
    const payload: any = {
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    if (userData.role === 'admin') {
      payload.college = userData.college;
    } else {
      payload.fullName = userData.fullName;
      payload.college = userData.college;
      payload.rollNo = userData.rollNo;
    }

    const response = await api.post('/register/', payload);
    return response.data;
  } catch (error: any) {
    console.error('Registration Error:', error);
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
    return response.data;
  } catch (error: any) {
    console.error('Login Error:', error);
    throw error.response?.data || { detail: 'Invalid credentials' };
  }
};

// -------------------
// GET USER PROFILE
// -------------------
export const getUserProfile = async (token: string) => {
  try {
    const response = await api.get('/profile/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('Profile Fetch Error:', error);
    throw error.response?.data || { detail: 'Cannot fetch profile' };
  }
};
