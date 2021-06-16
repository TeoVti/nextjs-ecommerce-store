export function sumOfPresetsQuantity(array) {
  return array.map((i) => i.quantity).reduce((a, b) => a + b, 0);
}
