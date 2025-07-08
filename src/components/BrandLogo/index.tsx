import { COLORS, SHADOWS } from '@/constants/theme';
import { BrandLogoProps } from '@/types/layout';
import React from 'react';

const BrandLogo: React.FC<BrandLogoProps> = ({ isMobile }) => {
  const size = isMobile ? 32 : 40;
  const iconSize = isMobile ? 20 : 24;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '12px',
        background: COLORS.primaryGradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: SHADOWS.brand,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="white">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
  );
};

export default BrandLogo;
