export interface Product {
  id?:          string | number;
  title:       string;
  price:       number;
  description: string;
  category:    string;
  image:       string;
  rating?:      Rating;
}

export type DraftProduct= Omit<Product, "id" | "rating">


export interface Rating {
  rate:  number;
  count: number;
}
