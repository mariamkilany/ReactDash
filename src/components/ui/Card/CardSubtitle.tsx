import styled from "styled-components";
import type { Position } from "../../../types";

const CardSubTitleContainer = styled.div<{
  position: Position;
}>`
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-muted);
  margin-bottom: 10px;
  text-align: ${({ position }) => position};
`;

export function CardSubtitle({
  children,
  position = "left",
}: {
  children: React.ReactNode;
  position: Position;
}) {
  return (
    <CardSubTitleContainer position={position}>
      {children}
    </CardSubTitleContainer>
  );
}
