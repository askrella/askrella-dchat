import create from "zustand";

/**
 * Documentation: https://github.com/pmndrs/zustand
 */
const useStore: any = create((set: Function) => ({
	username: null,
	setUsername: (username: string) => set({ username }),

	room: null,
	setRoom: (room: string) => set({ room }),

	clearStore: () =>
		set({
			username: null,
			room: null
		})
}));

export { useStore };
