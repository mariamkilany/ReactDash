import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { userApi } from "../../services/api";
import { Card, CardContent, CardTitle, Table } from "../ui";
import type { TableColumn, User } from "../../types";

const NameCell = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
`;

const EmailCell = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
`;

const UsernameCell = styled.div`
  font-size: 0.875rem;
`;

const CityCell = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
`;

export function UsersTable() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      render: (user) => (
        <NameCell>
          {user.name.firstname} {user.name.lastname}
        </NameCell>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (user) => <EmailCell>{user.email}</EmailCell>,
    },
    {
      key: "username",
      header: "Username",
      render: (user) => <UsernameCell>{user.username}</UsernameCell>,
    },
    {
      key: "city",
      header: "City",
      render: (user) => <CityCell>{user.address.city}</CityCell>,
    },
  ];

  return (
    <Card>
      <CardContent>
        <CardTitle style={{ marginBottom: "1rem" }}>Recent Users</CardTitle>
        <Table
          data={users?.slice(0, 10) || []}
          columns={columns}
          isLoading={isLoading}
          error={error}
          loadingMessage="Loading users..."
          errorMessage="Error loading users"
        />
      </CardContent>
    </Card>
  );
}
