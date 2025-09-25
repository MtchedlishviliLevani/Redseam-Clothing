"use client"
import RegisterForm from "@/features/register/RegisterForm";
import AuthHero from "@/features/shared/UI/AuthHero";

function RegistrationPage() {
  return (
    <div>
      <div className="px-[100px]">
      
      </div>

      <div className="flex h-[calc(100vh-84px)] gap-[173px] items-center">
        <AuthHero/>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegistrationPage
