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
  Tag,
  Divider,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/stores/usersStore';
import { Line } from '@ant-design/charts';

export default function DashboardPage() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push('/auth/login');
    },
  });

  const { users } = useUserStore();

  // Calculate dashboard metrics
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.isActive).length;
  const maleUsers = users.filter((user) => user.gender === 'male').length;
  const femaleUsers = users.filter((user) => user.gender === 'female').length;

  const recentUsers = users.slice(0, 5);

  // Role distribution
  const roleDistribution = users.reduce<Record<string, number>>((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  // Salary data for chart
  const salaryData = users.map((user) => ({
    name: user.name,
    salary: user.salary,
  }));

  if (status === 'loading') {
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
    <Layout style={{ background: 'inherit' }}>
      <Row gutter={[24, 24]}>
        {/* Statistic Cards */}
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={activeUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Male Users"
              value={maleUsers}
              prefix={<ManOutlined />}
              valueStyle={{ color: '#096dd9' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Female Users"
              value={femaleUsers}
              prefix={<WomanOutlined />}
              valueStyle={{ color: '#d48806' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {/* Recent Users */}
        <Col xs={24} lg={12}>
          <Card
            title="Recent Users"
            extra={<Tag color="blue">Last {recentUsers.length} added</Tag>}
            style={{ height: '100%' }}
          >
            <div
              style={{ maxHeight: 300, overflowY: 'auto' }}
              className="scrollbar"
            >
              <List
                itemLayout="horizontal"
                dataSource={recentUsers}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={
                        <>
                          {user.name}
                          <Tag
                            color={user.isActive ? 'green' : 'red'}
                            style={{ marginLeft: 8 }}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </Tag>
                        </>
                      }
                      description={
                        <>
                          {user.email}
                          <Divider type="vertical" />
                          {user.role}
                          <Divider type="vertical" />$
                          {user.salary.toLocaleString()}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>

        {/* Role Distribution */}
        <Col xs={24} lg={12}>
          <Card title="Role Distribution" style={{ height: '100%' }}>
            <div style={{ padding: '0 16px' }}>
              {Object.entries(roleDistribution).map(([role, count]) => (
                <div key={role} style={{ marginBottom: 24 }}>
                  <div style={{ marginBottom: 8, fontWeight: 500 }}>
                    {role} <Tag>{count} users</Tag>
                  </div>
                  <Progress
                    percent={Math.round((count / users.length) * 100)}
                    status="active"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="Salary Distribution by Role">
            <Line
              data={salaryData}
              xField="name"
              yField="salary"
              seriesField="role"
              point={{
                shape: 'circle',
                size: 4,
              }}
              interactions={[
                {
                  type: 'element-active',
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}
