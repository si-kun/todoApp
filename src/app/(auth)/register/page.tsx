"use client"

import { register } from "@/actions/auth/register";
import AuthForm from "@/components/auth/authForm/AuthForm";
import {
  AUTH_BUTTON_TEXT,
  AUTH_LINKS,
  AUTH_TITLES,
  REGISTER_FIELDS,
} from "@/constants/auth";
import { RegisterFormData, registerSchema } from "@/types/auth/schemas";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterPage = () => {

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await register(data);
      if(result.success) {
        console.log("登録成功", result.message)
        router.replace("/")
      } else {
        console.error("登録失敗", result.message)
      }
    } catch(error) {
      console.error("予期しないエラー",error)
    }
  }

  return (
    <AuthForm
      inputField={REGISTER_FIELDS}
      title={AUTH_TITLES.register}
      link={AUTH_LINKS.register}
      buttonText={AUTH_BUTTON_TEXT.register}
      schema={registerSchema}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterPage;
