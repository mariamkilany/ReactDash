import { useQuery } from "@tanstack/react-query";
import { productApi, userApi } from "../../services/api";
import { StatsCard } from "./StatsCard";
import { FaShoppingCart, FaUsers, FaDollarSign, FaStar } from "react-icons/fa";
import styled from "styled-components";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

export function DashboardStats() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });

  const totalProducts = products?.length || 0;
  const totalUsers = users?.length || 0;
  const totalRevenue =
    products?.reduce((sum, product) => sum + product.price, 0) || 0;
  const avgRating =
    (products?.reduce((sum, product) => sum + product.rating.rate, 0) || 0) /
    (products?.length || 1);

  return (
    <StatsGrid>
      <StatsCard
        title="Total Products"
        value={totalProducts}
        icon={<FaShoppingCart />}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Total Users"
        value={totalUsers}
        icon={<FaUsers />}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="Total Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        icon={<FaDollarSign />}
        trend={{ value: 15, isPositive: true }}
      />
      <StatsCard
        title="Average Rating"
        value={avgRating.toFixed(1)}
        icon={<FaStar />}
        trend={{ value: 5, isPositive: true }}
      />
    </StatsGrid>
  );
}
