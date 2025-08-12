/**
 * ServNow App Color Palette
 * Primary: #B9FF66 (Lime Green)
 * Dark: #191A23 (Dark Navy)
 * Light: #F3F3F3 (Light Gray)
 */

const primaryColor = '#B9FF66';
const darkColor = '#191A23';
const lightColor = '#F3F3F3';

export const Colors = {
  light: {
    text: darkColor,
    background: '#FFFFFF',
    tint: primaryColor,
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: primaryColor,
    card: '#FFFFFF',
    border: '#E5E5E5',
    accent: lightColor,
    primary: primaryColor,
    dark: darkColor,
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  dark: {
    text: '#FFFFFF',
    background: darkColor,
    tint: primaryColor,
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: primaryColor,
    card: '#2A2B35',
    border: '#374151',
    accent: '#374151',
    primary: primaryColor,
    dark: darkColor,
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
};
