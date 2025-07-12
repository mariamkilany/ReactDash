import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { userApi } from "../../services/api";
import { Card, CardContent, CardTitle, Table } from "../ui";
import type { TableColumn, User } from "../../types";

const IDCell = styled.div`
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
      key: "id",
      header: "ID",
      render: (user) => <IDCell>{user.id}</IDCell>,
    },
    {
      key: "email",
      header: "Email",
      render: (user) => <EmailCell>{user.email}</EmailCell>,
    },
    {
      key: "username",
      header: "Username",
      render: (user) => <UsernameCell>{user.name}</UsernameCell>,
    },
  ];

  return (
    <Card>
      <CardContent>
        <CardTitle style={{ marginBottom: "1rem" }}> Users</CardTitle>
        <Table
          data={users || []}
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
