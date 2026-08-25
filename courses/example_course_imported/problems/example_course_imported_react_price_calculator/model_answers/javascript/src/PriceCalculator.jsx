import React, { useState } from 'react';

export default function PriceCalculator({ unitPrice }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section>
      <button aria-label="減らす" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
        −
      </button>
      <output aria-label="個数">{quantity}</output>
      <button aria-label="増やす" onClick={() => setQuantity((current) => current + 1)}>
        ＋
      </button>
      <output aria-label="合計金額">{unitPrice * quantity}</output>
    </section>
  );
}
