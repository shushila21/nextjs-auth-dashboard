'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const queryClient = new QueryClient();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>{children}</ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
