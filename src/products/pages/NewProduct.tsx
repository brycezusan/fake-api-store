import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useProductMutation } from "../hooks/useProductMutation";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const { mutation } = useProductMutation();

  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    },
  });

  const newImage = watch("image");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Titulo del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value?.toString()}
                  onChange={(e) => field.onChange(+e.target.value)}
                  type="number"
                  className="mt-2"
                  label="Precio del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={field.onChange}
                  type="url"
                  className="mt-2"
                  label="Url del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  className="mt-2"
                  label="Descripcion del producto"
                />
              )}
            />
            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  value={field.value}
                  onChange={field.onChange}
                  className="rounded-md p-3 mt-2 bg-gray-800 w-full"
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <br />
            <Button type="submit" className="mt-2" color="primary">
              {mutation.isLoading ? "cargando..." : "Crear"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
