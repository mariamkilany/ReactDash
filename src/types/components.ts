import type { z } from "zod";
import type { loginSchema } from "../schemas/login";
import type { registerSchema } from "../schemas/register";
import type { ReactNode } from "react";
import type { LinkProps as ReactRouterLinkProps } from "react-router";

export type Position = "left" | "center" | "right";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// StatsCard
export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

// Table
export interface TableColumn<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  error?: Error | null;
  loadingMessage?: string;
  errorMessage?: string;
  className?: string;
}

// Loader
export interface LoaderProps {
  text?: string;
  size?: "small" | "medium" | "large";
}

// Navbar
export interface NavbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isMobile?: boolean;
}

// Link
export interface LinkProps extends ReactRouterLinkProps {
  children: ReactNode;
  className?: string;
}

// Input
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// Card
export type CardTitlePosition = "left" | "center" | "right";

// Button
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};
