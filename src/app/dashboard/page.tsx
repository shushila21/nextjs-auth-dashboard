'use client';

import { useRouter } from 'next/navigation';
import { Button, Card } from '@shushila21/ui-library';
import { Statistic, Row, Col } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { LogoutOutlined } from '@ant-design/icons';

const fetchAnalytics = async () => {
  return {
    totalUsers: 1245,
    activeUsers: 843,
    revenue: 12543,
    conversionRate: 3.2,
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/auth/login');
    },
  });

  const { data: analytics, isLoading: isAnalyticsLoading } = useQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: fetchAnalytics,
    enabled: status === 'authenticated', // don't fetch until session is ready
  });

  // show loading screen while auth is checking
  if (status === 'loading') {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => signOut({ callbackUrl: '/auth/login' })}>
          <LogoutOutlined />
          Logout
        </Button>
      </div>

      <p className="text-gray-600 mb-6">
        Welcome back,{' '}
        <span className="font-semibold">{session?.user?.name}</span>
      </p>

      <Row gutter={16}>
        <Col span={6}>
          <Card loading={isAnalyticsLoading}>
            <Statistic
              title="Total Users"
              value={analytics?.totalUsers}
              precision={0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isAnalyticsLoading}>
            <Statistic
              title="Active Users"
              value={analytics?.activeUsers}
              precision={0}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isAnalyticsLoading}>
            <Statistic
              title="Revenue"
              value={analytics?.revenue}
              precision={2}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={isAnalyticsLoading}>
            <Statistic
              title="Conversion Rate"
              value={analytics?.conversionRate}
              precision={1}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
