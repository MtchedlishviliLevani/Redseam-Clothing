"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Input from "@/features/shared/UI/Input";
import Button from "@/features/shared/UI/Button";
import { RegisterFormValues } from "@/types";
import Link from "next/link";
import { handleLogin } from "@/features/services";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/store";
export default function LoginForm() {
  const methods = useForm<RegisterFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [userNotFound, setUserNotFound] = React.useState(false);

  const router = useRouter();
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await handleLogin(data);
      const setUser = useAuthStore.getState().setUser;
      const setToken = useAuthStore.getState().setToken;
      setToken(result.token);
      setUserNotFound(false);
      setUser(result.user);
      router.push("/listing");
    } catch (err: unknown) {
      console.log(err);
      setUserNotFound(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        className="w-[50%] space-y-12"
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="text-[42px] text-[#10151f] font-semibold">Log in</h1>

        <div className="w-full space-y-[46px]">
          <div className="space-y-6">
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
          </div>
          {userNotFound && (
            <p className="text-red-500 mt-[-20px] text-sm">
              User or password is incorrect
            </p>
          )}

          <div className="space-y-6">
            <Button
              className="w-full cursor-pointer"
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
            >
              Login
            </Button>
            <div className="flex gap-2 text-[14px] m-auto justify-center">
              <span className="text-[#3e424a]">Not a member?</span>
              <Link href="/register" className="text-[#ff4000]">
                Register
              </Link>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
