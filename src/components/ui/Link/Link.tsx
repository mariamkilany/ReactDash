import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";
import type { LinkProps } from "../../../types";

const StyledLink = styled(ReactLink)`
  color: var(--link);
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
    opacity: 0.5;
  }
`;

export function Link({ to, children, className, ...props }: LinkProps) {
  return (
    <StyledLink to={to} className={className} {...props}>
      {children}
    </StyledLink>
  );
}
