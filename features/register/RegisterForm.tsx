"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import ImageUploader from "@/features/shared/UI/ImageUploader";
import Input from "@/features/shared/UI/Input";
import Button from "@/features/shared/UI/Button";
import { RegisterFormValues } from "@/types";
import { handleRegister } from "@/features/services";
import { useAuthStore } from '@/features/store';
import { useRouter } from "next/navigation";
export default function RegisterForm() {
    const router = useRouter();
  const methods = useForm<RegisterFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      avatar: null,
    },
  });

    

  const onSubmit = async (data: RegisterFormValues) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    if (data.avatar) formData.append("avatar", data.avatar);

    try {
      const result = await handleRegister(formData);

          // Save user in Zustand
    const setUser = useAuthStore.getState().setUser;
    const setToken = useAuthStore.getState().setToken;
    setToken(result.token);
    setUser(result.user);
    router.push("/listing");
     methods.reset();
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null) {
        for (const [key, messages] of Object.entries(err)) {
          methods.setError(key as keyof RegisterFormValues, {
            type: "server",
            message: (messages as string[]).join(", "),
          });
        }
      }
    }
  };

  const validatePasswordMatch = (value: string) => {
    const password = methods.getValues("password");
    return value === password || "Passwords do not match";
  };

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        className="w-[554px] space-y-12"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="text-[42px] text-[#10151f] font-semibold">
          Registration
        </h1>

        <div className="flex items-center gap-4">
          <ImageUploader className="flex items-center gap-4" name="avatar" />
        </div>

        <div className="w-full space-y-[46px]">
          <div className="space-y-6">
            <Input
              name="username"
              type="text"
              label="Username"
              required
              rules={{
                validate: (value: string) =>
                  value.trim().length >= 3 ||
                  "Username must be at least 3 characters",
              }}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              required
              rules={{
                pattern: {
                  value:
                    /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              required
              rules={{
                validate: (value: string) =>
                  value.trim().length >= 3 ||
                  "Password must be at least 3 characters",
              }}
            />
            <Input
              name="password_confirmation"
              type="password"
              label="Confirm Password"
              required
              rules={{ validate: validatePasswordMatch }}
            />
          </div>

          <div className="space-y-6">
            <Button
              className="w-full cursor-pointer"
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
            >
              Register
            </Button>
            <div className="flex gap-2 text-[14px] m-auto justify-center">
              <span className="text-[#3e424a]">Already member?</span>
              <a href="/login" className="text-[#ff4000]">
                Login
              </a>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
