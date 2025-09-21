import { AuthFieldLink, AuthInputField } from "@/types/auth";

export const REGISTER_FIELDS = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    }
  ] as AuthInputField[];

  export const LOGIN_FIELDS = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    }
  ] as AuthInputField[];

  export const AUTH_TITLES  = {
    register: "Create an account",
    login: "Welcome back",
  } as const;

  export const AUTH_LINKS = {
    register: { href: "/login", text: "Already have an account? Log in" } as AuthFieldLink,
    login: { href: "/signup", text: "Don't have an account? Sign up" } as AuthFieldLink,
  } as const;

  export const AUTH_BUTTON_TEXT = {
    register: "Create an account",
    login: "Log in",
  } as const;