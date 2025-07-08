import React, { useMemo } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Flex, Avatar, Typography, Button } from 'antd';
import type { MenuProps } from 'antd';
import { COLORS } from '@/constants/theme';
import { UserProfileDropdownProps } from '@/types/layout';

const { Title, Text } = Typography;

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  session,
  onLogout,
  isMobile,
}) => {
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'profile-info',
        label: (
          <div style={{ padding: '12px 16px', minWidth: '220px' }}>
            <Flex gap="middle" align="center">
              <Avatar
                size={48}
                icon={<UserOutlined />}
                style={{ background: COLORS.secondaryGradient }}
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
      { type: 'divider' },
      {
        key: 'logout',
        label: (
          <Button danger icon={<LogoutOutlined />} onClick={onLogout} block>
            Sign Out
          </Button>
        ),
      },
    ],
    [session, onLogout],
  );

  return (
    <Dropdown
      menu={{ items }}
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
          style={{ background: COLORS.primaryGradient }}
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
  );
};

export default UserProfileDropdown;
