import styled from "styled-components";
import type { TextareaProps } from "../../../types";

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

const StyledTextarea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "var(--error)" : "var(--border)")};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-family: inherit;
  resize: vertical;
  background-color: transparent;
  color: var(--text-light);
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${({ $hasError }) =>
      $hasError ? "var(--error" : "var(--primary)"};
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const Textarea = ({ label, error, ...props }: TextareaProps) => {
  return label?.trim() ? (
    <TextareaContainer>
      <Label>{label}</Label>
      <StyledTextarea $hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </TextareaContainer>
  ) : (
    <>
      <StyledTextarea $hasError={!!error} {...props} />
      {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
    </>
  );
};
