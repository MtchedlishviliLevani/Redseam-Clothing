import { ReactNode } from "react"

type ButtonProps = {
  children: React.ReactNode
  icon?: React.ReactNode
  src?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  className?:string

}

type RegisterFormValues = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    avatar: File | null;
};

type Product = {
    id: number;
    name: string;
    description: string;
    release_year: string;
    cover_image: string;
    images: string[];
    price: number;
    available_colors:null | string[];
    available_sizes:null | string[];
}

type ImageUploaderProps = {
    name: string;
    label?: string;
    className?: string;
}
type InputProps = {
  name: string;
  type?: "text" | "email" | "password";
  label: string;
  required?: boolean;
  className?: string;
  rules?: Record<string, unknown>;
}

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


type Brand = {
  id: number;
  name: string;
  image: string;
};

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

type ModalProps  ={
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
export type { ButtonProps,RegisterFormValues,Product,ImageUploaderProps,InputProps,ListingClientProps, ProductDetailInfo,ModalProps }