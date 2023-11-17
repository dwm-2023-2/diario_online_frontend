import { create } from "zustand";

export const diarioStore = create((set) => ({
  diarioId: null,
  setDiarioId: (id) => set({ diarioId: id }),
  resetDiarioId: () => set({ diarioId: null}),
}));
