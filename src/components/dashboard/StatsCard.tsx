import { Card, CardContent, CardTitle } from "../ui/Card";
import styled from "styled-components";
import type { StatsCardProps } from "../../types";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentWrapper = styled.div``;

const Title = styled(CardTitle)`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-light);
`;

const Trend = styled.div<{ isPositive: boolean }>`
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: ${(props) => (props.isPositive ? "var(--success)" : "var(--error")};
`;

const IconWrapper = styled.div`
  font-size: 1.875rem;
  color: var(--primary);
`;

export function StatsCard({
  title,
  value,
  icon,
  trend,
  className = "",
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardContent>
        <CardContainer>
          <ContentWrapper>
            <Title>{title}</Title>
            <Value>{value}</Value>
            {trend && (
              <Trend isPositive={trend.isPositive}>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </Trend>
            )}
          </ContentWrapper>
          <IconWrapper>{icon}</IconWrapper>
        </CardContainer>
      </CardContent>
    </Card>
  );
}
