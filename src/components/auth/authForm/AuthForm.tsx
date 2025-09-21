// "use client"

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { AuthFieldLink, AuthInputField } from "@/types/auth";
import Link from "next/link";
import { Button } from "../../ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AuthFormProps {
  inputField: AuthInputField[];
  title: string;
  link: AuthFieldLink;
  buttonText: string;
  schema: z.ZodSchema<any>;
  onSubmit: (data: any) => void;
}

const AuthForm = ({
  inputField,
  title,
  link,
  buttonText,
  schema,
  onSubmit,
}: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({
    resolver: zodResolver(schema as any) as any,
    mode: "onTouched",
  });

  const disabled = isSubmitting || !isValid || !isDirty;

  const getButtonText = () => {
    if (isSubmitting) return "処理中...";
    if (!isDirty) return "情報を入力してください";
    if (!isValid) return "入力内容を確認してください";
    return buttonText;
  };

  return (
    <div className="bg-blue-100 w-screen h-screen flex items-center justify-center">
      <Card className="w-[90%]">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <CardHeader className="text-center">
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {inputField.map((field) => (
              <div key={field.name} className="flex flex-col space-y-1 relative">
                <Label>{field.name.charAt(0).toUpperCase() + field.name.slice(1).toLowerCase()}</Label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  {...register(field.name)}
                />
                {errors[field.name] && (
                  <span className="text-red-600 font-semibold text-xs absolute right-0 top-0">{errors[field.name]?.message as string}</span>

                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center">
            <Button className={`disabled:bg-gray-300`} type="submit" variant={"outline"} disabled={disabled}>
              {getButtonText()}
            </Button>
          </CardFooter>
        </form>
        <Link href={link.href} className="underline text-center">
          {link.text}
        </Link>
      </Card>
    </div>
  );
};

export default AuthForm;
