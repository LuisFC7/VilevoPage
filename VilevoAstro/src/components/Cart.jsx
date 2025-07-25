import { useState, useEffect } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Escuchar eventos de añadir al carrito
    const handleAddToCart = (e) => {
      const productId = e.target.getAttribute('data-product-id');
      if (!productId) return;
      
      const productElement = e.target.closest('.merch-description');
      const productName = productElement.querySelector('h3').textContent;
      const priceText = productElement.querySelector('.merch-price').textContent;
      const price = parseFloat(priceText.replace('$', ''));
      const sizeSelect = productElement.querySelector('.talla-select');
      const size = sizeSelect ? sizeSelect.value : 'N/A';
      
      // Buscar si el producto ya está en el carrito
      const existingItem = cartItems.find(item => item.id === productId && item.size === size);
      
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, {
          id: productId,
          name: productName,
          price,
          size,
          quantity: 1
        }]);
      }
    };

    // Escuchar cambios en la cantidad
    const handleQuantityChange = (e) => {
      const { productId, quantity } = e.detail;
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    };

    document.addEventListener('click', handleAddToCart);
    window.addEventListener('quantityChange', handleQuantityChange);

    return () => {
      document.removeEventListener('click', handleAddToCart);
      window.removeEventListener('quantityChange', handleQuantityChange);
    };
  }, [cartItems]);

  const removeItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart-container">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className="fas fa-shopping-cart"></i>
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
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
                  <li key={`${item.id}-${item.size}-${index}`} className="cart-item">
                    <div className="cart-item-info">
                      <span>{item.name}</span>
                      {item.size !== 'N/A' && <span>Talla: {item.size}</span>}
                      <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </div>
                    <button onClick={() => removeItem(index)} className="remove-item">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
              <button className="checkout-btn">Proceder al Pago</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}