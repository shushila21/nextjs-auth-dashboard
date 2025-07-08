import { HEADER_HEIGHT } from '@/constants/layout';
import { COLORS, SHADOWS, BORDER } from '@/constants/theme';

export const headerStyles = (isMobile: boolean) => ({
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  width: '100%',
  padding: isMobile ? '0 16px' : '0 32px',
  height: `${HEADER_HEIGHT}px`,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderBottom: `1px solid ${BORDER.color}`,
  boxShadow: SHADOWS.medium,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const contentStyles = (isMobile: boolean) => ({
  marginTop: `${HEADER_HEIGHT}px`,
  padding: isMobile ? '16px' : '32px',
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  overflow: 'auto' as const,
});

export const brandTitleStyles = {
  margin: 0,
  background: COLORS.primaryGradient,
  WebkitBackgroundClip: 'text' as const,
  WebkitTextFillColor: 'transparent' as const,
  fontSize: '20px',
  fontWeight: 700,
  userSelect: 'none' as const,
};

export const menuButtonStyles = {
  width: '40px',
  height: '40px',
  borderRadius: BORDER.radius.medium,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: COLORS.textSecondary,
  background: 'rgba(248, 250, 252, 0.8)',
  border: `1px solid ${BORDER.color}`,
};
