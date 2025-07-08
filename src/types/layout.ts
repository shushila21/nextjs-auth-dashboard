import type { Session } from 'next-auth';

export interface LayoutProps {
  children: React.ReactNode;
}

export interface BrandLogoProps {
  isMobile: boolean;
}

export interface UserProfileDropdownProps {
  session: Session | null;
  onLogout: () => void;
  isMobile: boolean;
}

export interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  session: Session | null;
  onLogout: () => void;
}

export type NavItem = {
  key: string;
  label: string;
  href: string;
};

export type NavItems = readonly NavItem[];
