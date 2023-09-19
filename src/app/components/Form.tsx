"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/);
let validateEmail: boolean = false;
let validatePassword: boolean = false;

const Form = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const resetState = () => {
    setEmail("");
    setPassword("");
  };
  const checkEmailReg = (email: string) => {
    const validateEmailReg = EMAIL_REGEX.test(email);
    if (!validateEmailReg) {
      validateEmail = false;
      return alert("이메일을 확인해라");
    }
    validateEmail = true;
  };

  const checkPasswordReg = (password: string) => {
    const validatePasswordReg = PASSWORD_REGEX.test(password);
    if (!validatePasswordReg) {
      validatePassword = false;
      return alert("비밀번호를 확인해라");
    }
    validatePassword = true;
  };

  const checkValidateAndRouterHome = () => {
    const checkValidate = validateEmail && validatePassword;
    if (checkValidate) {
      resetState();
      router.push("home");
    }
  };

  const validateLoginFormhandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkEmailReg(email);
    checkPasswordReg(password);
    checkValidateAndRouterHome();
  };

  return (
    <>
      <form action="POST" onSubmit={validateLoginFormhandle}>
        <div>
          <div>
            <label htmlFor="email">이메일 :</label>
            <input onChange={(e) => setEmail(e.target.value)} className="ml-2 px-2 py-1 border border-black rounded-lg" type="text" id="email" value={email} />
          </div>
          <div>
            <label htmlFor="password">비밀번호 :</label>
            <input onChange={(e) => setPassword(e.target.value)} className="ml-2 px-2 py-1 border border-black rounded-lg" type="password" id="password" value={password} />
          </div>
        </div>
        <button>로그인</button>
      </form>
    </>
  );
};

export default Form;
