'use client';

import React from 'react';
import {
  Avatar,
  Card,
  Col,
  Layout,
  List,
  Progress,
  Row,
  Spin,
  Statistic,
} from 'antd';
import {
  UserOutlined,
  ProjectOutlined,
  DollarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import SampleChart from '@/components/charts/SampleChart';
import { useQuery } from '@tanstack/react-query';
import { dashboardData } from '@/constants/dashboard';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const fetchDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return dashboardData;
};

export default function DashboardPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/auth/login');
    },
  });

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  });

  if (status === 'loading' || isLoading) {
    return (
      <Layout
        style={{
          background: 'inherit',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={dashboardData?.stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={dashboardData?.stats.activeProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={dashboardData?.stats.revenue}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Growth"
              value={dashboardData?.stats.growth}
              suffix="%"
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Users">
            <List
              itemLayout="horizontal"
              dataSource={dashboardData?.recentUsers}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={user.name}
                    description={user.email}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Project Progress">
            <div style={{ padding: '0 16px' }}>
              {dashboardData?.projectProgress.map((project, index) => (
                <div key={index} style={{ marginBottom: 24 }}>
                  <div style={{ marginBottom: 8, fontWeight: 500 }}>
                    {project.name}
                  </div>
                  <Progress percent={project.progress} />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="User Growth Over Time">
            <SampleChart />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
