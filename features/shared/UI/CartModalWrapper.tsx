"use client";

import React from "react";
import { useCartStore } from "@/features/store";
import Modal from "@/features/shared/UI/Modal";
import Cart from "@/features/cart/Cart";

export default function CartModalWrapper() {
  const isOpenCartModal = useCartStore((state) => state.isOpenCartModal);
  const onCloseCartModal = useCartStore((state) => state.closeCartModal);

  if (!isOpenCartModal) return null;

  return (
    <Modal isOpen={isOpenCartModal} onClose={onCloseCartModal}>
      <Cart />
    </Modal>
  );
}
