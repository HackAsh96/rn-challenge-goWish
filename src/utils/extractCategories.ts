import { Product } from "../types/Product";

// Extract and generate list of categories from product data
export const extractCategories = (products:Product[]) => {
  const uniqueCategories = new Set(products.map(product => product.category));
  return ['All','No Match Filter', ...Array.from(uniqueCategories)];
}