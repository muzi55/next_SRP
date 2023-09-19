"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const EMAIL_REGEX = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const PASSWORD_REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/);
const WAIT_TIME = setTimeout(() => {}, 500);

const Form = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [validateEmail, setValidateEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [validatePassword, setValidatePassword] = useState<boolean>(false);

  const resetState = () => {
    setEmail("");
    setPassword("");
  };
  const checkEmailReg = (email: string) => {
    const validateEmailReg = EMAIL_REGEX.test(email);
    if (!validateEmailReg) {
      setValidateEmail(false);
      WAIT_TIME;
      return alert("이메일을 확인해라");
    }
    setValidateEmail((prev) => (prev = true));
    WAIT_TIME;
  };

  const checkPasswordReg = (password: string) => {
    const validatePasswordReg = PASSWORD_REGEX.test(password);
    if (!validatePasswordReg) {
      setValidatePassword(false);
      WAIT_TIME;
      return alert("비밀번호를 확인해라");
    }
    setValidatePassword((prev) => (prev = true));
    WAIT_TIME;
  };

  const checkValidateAndRouterHome = () => {
    const checkValidate = validateEmail && validatePassword;
    if (checkValidate) {
      resetState();
      router.push("home");
      return;
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
      <form action="POST" onSubmit={(e) => validateLoginFormhandle(e)}>
        <div>
          <div>
            {" "}
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
