import React from "react";
import styled from "styled-components";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div<{ $width?: string }>`
  background: var(--primary-dark);
  padding: 24px;
  border-radius: 8px;
  min-width: 320px;
  width: ${({ $width }) => $width || "auto"};
  max-width: 90vw;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

export function Modal({ open, onClose, children, title, width }: ModalProps) {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent $width={width} onClick={(e) => e.stopPropagation()}>
        {title && <ModalTitle>{title}</ModalTitle>}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
}
