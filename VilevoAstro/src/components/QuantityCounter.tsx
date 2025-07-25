import { useState, useEffect } from 'react';

interface QuantityCounterProps {
  productId: string;
  initialQuantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantityCounter({ 
  productId, 
  initialQuantity = 1, 
  onQuantityChange 
}: QuantityCounterProps) {
  const [cantidad, setCantidad] = useState(initialQuantity);

  // Escuchar evento de reinicio
  useEffect(() => {
    const handleReset = (e: CustomEvent) => {
      if (e.detail.productId === productId) {
        setCantidad(1);
        onQuantityChange(1);
      }
    };

    window.addEventListener('resetCounter', handleReset as EventListener);
    return () => {
      window.removeEventListener('resetCounter', handleReset as EventListener);
    };
  }, [productId, onQuantityChange]);

  const aumentar = () => {
    const newQuantity = cantidad + 1;
    setCantidad(newQuantity);
    onQuantityChange(newQuantity);
  };

  const disminuir = () => {
    if (cantidad > 1) {
      const newQuantity = cantidad - 1;
      setCantidad(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="cantidad-control">
      <button type="button" className="btn-cantidad" onClick={disminuir}>-</button>
      <input
        type="text"
        readOnly
        value={cantidad}
        className="cantidad-input"
      />
      <button type="button" className="btn-cantidad" onClick={aumentar}>+</button>
    </div>
  );
}