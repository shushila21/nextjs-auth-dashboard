'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  Layout,
  Menu,
  theme as antdTheme,
  Typography,
  Flex,
  Button,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  headerStyles,
  contentStyles,
  brandTitleStyles,
  menuButtonStyles,
} from './layoutStyles';
import BrandLogo from '@/components/BrandLogo';
import UserProfileDropdown from '@/components/UserProfileDropdown';
import MobileMenuDrawer from '@/components/MobileMenuDrawer';
import { LayoutProps } from '@/types/layout';
import { MOBILE_BREAKPOINT, NAV_ITEMS } from '@/constants/layout';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = useCallback(() => {
    signOut();
    router.push('/auth/login');
  }, [router]);

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        label: <Link href={item.href}>{item.label}</Link>,
      })),
    [],
  );

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header style={headerStyles(isMobile)}>
        <Flex align="center" gap="small">
          <BrandLogo isMobile={isMobile} />
          {!isMobile && (
            <Title level={4} style={brandTitleStyles}>
              Auth App
            </Title>
          )}
        </Flex>

        {!isMobile && (
          <Flex align="center" gap="large">
            <Menu
              mode="horizontal"
              selectedKeys={[pathname]}
              items={navItems}
              style={{
                borderBottom: 'none',
                background: 'transparent',
                fontSize: '14px',
                fontWeight: 500,
                marginLeft: '32px',
                minWidth: '300px',
              }}
              className="modern-menu"
            />
          </Flex>
        )}

        <Flex align="center" gap={isMobile ? 'small' : 'medium'}>
          {isMobile ? (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setIsMobileMenuOpen(true)}
              style={menuButtonStyles}
            />
          ) : (
            <UserProfileDropdown
              session={session}
              onLogout={handleLogout}
              isMobile={isMobile}
            />
          )}
        </Flex>
      </Header>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
        session={session}
        onLogout={handleLogout}
      />

      <Content style={contentStyles(isMobile)}>{children}</Content>
    </Layout>
  );
}
