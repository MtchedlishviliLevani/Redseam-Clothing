import { ModalProps } from "@/types";
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.35)",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 40,
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "540px",
          height: "100%",
          backgroundColor: "white",
          padding: "40px",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          zIndex: 50,
        }}
      >
        {children}
      </div>
    </>
  );
}
