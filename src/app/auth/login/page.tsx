'use client';

import { useEffect, useState } from 'react';
import { Input, Card, Typography, message } from 'antd';
import { Button } from '@shushila21/ui-library';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleLogin = async () => {
    if (!email || !password) {
      message.error('Please enter both email and password');
      return;
    }
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.ok) {
      router.push('/dashboard');
    } else {
      message.error('Invalid credentials');
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: '40px auto' }}>
      <Typography.Title level={3}>Login</Typography.Title>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Button onClick={handleLogin} loading={loading} style={{ width: '100%' }}>
        Login
      </Button>
    </Card>
  );
}
