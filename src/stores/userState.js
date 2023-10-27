import { create } from "zustand";

export const userStore = create((set) => ({
  userLogged: false,
  setUserState: () => set((state) => ({ userLogged: !state.userLogged })),
}));
