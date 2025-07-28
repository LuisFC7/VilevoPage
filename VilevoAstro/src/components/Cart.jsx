import { useState, useEffect } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Manejador para agregar productos al carrito
    const handleAddToCart = (e) => {
      const product = e.detail;
      if (!product) return;

      const { id: productId, name, price, size, quantity } = product;

      const existingItem = cartItems.find(
        (item) => item.id === productId && item.size === size
      );

      if (existingItem) {
        setCartItems(
          cartItems.map((item) =>
            item.id === productId && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            id: productId,
            name,
            price,
            size,
            quantity,
          },
        ]);
      }
    };

    // Escuchar eventos de cambio de cantidad directamente (si se usa en el futuro)
    const handleQuantityChange = (e) => {
      const { productId, quantity } = e.detail;
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    };

    window.addEventListener('addToCart', handleAddToCart);
    window.addEventListener('quantityChange', handleQuantityChange);

    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
      window.removeEventListener('quantityChange', handleQuantityChange);
    };
  }, [cartItems]);

  const removeItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-shopping-cart"></i>
        {cartItems.length > 0 && (
          <span className="cart-count">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <h3>Tu Carrito</h3>
          {cartItems.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item, index) => (
                  <li
                    key={`${item.id}-${item.size}-${index}`}
                    className="cart-item"
                  >
                    <div className="cart-item-info">
                      <span>{item.name}</span>
                      {item.size !== 'N/A' && <span>Talla: {item.size}</span>}
                      <span>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(index)}
                      className="remove-item"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Subtotal: ${total.toFixed(2)}</strong>
              </div>
              {/* <button className="checkout-btn">Proceder al Pago</button> */}
              <button
                className="checkout-btn"
                onClick={() => {
                  localStorage.setItem('cartData', JSON.stringify(cartItems));
            
                  window.location.href = '/Checkout'; // ruta de tu formulario
                }}
              >
                Proceder al Pago
              </button>

            </>
          )}
        </div>
      )}
    </div>
  );
}
