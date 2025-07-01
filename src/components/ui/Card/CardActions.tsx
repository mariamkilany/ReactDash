import React from "react";
import styled from "styled-components";

const ActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px 20px;
`;

export function CardActions({ children }: { children: React.ReactNode }) {
  return <ActionsContainer>{children}</ActionsContainer>;
}
