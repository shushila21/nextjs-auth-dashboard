'use client';

import type React from 'react';
import {
  LogoutOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Layout,
  Menu,
  theme as antdTheme,
  Typography,
  Avatar,
  Flex,
  Dropdown,
  Button,
  Drawer,
} from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { MenuItemType } from 'antd/es/menu/interface';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const navItems: MenuProps['items'] = [
  {
    key: '/dashboard',
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: '/users',
    label: <Link href="/users">Users</Link>,
  },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = antdTheme.useToken();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Define items for the user profile dropdown
  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile-info',
      label: (
        <div style={{ padding: '12px 16px', minWidth: '220px' }}>
          <Flex gap="middle" align="center">
            <Avatar
              size={48}
              icon={<UserOutlined />}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            />
            <Flex vertical>
              <Text strong>{session?.user?.name || 'Admin User'}</Text>
              <Text type="secondary">
                {session?.user?.email || 'admin@example.com'}
              </Text>
            </Flex>
          </Flex>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <Button danger icon={<LogoutOutlined />} onClick={handleLogout} block>
          Sign Out
        </Button>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: '100%',
          padding: isMobile ? '0 16px' : '0 32px',
          height: '72px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Side: Logo and Brand */}
        <Flex align="center" gap="small">
          <div
            style={{
              width: isMobile ? '32px' : '40px',
              height: isMobile ? '32px' : '40px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg, #667eea 0%,rgb(28, 44, 161) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            }}
          >
            <svg
              width={isMobile ? '20' : '24'}
              height={isMobile ? '20' : '24'}
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          {!isMobile && (
            <Title
              level={4}
              style={{
                margin: 0,
                background:
                  'linear-gradient(135deg, #667eea 0%,rgb(28, 44, 161) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '20px',
                fontWeight: 700,
                userSelect: 'none',
              }}
            >
              Auth App
            </Title>
          )}
        </Flex>

        {/* Desktop Navigation Menu */}
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

        {/* Right Side: Mobile Menu Button + Profile */}
        <Flex align="center" gap={isMobile ? 'small' : 'medium'}>
          {/* Mobile Menu Button */}
          {isMobile ? (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setIsMobileMenuOpen(true)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                background: 'rgba(248, 250, 252, 0.8)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            />
          ) : (
            //  Profile Dropdown
            <Dropdown
              menu={{ items: dropdownItems }}
              trigger={['click']}
              placement="bottomRight"
              overlayStyle={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '4px' : '8px',
                  padding: isMobile ? '4px 8px' : '6px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: 'rgba(248, 250, 252, 0.8)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 250, 252, 1)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(248, 250, 252, 0.8)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Avatar
                  size={isMobile ? 28 : 32}
                  icon={<UserOutlined />}
                  style={{
                    background:
                      'linear-gradient(135deg, #667eea 0%,rgb(28, 44, 161) 100%)',
                  }}
                />
                <Flex vertical style={{ lineHeight: 1 }}>
                  <Text
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#1e293b',
                    }}
                  >
                    {session?.user?.name?.split(' ')[0] || 'Admin'}
                  </Text>
                </Flex>
              </div>
            </Dropdown>
          )}
        </Flex>
      </Header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <Flex align="center" gap="small">
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background:
                  'linear-gradient(135deg, #667eea 0%,rgb(28, 44, 161) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <Text strong style={{ fontSize: '16px' }}>
              Auth App
            </Text>
          </Flex>
        }
        placement="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
        width={280}
        styles={{
          body: {
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
          header: { borderBottom: '1px solid #f0f0f0' },
        }}
        closable={false}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ marginLeft: 0, marginRight: 'auto' }}
          />
        }
      >
        <Menu
          mode="vertical"
          selectedKeys={[pathname]}
          items={
            navItems.map((item) => ({
              ...item,
              onClick: () => setIsMobileMenuOpen(false),
            })) as MenuItemType[]
          }
          style={{
            border: 'none',
            fontSize: '16px',
            fontWeight: 500,
          }}
        />
        {/*  User Info */}
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #f0f0f0',
            marginTop: 'auto',
          }}
        >
          <Flex gap="middle" align="center" style={{ marginBottom: '16px' }}>
            <Avatar
              size={48}
              icon={<UserOutlined />}
              style={{
                background:
                  'linear-gradient(135deg, #667eea 0%,rgb(28, 44, 161) 100%)',
              }}
            />
            <Flex vertical>
              <Text strong style={{ fontSize: '14px' }}>
                {session?.user?.name || 'Admin User'}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {session?.user?.email || 'admin@example.com'}
              </Text>
            </Flex>
          </Flex>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={() => {
              setIsMobileMenuOpen(false);
              handleLogout();
            }}
            block
          >
            Sign Out
          </Button>
        </div>
      </Drawer>

      <Content
        style={{
          marginTop: '72px',
          padding: isMobile ? '16px' : '32px',
          minHeight: 'calc(100vh - 72px)',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            padding: '32px',
            minHeight: '100%',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
