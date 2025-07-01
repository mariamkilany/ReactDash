import styled from "styled-components";
import { Loader } from "../Loader";
import type { TableProps } from "../../../types";

const TableContainer = styled.div`
  overflow-x: auto;
  max-width: 100%;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  table-layout: auto;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.75rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border-light);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.375rem;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-light);
`;

const TableCell = styled.td`
  padding: 0.75rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.375rem;
  }
`;

const TableErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--error);
`;

export function Table<T>({
  data,
  columns,
  isLoading = false,
  error = null,
  loadingMessage = "Loading...",
  errorMessage = "Error loading data",
  className = "",
}: TableProps<T>) {
  if (isLoading) {
    return (
      <TableContainer className={`scrollable-container ${className}`}>
        <Loader text={loadingMessage} />
      </TableContainer>
    );
  }

  if (error) {
    return (
      <TableContainer className={`scrollable-container ${className}`}>
        <TableErrorMessage>
          {errorMessage}: {error.message}
        </TableErrorMessage>
      </TableContainer>
    );
  }

  return (
    <TableContainer className={`scrollable-container ${className}`}>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <TableHeader key={column.key}>{column.header}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render
                    ? column.render(item)
                    : String(
                        (item as Record<string, unknown>)[column.key] || ""
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}
