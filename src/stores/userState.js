import { create } from "zustand";

export const userStore = create((set) => ({
  userLogged: false,
  setUserState: (newUserState) => set({ userLogged: newUserState }),
}));
