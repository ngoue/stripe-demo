export interface CreatePaymentRequest {
  cart: CartItem[];
}

export interface CartItem {
  id: string;
  title: string;
  url: string;
  price: number;
  quantity: number;
}
