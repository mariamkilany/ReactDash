import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 65px;
  gap: 0.5rem;
`;

export function InputGroup({ children }: { children: React.ReactNode }) {
  return <InputContainer>{children}</InputContainer>;
}
