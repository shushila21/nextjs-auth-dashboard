'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Form, Typography, App } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Card, Input } from '@shushila21/ui-library';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { notification, message } = App.useApp();

  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        notification.error({ message: 'Invalid credentials.' });
      } else if (result?.ok) {
        message.success('Login successful!');
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          border: '1px solid #e8e8e8',
        }}
      >
        <div style={{ marginBottom: '32px' }}>
          <Title
            level={2}
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#262626',
              marginBottom: '8px',
              textAlign: 'left',
            }}
          >
            Login
          </Title>
          <Text
            style={{
              color: '#8c8c8c',
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            Enter your email and password to login to your account
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label={
              <span
                style={{
                  color: '#262626',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Email
              </span>
            }
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
            style={{ marginBottom: '20px' }}
          >
            <Input
              placeholder="user@example.com"
              size="large"
              style={{
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    color: '#262626',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Password
                </span>
              </div>
            }
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '24px' }}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                borderRadius: '6px',
                fontSize: '14px',
              }}
            />
          </Form.Item>

          <Form.Item style={{ paddingTop: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              size="large"
              block
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        {/* Demo credentials info */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#f6f6f6',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <Text
            style={{
              color: '#666',
              fontSize: '12px',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            Demo Credentials:
          </Text>
          <Text
            style={{
              color: '#666',
              fontSize: '12px',
              display: 'block',
            }}
          >
            Email: admin@gmail.com
          </Text>
          <Text
            style={{
              color: '#666',
              fontSize: '12px',
              display: 'block',
            }}
          >
            Password: admin@123
          </Text>
        </div>
      </Card>
    </div>
  );
}
