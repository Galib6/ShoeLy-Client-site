export const getDiscountedPrice = (originalPrice, percentage) => {
  const discount = originalPrice * percentage;

  const afterDiscountP = originalPrice - discount;

  return Math.round(afterDiscountP);
};
