"use client";
import { Controller, UseFormReturn } from "react-hook-form";
import OrderInput from "@/features/shared/UI/OrderInput";
import { CheckoutFormValues } from "@/types";

type Props = {
  formMethods: UseFormReturn<CheckoutFormValues>;
};

function OrderForm({ formMethods }: Props) {
  const {
    control,
    formState: { errors },
  } = formMethods;

  return (
    <section className="mt-[42px] w-[1129px] h-[635px] rounded-[16px] pt-[72px] px-[47px] bg-[#F8F6F7]">
      <h2 className="text-[#3e424a] text-[22px] font-medium">
        Order Details
      </h2>

      <div className="mt-[46px] space-y-[33px]">
        <div className="flex gap-6">
          <div>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
                validate: (value) =>
                  value.trim().length >= 3 || "Name cannot be just spaces",
              }}
              render={({ field }) => (
                <OrderInput
                  type="text"
                  placeholder="Name"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <Controller
              name="surname"
              control={control}
              rules={{
                required: "Surname is required",
                minLength: { value: 3, message: "Surname must be at least 3 characters" },
                validate: (value) =>
                  value.trim().length >= 3 || "Surname cannot be just spaces",
              }}
              render={({ field }) => (
                <OrderInput
                  type="text"
                  placeholder="Surname"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.surname && (
              <p className="text-red-500 text-sm">{errors.surname.message}</p>
            )}
          </div>
        </div>

        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <OrderInput
                type="email"
                placeholder="Email"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex gap-6">
          <div>
            <Controller
              name="address"
              control={control}
              rules={{
                required: "Address is required",
                minLength: { value: 3, message: "Address must be at least 3 characters" },
                pattern: {
                  value: /^[A-Za-z0-9\s.,-]+$/,
                  message: "Address can contain letters, numbers and ,.-",
                },
              }}
              render={({ field }) => (
                <OrderInput
                  type="text"
                  placeholder="Address"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="zip_code"
              control={control}
              rules={{
                required: "Zip code is required",
                minLength: { value: 2, message: "Zip code must be at least 2 digits" },
                pattern: { value: /^[0-9]+$/, message: "Zip code must be a number" },
              }}
              render={({ field }) => (
                <OrderInput
                  type="text"
                  placeholder="Zip Code"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.zip_code && (
              <p className="text-red-500 text-sm">{errors.zip_code.message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderForm;
