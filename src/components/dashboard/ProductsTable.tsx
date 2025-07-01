import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardTitle, Table } from "../ui";
import { productApi } from "../../services/api";
import type { Product, TableColumn } from "../../types";

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
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

const RatingCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StarIcon = styled.span`
  color: var(--warning);
`;

const RatingValue = styled.span`
  font-size: 0.875rem;
`;

const RatingCount = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

export function ProductsTable() {
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
      key: "product",
      header: "Product",
      render: (product) => (
        <ProductCell>
          <ProductImage src={product.image} alt={product.title} />
          <div>
            <ProductTitle>
              {product.title.length > 50
                ? product.title.substring(0, 50) + "..."
                : product.title}
            </ProductTitle>
          </div>
        </ProductCell>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (product) => <CategoryCell>{product.category}</CategoryCell>,
    },
    {
      key: "price",
      header: "Price",
      render: (product) => <PriceCell>${product.price}</PriceCell>,
    },
    {
      key: "rating",
      header: "Rating",
      render: (product) => (
        <RatingCell>
          <StarIcon>★</StarIcon>
          <RatingValue>{product.rating.rate}</RatingValue>
          <RatingCount>({product.rating.count})</RatingCount>
        </RatingCell>
      ),
    },
  ];

  return (
    <Card>
      <CardContent>
        <CardTitle style={{ marginBottom: "1rem" }}>Recent Products</CardTitle>
        <Table
          data={products?.slice(0, 10) || []}
          columns={columns}
          isLoading={isLoading}
          error={error}
          loadingMessage="Loading products..."
          errorMessage="Error loading products"
        />
      </CardContent>
    </Card>
  );
}
