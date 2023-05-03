import test from 'ava';
import { toFixed } from '..';

test('performs basic float zero-padding', t => {
  t.is(toFixed(54321, 5), '54321.00000');
});

test('should round', t => {
  t.is(toFixed(0.615, 2), '0.62');
  t.is(toFixed(74.725, 2), '74.73');
  t.is(toFixed(158.605, 2), '158.61');
  t.is(toFixed(3.1415, 2, 1), '3.15');
  t.is(toFixed(12.56, 1, -1), '12.5');
});

test('should correctly round values with high precision', t => {
  t.is(toFixed(0.6149, 2), '0.61');
  t.is(toFixed(1234567.89123, 5), '1234567.89123');
  t.is(toFixed(0.1 + 1e-10, 8), '0.10000000');
});

test('should handle very small numbers', t => {
  t.is(toFixed(1e-10, 10), '0.0000000001');
  t.is(toFixed(1e-10, 12), '0.000000000100');
  t.is(toFixed(1e-10 + 2e-10, 10), '0.0000000003');
});

test('should correctly apply custom rounding', t => {
  t.is(toFixed(0.615, 2, 0), '0.62');
  t.is(toFixed(0.615, 2, 1), '0.62');
  t.is(toFixed(0.615, 2, -1), '0.61');
  t.is(toFixed(-0.615, 2, 0), '-0.62');
  t.is(toFixed(-0.615, 2, 1), '-0.61');
  t.is(toFixed(-0.615, 2, -1), '-0.62');
});

test('should handle very small positive numbers', t => {
  t.is(toFixed(1e-12, 12), '0.000000000001');
  t.is(toFixed(1e-12, 14), '0.00000000000100');
  t.is(toFixed(1e-12 + 2e-12, 12), '0.000000000003');
  t.is(toFixed(9e-13, 12), '0.000000000001');
  t.is(toFixed(0.00000012345, 9), '0.000000123');
  t.is(toFixed(0.00000012345, 11), '0.00000012345');
});

test('should handle very small negative numbers', t => {
  t.is(toFixed(-1e-12, 12), '-0.000000000001');
  t.is(toFixed(-1e-12, 14), '-0.00000000000100');
  t.is(toFixed(-1e-12 - 2e-12, 12), '-0.000000000003');
  t.is(toFixed(-9e-13, 12), '-0.000000000001');
  t.is(toFixed(-0.00000012345, 9), '-0.000000123');
  t.is(toFixed(-0.00000012345, 11), '-0.00000012345');
});