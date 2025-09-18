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

export type { ButtonProps,RegisterFormValues,Product }