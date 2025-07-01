import styled from "styled-components";

const CardContainer = styled.div`
  max-width: 100%;
  /* width: 100%; */
  min-height: fit-content;
  background-color: var(--card-background);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 6px;
  }
`;
export function Card({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <CardContainer {...props}>{children}</CardContainer>;
}
