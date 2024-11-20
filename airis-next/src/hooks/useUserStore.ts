import {create} from 'zustand';

interface User {
  id: string;
  created_at: string;
  email: string;
}

interface SavedItem {
  id: string;
  name: string;
}

interface UserStore {
  user: User|null;
  savedItems: SavedItem[];
  addSavedItem: (item: SavedItem) => void;
  removeSavedItem: (itemId: string) => void;
  updateUser: (newUser: User) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  savedItems: [],
  addSavedItem: (item) =>
    set((state) => ({ savedItems: [...state.savedItems, item] })),
  removeSavedItem: (itemId) =>
    set((state) => ({
      savedItems: state.savedItems.filter((item) => item.id !== itemId),
    })),
  updateUser: (newUser) => set(() => ({ user: newUser })),
  setUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
