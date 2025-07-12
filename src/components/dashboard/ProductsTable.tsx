import styled from "styled-components";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";

import { Card, CardContent, CardTitle, Table, Button, Modal } from "../ui";
import { productApi } from "../../services/api";
import { ProductForm } from "./ProductForm";
import type { Product, TableColumn } from "../../types";

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductTitle = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
`;

const CategoryCell = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const PriceCell = styled.div`
  font-weight: 600;
`;

const ActionsGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export function ProductsTable() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const queryClient = useQueryClient();

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormMode("create");
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormMode("edit");
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });

  const columns: TableColumn<Product>[] = [
    {
      key: "name",
      header: "Name",
      render: (product) => (
        <ProductCell>
          <div>
            <ProductTitle>
              {product.name.length > 50
                ? product.name.substring(0, 50) + "..."
                : product.name}
            </ProductTitle>
          </div>
        </ProductCell>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (product) => (
        <CategoryCell>
          {product.description.length > 100
            ? product.description.substring(0, 100) + "..."
            : product.description}
        </CategoryCell>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (product) => <PriceCell>${product.price}</PriceCell>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (product) => (
        <ActionsGroup>
          <Button
            variant="outline"
            onClick={() => handleEdit(product)}
            aria-label="Edit"
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline"
            onClick={() => deleteMutation.mutate(product.id)}
            disabled={deleteMutation.isPending}
            aria-label="Delete"
          >
            <FaTrash />
          </Button>
        </ActionsGroup>
      ),
    },
  ];

  return (
    <>
      <Card>
        <CardContent>
          <TopBar>
            <CardTitle> Products</CardTitle>
            <Button onClick={handleAddNew}>Add Product</Button>
          </TopBar>
          <Table
            data={products || []}
            columns={columns}
            isLoading={isLoading}
            error={error}
            loadingMessage="Loading products..."
            errorMessage="Error loading products"
          />
        </CardContent>
      </Card>
      <Modal
        open={showForm}
        onClose={handleCloseForm}
        title={formMode === "create" ? "Create new product" : "Edit Product"}
        width="600px"
      >
        <ProductForm
          product={editingProduct || undefined}
          onClose={handleCloseForm}
          mode={formMode}
        />
      </Modal>
    </>
  );
}
