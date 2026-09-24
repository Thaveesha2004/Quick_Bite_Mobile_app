// Shared theme so every screen uses the same colours, spacing and font sizes.
export const colors = {
  primary: '#E85D04',
  primaryDark: '#C44D00',
  accent: '#FFBA08',
  background: '#FFF8F0',
  card: '#FFFFFF',
  text: '#1F1F1F',
  muted: '#6B6B6B',
  border: '#EADFD3',
  success: '#2E9E52',
  danger: '#D62828',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const font = { small: 13, body: 15, title: 20, heading: 26, hero: 38 };

export const formatPrice = (value) => `Rs. ${value.toFixed(2)}`;

// Breakpoints used for responsive layouts (phone vs tablet)
export const getColumns = (width) => (width >= 1024 ? 4 : width >= 700 ? 3 : 2);
