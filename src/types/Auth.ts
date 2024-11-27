export interface User {
  email: string;
  password: string;
}

export interface AuthFormProps {
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
