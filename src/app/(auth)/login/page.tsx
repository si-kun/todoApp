"use client"

import { login } from "@/actions/auth/login";
import AuthForm from "@/components/auth/authForm/AuthForm";
import { AUTH_LINKS, LOGIN_FIELDS } from "@/constants/auth";
import { LoginFormData, loginSchema } from "@/types/auth/schemas";
import { useRouter } from "next/navigation";
import React from "react";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);

      if (result.success) {
        console.log("ログイン成功", result.message);
        router.replace("/");
      } else {
        console.error("ログイン失敗", result.message);
      }
    } catch (error) {
      console.error("予期しないエラー", error);
    }
  };

  return (
    <AuthForm
      inputField={LOGIN_FIELDS}
      title={"Login"}
      link={AUTH_LINKS.login}
      buttonText={"Login"}
      schema={loginSchema}
      onSubmit={onSubmit}
    />
  );
};

export default LoginPage;
