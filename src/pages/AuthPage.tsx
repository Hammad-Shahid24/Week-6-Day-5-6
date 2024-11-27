import { FC, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

const AuthPage: FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="w-full">
      <div className="w-9/12 mx-auto">
        <div className="flex justify-center items-center  ">
          {isRegister ? (
            <RegisterForm setIsRegister={setIsRegister} />
          ) : (
            <LoginForm setIsRegister={setIsRegister} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
