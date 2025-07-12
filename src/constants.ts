export const appName = "ReactDash";

// API Configuration
export const API_BASE_URL = "http://localhost:3000/api";
export const API_TIMEOUT = 10000;

// Authentication
export const TOKEN_EXPIRATION_TIME = 1 * 60 * 1000; // 1 minute in milliseconds
export const AUTH_TOKEN_KEY = "auth_token";
export const TOKEN_TIMESTAMP_KEY = "token_timestamp";

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Form Validation
export const MAX_PRODUCT_NAME_LENGTH = 100;
export const MAX_PRODUCT_DESCRIPTION_LENGTH = 500;
export const MIN_PRODUCT_PRICE = 0;

// UI Constants
export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

// Date Formats
export const DATE_FORMAT = "MMM dd, yyyy";
export const TIME_FORMAT = "HH:mm:ss";
export const DATETIME_FORMAT = "MMM dd, yyyy HH:mm:ss";

// Currency
export const DEFAULT_CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "Server error. Please try again later.",
} as const;
