import styled from "styled-components";
import type { ButtonProps } from "../../../types";

const StyledButton = styled.button`
  background-color: var(--primary);
  padding: 10px 20px;
  color: var(--text-light);
  border-radius: 10px;
  font-size: 15px;
  text-transform: capitalize;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 200px;
`;

export function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
