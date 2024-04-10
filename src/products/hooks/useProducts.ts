import { useQuery } from "@tanstack/react-query";
import { productActiones } from "..";


interface Options{
  filterKey?:string
}

export const  useProducts = ({filterKey}:Options)=> {

  const {isLoading , isError ,data:products = [] , error , isFetching} =  useQuery(
    ["products",{filterKey}],
    ()=> productActiones.getProducts({filterKey}),
    {
      staleTime:1000 * 60 * 60 //data fresca por 1 hora
    }
  )
  return {
    error,
    isError,
    isFetching,
    isLoading,
    products
  };
}
