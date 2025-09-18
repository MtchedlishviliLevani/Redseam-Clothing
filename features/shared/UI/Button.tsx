import { ButtonProps } from '@/types'

function Button({ children, icon, src, onClick, disabled, className }: ButtonProps) {

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center rounded-[10px] items-center gap-2 bg-[#ff4000] text-white  px-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ""}`}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {!icon && src ? <span aria-hidden>{src}</span> : null}
      <span>{children}</span>
    </button>
  )
}

export default Button
