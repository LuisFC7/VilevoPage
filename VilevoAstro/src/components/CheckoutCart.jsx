import { useEffect, useState } from 'react';

export default function CheckoutCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('cartData');
    console.log(data)
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  if (cart.length === 0) {
    return <p>No hay productos en el carrito.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="checkout-cart-details">
      <h3>Resumen del Carrito:</h3>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>
            {item.name} {item.size !== 'N/A' && `(Talla: ${item.size})`} -{' '}
            {item.quantity} x ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <strong>Subtotal: ${total.toFixed(2)}</strong>
    </div>
  );
}
