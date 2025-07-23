import { useState } from 'react';

export default function QuantityCounter() {
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad((prev) => prev + 1);
  const disminuir = () => {
    if (cantidad > 1) setCantidad((prev) => prev - 1);
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
