import { Product } from '../types/Product';
import mockProducts from '../../mock-products.json';

const PAGE_SIZE = 20; // Number of items per page
/**
 * Fetch mock products (simulates API behavior)
 * @returns Promise<Product[]>
 */
export const fetchMockProducts = async (pageNum:number): Promise<Product[]> => {
   return new Promise<Product[]>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.95) {
          reject('Failed to fetch products. Please try again.');
        } else {
          const start = pageNum * PAGE_SIZE;
          const end = start + PAGE_SIZE;
          resolve(mockProducts.slice(start, end));
        }
      }, 1000); 
  });
};
