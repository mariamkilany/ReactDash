import styled from "styled-components";
import type { ButtonProps } from "../../../types";

const StyledButton = styled.button<{ $variant?: "primary" | "outline" }>`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 15px;
  text-transform: capitalize;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  max-width: 200px;
  width: fit-content;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant }) => {
    switch ($variant) {
      case "outline":
        return `
          background-color: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
          
          &:hover {
            background-color: var(--primary);
            color: var(--text-light);
          }
        `;
      default:
        return `
          background-color: var(--primary);
          color: var(--text-light);
          
          &:hover {
            opacity: 0.9;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}
