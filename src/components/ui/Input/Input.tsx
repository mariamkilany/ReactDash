import styled from "styled-components";
import type { InputProps } from "../../../types";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-light);
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: var(--error);
  margin-top: 0.25rem;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  font-size: 16px;
  padding: 10px 0;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid
    ${({ $hasError }) => ($hasError ? "var(--error)" : "var(--border)")};
  background-color: transparent;
  color: var(--text-light);
  outline: none;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-bottom-color: ${({ $hasError }) =>
      $hasError ? "var(--error)" : "var(--primary)"};
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const Input = ({ label, error, ...props }: InputProps) => {
  console.log("props", props);
  return label?.trim() ? (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput $hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  ) : (
    <>
      <StyledInput $hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};
