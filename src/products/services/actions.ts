import { productsAPI } from "../api/productsApi";
import { DraftProduct, Product } from "../interfaces/product";

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


export const createProduct = async( product : DraftProduct)=>{
  try {
    const {data} =  await productsAPI.post<Product>(`/products`,product)
    return data
    
  } catch (error) {
    throw new Error("error al crear el producto")
  }
}
