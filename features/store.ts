import { create } from "zustand";
import { getCartItems, deleteCartItem,updateCartItemQuantity } from "@/features/services/index";
import { AuthState,User,Cart } from "@/types/index";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLogged: false,
  setUser: (user: User) => set({ user, isLogged: true }),
  setToken: (token: string) => set({ token }),
  token: null,
}));


export const useCartStore = create<Cart>((set,get) => ({
    isOpenCartModal: false,
    closeCartModal: () => set({ isOpenCartModal: false }),
    openCartModal: () => set({ isOpenCartModal: true }),
    cartItems: [],
    fetchCart: async (token: string) => {
    try {
      const response = await getCartItems(token);
      const items = Array.isArray(response) ? response : (response?.data ?? []);
      set({ cartItems: items });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  },

increaseQuantity: async (token: string, id: number,color:string,size:string) => {
  set((state) => ({
    cartItems: state.cartItems.map((item) => {
      if (item.id !== id ||item.color!==color||item.size!==size) return item;
      const newQuantity = (item.quantity ?? 1) + 1;
      const unitPrice = item.price ?? 0;
      return {
        ...item,
        quantity: newQuantity,
        total_price: unitPrice * newQuantity,
      };
    }),
  }));

  const item = get().cartItems.find(
    (item) => item.id === id && item.color === color && item.size === size
  );
  if (item) {
    try {
      await updateCartItemQuantity(
        token,
        {
          quantity: (item.quantity ?? 1),
          color: color,
          size: size
        },
        id
      );
    } catch (err) {
      console.error("Failed to update quantity in backend", err);
    }
  }
},

decreaseQuantity: async (token: string, id: number,color:string, size:string) => {
  set((state) => ({
    cartItems: state.cartItems.map((item) => {
      if (item.id !== id||item.color!==color||item.size!==size) return item;
      const currentQuantity = item.quantity ?? 1;
      if (currentQuantity <= 1) return item;
      const newQuantity = currentQuantity - 1;
      const unitPrice = item.price ?? 0;
      return {
        ...item,
        quantity: newQuantity,
        total_price: unitPrice * newQuantity,
      };
    }),
  }));

  const item = get().cartItems.find(
  (item) => item.id === id && item.color === color && item.size === size
);
  if (item) {
    try {
      await updateCartItemQuantity(
        token,
        {
          quantity: (item.quantity ?? 1),
          color: color,
          size: size,
        },
        id
      );
    } catch (err) {
      console.error("Failed to update quantity in backend", err);
    }
  }
},



  deleteItem: async (token, id, data: { color: string; size: string }) => {
  try {
    await deleteCartItem(token, id, data);
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !(item.id === id && item.color === data.color && item.size === data.size)
      ),
    }));
  } catch (error) {
    console.error("Failed to delete cart item:", error);
  }
},
  clearCart: () => set({ cartItems: [] }),
}));



