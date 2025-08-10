import { create } from 'zustand';
import axiosInstance from '../axiosInstance/axiosInstance';

const useUserAuth = create((set, get) => ({
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || '{}'),  // hydrate user here
  success: null,

  loginUSer: async (email, password) => {
    try {
      const res = await axiosInstance.post('/users/login', { email, password }); 
      
      if (!res.data.success) {
        set({ success: false });
        return;
      }

      set({
        token: res.data.token,
        user: res.data.userExist,
        success: true,
      });
      
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.userExist));
    } catch (error) {
      set({ success: false });
      console.error(error);
    }
  },

  regiserUser: async (name, email, password) => {
    try {
      const res = await axiosInstance.post('/users/register', { name, email, password });

      if (!res.data.success) {
        set({ success: false });
        return;
      }

      set({
        success: true,
      });
    } catch (error) {
        set({ success: false });
      console.error(error);
    }
  },

  setSuccess: () => set({ success: null }),
}));

export default useUserAuth;
