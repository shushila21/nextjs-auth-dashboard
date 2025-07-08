import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserData, usersData } from '@/constants/users';

interface UserStore {
  users: IUserData[];
  filteredUsers: IUserData[];
  addUser: (user: IUserData) => void;
  updateUser: (key: string, updatedUser: Partial<IUserData>) => void;
  deleteUser: (key: string) => void;
  setFilteredUsers: (users: IUserData[]) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      users: usersData,
      filteredUsers: usersData,
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (key, updatedUser) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.key === key ? { ...user, ...updatedUser } : user,
          ),
        })),
      deleteUser: (key) =>
        set((state) => ({
          users: state.users.filter((user) => user.key !== key),
        })),
      setFilteredUsers: (filteredUsers) => set({ filteredUsers }),
    }),
    {
      name: 'user-storage', // localStorage key
    },
  ),
);
