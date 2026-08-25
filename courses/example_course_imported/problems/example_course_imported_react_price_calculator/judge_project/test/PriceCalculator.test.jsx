import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';

import PriceCalculator from '../src/PriceCalculator.jsx';

afterEach(cleanup);

describe('PriceCalculator', () => {
  test('shows one item and its price initially', () => {
    render(<PriceCalculator unitPrice={500} />);

    expect(screen.getByRole('status', { name: '個数' }).textContent).toBe('1');
    expect(screen.getByRole('status', { name: '合計金額' }).textContent).toBe('500');
  });

  test('increases the quantity and total', () => {
    render(<PriceCalculator unitPrice={500} />);

    fireEvent.click(screen.getByRole('button', { name: '増やす' }));
    fireEvent.click(screen.getByRole('button', { name: '増やす' }));

    expect(screen.getByRole('status', { name: '個数' }).textContent).toBe('3');
    expect(screen.getByRole('status', { name: '合計金額' }).textContent).toBe('1500');
  });

  test('does not decrease below one item', () => {
    render(<PriceCalculator unitPrice={250} />);

    fireEvent.click(screen.getByRole('button', { name: '減らす' }));

    expect(screen.getByRole('status', { name: '個数' }).textContent).toBe('1');
    expect(screen.getByRole('status', { name: '合計金額' }).textContent).toBe('250');
  });

  test('supports a unit price of zero', () => {
    render(<PriceCalculator unitPrice={0} />);

    fireEvent.click(screen.getByRole('button', { name: '増やす' }));

    expect(screen.getByRole('status', { name: '個数' }).textContent).toBe('2');
    expect(screen.getByRole('status', { name: '合計金額' }).textContent).toBe('0');
  });
});
