const API = "https://api.redseam.redberryinternship.ge/api"

// Register Handling
export const handleRegister = async (formData: FormData) => {
  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

     if (!res.ok) {
    let errors: Record<string, string[]> = {};
    try {
      const errorData = await res.json();
      if (errorData.errors) {
        errors = errorData.errors;
      }
    } catch {}
    throw errors;
  }
    const result = await res.json();
    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Registration failed");
    throw err;
  }
};

/// Login Hnadling
export const handleLogin = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

     if (!res.ok) {
    let errors: Record<string, string[]> = {};
    try {
      const errorData = await res.json();
      if (errorData.errors) {
        errors = errorData.errors;
      }
    } catch {}
    throw errors;
  }
    const result = await res.json();

    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Login failed");
    throw err;
  }
}

/// Get All Products
export async function getProducts({ price_from, price_to, sort, page }: { price_from?: number; price_to?: number; sort?: string; page?: number } = {}) {
  try {
    const url = new URL(`${API}/products`);
    const params = new URLSearchParams();

    if (typeof price_from !== "undefined") params.set("filter[price_from]", String(price_from));
    if (typeof price_to !== "undefined") params.set("filter[price_to]", String(price_to));
    if (typeof sort !== "undefined") params.set("sort", String(sort));
    if (typeof page !== "undefined") params.set("page", String(page));

    const qs = params.toString();
    const requestUrl = qs ? `${url.toString()}?${qs}` : url.toString();

    const res = await fetch(requestUrl, { cache: "no-store" });
    if (!res.ok) throw new Error("Products failed");
    const result = await res.json();
    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Failed to fetch products');
    throw err;
  }
}

// Pagination
export function getPaginationInfo(product: {
  meta?: { current_page?: number };
  links?: {
    last?: string;
    next?: string;
  };
}): { currentPage: number; totalPages: number } {
  const currentPage = product?.meta?.current_page ?? 1
  let totalPages = 1
  try {
    const last = product?.links?.last
    if (last) {
      const lastPageParam = new URL(last).searchParams.get("page")
      totalPages = lastPageParam ? Math.max(1, Number(lastPageParam)) : 1
    } else {
      totalPages = (product?.links?.next ? currentPage + 1 : currentPage)
    }
  } catch {
    totalPages = 1
  }
  return { currentPage, totalPages }
}

// get product detail data
export async function getProductDetails(productId: number) {
  try {
    const res = await fetch(`${API}/products/${productId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Product details fetch failed");
    const result = await res.json();
    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Failed to fetch product details');
    throw err;
  }
}

// get cart items
export async function getCartItems(token:string){
  try {
    const res = await fetch(`${API}/cart`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Cart items fetch failed");
    const result = await res.json();
    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Failed to fetch cart items');
    throw err;
  }
}


//add product to cart
export async function addProductToCart(token:string,data:{color:string,size:string,quantity:number},id:number){
  try {
    const res = await fetch(`${API}/cart/products/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Add to product failed");
    const result = await res.json();
    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Failed to add to product');
    throw err;
  }
}

//update quantity
export async function updateCartItemQuantity(token:string,data:{quantity:number,color:string;size:string},id:number){
  try {
    const res = await fetch(`${API}/cart/products/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Update cart item quantity failed");
    const result = await res.json();
    return result;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : 'Failed to update cart item quantity');
    throw err;
  }
}

/// delete the product from the cart
export async function deleteCartItem(token: string, id: number,data:{color:string;size:string}) {
  try {
    const res = await fetch(`${API}/cart/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body:JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Delete cart item failed");

    // handle empty response gracefully
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }
    return null; // no content returned
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : "Failed to delete cart item");
    throw err;
  }
}


//// checkout Post
export async function checkout(
  token: string,
  data: {
    name: string;
    surname: string;
    email: string;
    zip_code: string;
    address: string;
  }
) {
  try {
    const response = await fetch(`${API}/cart/checkout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Checkout failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
}

