import { create } from "zustand";

export const userInfoStore = create((set) => ({
  userInfo: {},
  setUserInfo: (info) => set({ userInfo: info }),
}));
