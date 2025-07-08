export interface IUserData {
  key: string;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  role: string;
  isActive: boolean;
  salary: number;
  avatar?: string;
}

export const usersData: IUserData[] = [
  {
    key: '1',
    name: 'John Brown',
    email: 'john.brown@example.com',
    birthDate: '1990-05-15',
    gender: 'male',
    role: 'admin',
    isActive: true,
    salary: 75000,
  },
  {
    key: '2',
    name: 'Jim Green',
    email: 'jim.green@example.com',
    birthDate: '1985-11-22',
    gender: 'male',
    role: 'developer',
    isActive: false,
    salary: 65000,
  },
  {
    key: '3',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    birthDate: '1995-02-10',
    gender: 'female',
    role: 'designer',
    isActive: true,
    salary: 60000,
  },
];
