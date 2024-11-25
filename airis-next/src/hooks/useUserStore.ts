import {create} from 'zustand';

interface User {
  id: string;
  created_at: string;
  email: string;
}

interface Edge{

}

interface SavedItem {
  id: string;
  name: string;
  prompt : string;
  nodes? : Node[];
  edges? : Edge[];
  terraformCode : string
}

interface UserStore {
  user: User|null;
  savedItems: SavedItem[];
  setSavedItems : (savedItems : SavedItem[])=>void;
  addSavedItem: (item: SavedItem) => void;
  removeSavedItem: (itemId: string) => void;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  savedItems: [],
  setSavedItems : (savedItems) => set(() =>({savedItems})),
  addSavedItem: (item) =>
    set((state) => ({ savedItems: [...state.savedItems, item] })),
  removeSavedItem: (itemId) =>
    set((state) => ({
      savedItems: state.savedItems.filter((item) => item.id !== itemId),
    })),
  setUser: (user) => set(() => ({ user })),
}));

export default useUserStore;
