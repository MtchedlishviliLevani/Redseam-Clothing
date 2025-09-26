import { ReactNode } from "react"

/** Brand information used across product views */
type Brand = {
  id: number;
  name: string;
  image: string;
};

/** Simplified product used in listings and cart */
type Product = {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: null | string[];
  available_sizes: null | string[];
  size?: string;
  color?: string;
  total_price?: number;
  quantity?: number;
}

/** Full product details used on the product page */
type ProductDetailInfo = {
  id: number;
  name: string;
  description: string | null;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[];
  brand: Brand;
};

// =============================
// UI component props (shared)
// =============================

/** Generic button props shared by UI buttons */


/** Input component props (forms) */
type InputProps = {
  name: string;
  type?: "text" | "email" | "password";
  label: string;
  required?: boolean;
  className?: string;
  rules?: Record<string, unknown>;
}
type OrderInputProps = {
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

/** Image uploader control props */
type ImageUploaderProps = {
  name: string;
  label?: string;
  className?: string;
}

/** Generic modal wrapper props */
type ModalProps  ={
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// =============================
// Auth/Register forms
// =============================

/** Registration form data */
type RegisterFormValues = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar: File | null;
};

// =============================
// Listing/Pagination/Filters
// =============================

/** Server response wrapper and pagination for listing page */
type ListingClientProps = {
  product: {
    data: Product[]
    links: {
      first?: string | null
      last?: string | null
      prev?: string | null
      next?: string | null
    }
    meta: {
      current_page: number
      from: number
      to: number
      total: number
      per_page: number
    }
  }
  currentPage: number
  totalPages: number
}

/** Pagination control props */
type PaginationProps = {
  currentPage: number
  totalPages: number
  links?: { first?: string | null; last?: string | null; prev?: string | null; next?: string | null }
}

/** Small removable tag for active filters */
type SelectedTagProps = {
  label: string;
  onRemove: () => void;
};

/** Sort modal visibility control */
type SortModalProps = {
  isOpen: boolean
  onClose: () => void
}

// =============================
// Order/Checkout
// =============================

/** Checkout form fields */
type CheckoutFormValues = {
  name: string;
  surname: string;
  email: string;
  address: string;
  zip_code: string;
};

/** Sidebar summary props for order */
type OrderSideBarProps = {
  totalPrice: number;
};

/** Success message control (post-order) */
interface SuccessMessageProps {
  onContinue: () => void;
}


// ======
// Global states and function
// ======
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isLogged: boolean;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}


interface Cart{
    isOpenCartModal: boolean;
    closeCartModal: () => void;
    openCartModal: () => void;
    cartItems: Product[];
  fetchCart: (token: string) => Promise<void>;
  increaseQuantity: (token:string,id: number,color:string,size:string) => Promise<void>;
  decreaseQuantity: (token:string,id: number,color:string,size:string) => Promise<void>;
  deleteItem: (token: string, id: number,data:{color:string,size:string}) => Promise<void>;
  clearCart: () => void;
}

// =============================
// Public exports: keep only app-wide relevant types below
// =============================
export type {
  Brand,
  Product,
  ProductDetailInfo,
  InputProps,
  OrderInputProps,
  ImageUploaderProps,
  ModalProps,
  RegisterFormValues,
  ListingClientProps,
  PaginationProps,
  SelectedTagProps,
  SortModalProps,
  CheckoutFormValues,
  OrderSideBarProps,
  SuccessMessageProps,
  User,AuthState,Cart
}