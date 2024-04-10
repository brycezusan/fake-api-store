import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProduct } from "../hooks/useProduct";
import { useEffect } from "react";

export const ProductPage = () => {
  const { id } = useParams();
  const { isLoading, product } = useProduct({ id: +id! });

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>
      {isLoading && <p>cargando....</p>}

      {product && (<ProductCard product={product} fullDescription/>)}
    </div>
  );
};
