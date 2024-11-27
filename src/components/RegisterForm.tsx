import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authSlice";
import { AuthFormProps } from "../types/Auth";
import { validateEmail, validatePassword } from "../utils/validations";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

const RegisterForm: FC<AuthFormProps> = ({ setIsRegister }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleRegister = () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
      );
      return;
    }

    try {
      dispatch(register({ email, password }));
    } catch (error) {
      toast.error((error as Error).message, { autoClose: 500 });
    }
  };

  return (
    <div className="shadow-lg font-courierPrime border-gray-300 rounded-md p-4 flex flex-col gap-4 items-center justify-center">
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-sm p-2 w-72 outline-none focus:outline-supremeRed outline-offset-0"
        type="text"
        value={email}
        placeholder="Email"
      />
      <div className="relative">
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-sm p-2 w-72 outline-none focus:outline-supremeRed outline-offset-0"
          type={passwordVisible ? "text" : "password"}
          value={password}
          placeholder="Password"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute right-3 top-3"
        >
          {passwordVisible ? (
            <EyeIcon className="h-5 w-5 text-supremeRed" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <button
        onClick={handleRegister}
        className="bg-supremeRed  text-white font-semibold hover:bg-red-600 transition-colors duration-300 rounded-md p-2 w-72"
      >
        Register
      </button>
      <button
        onClick={() => {
          setIsRegister(false);
        }}
        className="  text-xs
        transition-colors  duration-300 rounded-md p-2 w-72"
      >
        Login Instead
      </button>
    </div>
  );
};

export default RegisterForm;
