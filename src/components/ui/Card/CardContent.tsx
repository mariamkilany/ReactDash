import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
`;

export function CardContent({ children }: { children: React.ReactNode }) {
  return <ContentContainer>{children}</ContentContainer>;
}
