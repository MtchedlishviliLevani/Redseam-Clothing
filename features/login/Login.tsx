import AuthHero from "@/features/shared/UI/AuthHero";
import LoginForm from "@/features/login/LoginForm";

function LoginPage() {
  return (
    <div>
      {/* Container */}
      <div className="px-[100px]">
        
      </div>

      <div className="flex h-[calc(100vh-84px)] gap-[173px] items-center">
        <AuthHero/>
        <LoginForm/>
      </div>
    </div>
  )
}

export default LoginPage
