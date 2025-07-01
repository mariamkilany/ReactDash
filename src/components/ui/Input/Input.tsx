import styled from "styled-components";
import type { InputProps } from "../../../types";

const StyledInput = styled.input`
  font-size: 16px;
  padding: 10px 0;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border);
  background-color: transparent;
  color: var(--text-light);
  outline: none;
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-bottom-color: var(--primary);
  }

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const Input = (props: InputProps) => {
  return <StyledInput {...props} />;
};
