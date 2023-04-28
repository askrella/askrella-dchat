import create from "zustand";

/**
 * Documentation: https://github.com/pmndrs/zustand
 */
const useStore: any = create((set: Function) => ({
	username: null,
	setUsername: (username: string) => set({ username })
}));

export { useStore };
