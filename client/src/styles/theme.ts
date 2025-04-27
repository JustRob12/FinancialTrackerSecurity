export const theme = {
  colors: {
    primary: '#2E7D32', // Dark green
    secondary: '#4CAF50', // Medium green
    accent: '#81C784', // Light green
    background: '#F1F8E9', // Very light green background
    surface: '#FFFFFF',
    text: '#263238',
    textLight: '#546E7A',
    success: '#388E3C',
    error: '#D32F2F',
    white: '#FFFFFF',
    black: '#000000',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    round: 999,
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
  },
  fontWeights: {
    regular: 'normal' as const,
    medium: '500' as const,
    bold: 'bold' as const,
  },
};