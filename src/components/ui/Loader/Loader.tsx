import styled, { keyframes } from "styled-components";
import type { LoaderProps } from "../../../types";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-light);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoaderText = styled.p`
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
`;

export function Loader({ text = "Loading...", size = "medium" }: LoaderProps) {
  const spinnerSize = {
    small: "24px",
    medium: "40px",
    large: "60px",
  };

  return (
    <LoaderContainer>
      <div style={{ textAlign: "center" }}>
        <Spinner
          style={{ width: spinnerSize[size], height: spinnerSize[size] }}
        />
        {text && <LoaderText>{text}</LoaderText>}
      </div>
    </LoaderContainer>
  );
}
