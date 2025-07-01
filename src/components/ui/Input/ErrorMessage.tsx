import styled from "styled-components";

const StyledErrorMessage = styled.p`
  color: var(--error);
  font-size: 0.6rem;
  font-weight: 400;
`;

export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
}
