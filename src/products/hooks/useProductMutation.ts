import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActiones } from "..";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActiones.createProduct,

    onMutate: (product) => {
      //OPTIMISTIC PRODUCT
      const optimisticProduct = { id: Math.random(), ...product };

      // Almacena el producto en el cache del queryClient
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (prevState) => {
          if (!prevState) return [optimisticProduct];
          return [...prevState, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },

    onSuccess: (product, variables, context) => {
      console.log(variables);
      console.log(context);
      //Limpiar el query
      queryClient.removeQueries(
        ["product", context?.optimisticProduct.id]
      )
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (prevState) => {
          if (!prevState) return [];

          return prevState.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        }
      );
    },

    onError:(error , variables , context)=>{
      console.log(error)
      queryClient.removeQueries(
        ["product", context?.optimisticProduct.id])

        queryClient.setQueryData<Product[]>(
        ["products", { filterKey: variables.category }],
        (prevState) => {
          if (!prevState) return [];

          return prevState.filter((cacheProduct) => {
            return cacheProduct.id !== context?.optimisticProduct.id
          });
        }
      );

    }
  });
  return { mutation };
};
