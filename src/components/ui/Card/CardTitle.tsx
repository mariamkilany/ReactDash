import styled from "styled-components";
import type { CardTitlePosition } from "../../../types";

const CardTitleContainer = styled.div<{
  position: CardTitlePosition;
}>`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  text-align: ${({ position }) => position};
`;

export function CardTitle({
  children,
  position = "left",
  ...props
}: {
  children: React.ReactNode;
  position?: CardTitlePosition;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <CardTitleContainer {...props} position={position}>
      {children}
    </CardTitleContainer>
  );
}
