import { productsAPI } from "../api/productsApi";
import { Product } from "../interfaces/product";

interface GetProductsOptions {
  filterKey?: string;
  id:number
}

export const getProducts = async ({ filterKey }: GetProductsOptions) => {

  const filterURL = filterKey ? `category=${filterKey}`: ''
  const { data } = await productsAPI<Product[]>(`/products?${filterURL}`);

  return data;
};

export const getProduct = async ({ id }: GetProductsOptions) => {

  const { data } = await productsAPI<Product>(`/products/${id}`);
  return data;
};

