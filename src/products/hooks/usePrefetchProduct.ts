import { useQueryClient } from "@tanstack/react-query";
import { productActiones } from "..";

export const usePrefetchProduct = () => {

  const queryCliente =  useQueryClient()

  const prefetchProduct = async(id:number)=>{
    queryCliente.prefetchQuery(
      ["product" , id],
      ()=>productActiones.getProduct({id})
    )
  }
  return {
    prefetchProduct
  };

  
}
