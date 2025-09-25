import { ModalProps } from "@/types";
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/35 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } z-40`}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed inset-y-0 right-0 w-[540px] h-full bg-white p-10 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } z-50 overflow-y-auto custom_scroll`}
      >
        {children}
      </div>
    </>
  );
}
