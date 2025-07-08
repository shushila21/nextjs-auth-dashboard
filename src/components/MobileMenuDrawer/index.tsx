import React, { useMemo } from 'react';
import { Drawer, Menu, Flex, Avatar, Typography, Button } from 'antd';
import { CloseOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { MobileMenuDrawerProps } from '@/types/layout';
import { NAV_ITEMS } from '@/constants/layout';
import { COLORS } from '@/constants/theme';
import BrandLogo from '../BrandLogo';

const { Text } = Typography;

const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  pathname,
  session,
  onLogout,
}) => {
  const navItemsWithClose = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        label: <Link href={item.href}>{item.label}</Link>,
        onClick: onClose,
      })),
    [onClose],
  );

  return (
    <Drawer
      title={
        <Flex align="center" gap="small">
          <BrandLogo isMobile={true} />
          <Text strong style={{ fontSize: '16px' }}>
            Auth App
          </Text>
        </Flex>
      }
      placement="right"
      onClose={onClose}
      open={isOpen}
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
          onClick={onClose}
          style={{ marginLeft: 0, marginRight: 'auto' }}
        />
      }
    >
      <Menu
        mode="vertical"
        selectedKeys={[pathname]}
        items={navItemsWithClose}
        style={{
          border: 'none',
          fontSize: '16px',
          fontWeight: 500,
        }}
      />
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
            style={{ background: COLORS.primaryGradient }}
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
            onClose();
            onLogout();
          }}
          block
        >
          Sign Out
        </Button>
      </div>
    </Drawer>
  );
};

export default MobileMenuDrawer;
