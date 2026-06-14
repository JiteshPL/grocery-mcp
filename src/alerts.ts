export function checkAlert(
  products: any[],
  limit: number
) {

  return products.filter(
    p => p.price <= limit
  );
}