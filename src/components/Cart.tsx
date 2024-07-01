import { CartItem } from "@/types";

export interface CartProps {
  items: CartItem[];
}

export default function Cart({ items }: CartProps) {
  const subtotal = items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  return (
    <div className="flex flex-col divide-y divide-gray-400 gap-4">
      {items.map(({ id, title, url, price, quantity }) => (
        <div key={id} className="flex flex-row p-4 gap-4">
          <div className="size-10 flex items-center justify-center">
            <img src={url} alt={`${title} product image`} />
          </div>
          <div className="flex flex-col flex-grow">
            <p>{title}</p>
            <p className="text-gray-400">Qty: {quantity}</p>
          </div>
          <div className="font-bold text-base">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format((price * quantity) / 100)}
          </div>
        </div>
      ))}
      <div className="flex flex-row p-4 text-base font-bold justify-between">
        <div>Total</div>
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(subtotal / 100)}
        </div>
      </div>
    </div>
  );
}
