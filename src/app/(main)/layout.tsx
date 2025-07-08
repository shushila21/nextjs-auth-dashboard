'use client';

import type React from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Typography, Avatar, Flex, Dropdown } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

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
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();
    router.push('/auth/login');
  };

  // dropdown items for the user profile dropdown
  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile-info',
      label: (
        <div style={{ padding: '12px 0', minWidth: '220px' }}>
          <Flex gap="middle" align="center">
            <Avatar
              size={48}
              icon={<UserOutlined />}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              }}
            />
            <Flex vertical>
              <Text strong style={{ fontSize: '14px', color: '#262626' }}>
                {session?.user?.name || 'Admin User'}
              </Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {session?.user?.email || 'admin@example.com'}
              </Text>
              <Text
                style={{
                  fontSize: '11px',
                  color: '#52c41a',
                  fontWeight: 500,
                }}
              >
                ● Online
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
      key: 'profile',
      icon: <UserOutlined />,
      label: 'View Profile',
      onClick: () => router.push('#'),
    },
    {
      key: 'settings',
      icon: <UserOutlined />,
      label: 'Account Settings',
      onClick: () => router.push('#'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: handleLogout,
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
          padding: '0 32px',
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
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <Title
            level={4}
            style={{
              margin: 0,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '20px',
              fontWeight: 700,
              userSelect: 'none',
            }}
          >
            Auth App
          </Title>
        </Flex>

        {/* Navigation Menu */}
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

        {/* Right Side: Profile */}
        <Flex align="center" gap="medium">
          {/* Profile Dropdown */}
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
                gap: '8px',
                padding: '6px 12px',
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
                size={32}
                icon={<UserOutlined />}
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        </Flex>
      </Header>

      {/* content */}
      <Content
        style={{
          marginTop: '72px',
          padding: '32px',
          minHeight: 'calc(100vh - 72px)',
          overflow: 'auto',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
