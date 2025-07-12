import { useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, InputGroup, Textarea } from "../ui";
import { productApi } from "../../services/api";
import { productSchema, type ProductFormData } from "../../schemas/product";
import type { Product } from "../../types";

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
`;

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  mode: "create" | "edit";
}

export function ProductForm({ product, onClose, mode }: ProductFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
    },
  });

  useEffect(() => {
    if (product && mode === "edit") {
      reset({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
      });
    }
  }, [product, mode, reset]);

  const createMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description ?? "",
    };
    if (mode === "create") {
      createMutation.mutate(productData);
    } else if (product) {
      updateMutation.mutate({ id: product.id, data: productData });
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Input
          {...register("name")}
          label="Name"
          type="text"
          error={errors.name?.message}
        />
        <Input
          {...register("price")}
          label="Price"
          type="number"
          step="0.01"
          min="0"
          error={errors.price?.message}
        />
      </FormRow>

      <InputGroup>
        <Textarea {...register("description")} label="Description" rows={4} />
      </InputGroup>

      <ButtonGroup>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : mode === "create"
            ? "Create Product"
            : "Update Product"}
        </Button>
      </ButtonGroup>
    </form>
  );
}
