import { useQuery } from "@tanstack/react-query";
import { productActiones } from "..";


interface Options{
  id:number
}

export const  useProduct = ({id}:Options)=> {

  const {isLoading , isError ,data:product , error , isFetching} =  useQuery(
    ["product",id],
    ()=> productActiones.getProduct({id}),
    {
      staleTime:1000 * 60 * 60 //data fresca por 1 hora
    }
  )
  return {
    error,
    isError,
    isFetching,
    isLoading,
    product
  };
}
