"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

const Form = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const checkEmailReg = (email: string) => {
    const validateEmailReg = EMAIL_REGEX.test(email);
    if (!validateEmailReg) return alert("이메일을 확인해라");
  };
  const checkPasswordReg = (password: string) => {
    const validatePasswordReg = PASSWORD_REGEX.test(password);
    if (!validatePasswordReg) return alert("비밀번호를 확인해라");
  };

  const validateLoginFormhandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkEmailReg(email);
    checkPasswordReg(password);

    router.push("home");
  };

  return (
    <>
      <form action="POST" onSubmit={(e) => validateLoginFormhandle(e)}>
        <div>
          <label htmlFor="email">이메일 :</label>
          <input onChange={(e) => setEmail(e.target.value)} className="ml-2 px-2 py-1 border border-black rounded-lg" type="text" id="email" value={email} />
          <label htmlFor="password">비밀번호 :</label>
          <input onChange={(e) => setPassword(e.target.value)} className="ml-2 px-2 py-1 border border-black rounded-lg" type="password" id="password" value={password} />
        </div>
        <button>로그인</button>
      </form>
    </>
  );
};

export default Form;
