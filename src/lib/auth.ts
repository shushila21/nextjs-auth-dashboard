import NextAuth, { type NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  refreshTokenExpires: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@gmail.com' &&
          credentials.password === 'admin@123'
        ) {
          const accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
          const refreshTokenExpires = Date.now() + 1 * 24 * 60 * 60 * 1000; // 1 day
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            accessTokenExpires,
            refreshTokenExpires,
          };
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, // 1 day
  },

  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      // first login
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.accessTokenExpires = (user as any).accessTokenExpires;
        token.refreshTokenExpires = (user as any).refreshTokenExpires;
        return token;
      }

      // access token still valid
      if (
        typeof token.accessTokenExpires === 'number' &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      // access token expired, refresh
      if (
        token.refreshToken &&
        typeof token.refreshTokenExpires === 'number' &&
        Date.now() < token.refreshTokenExpires
      ) {
        // simulate refreshing access token
        token.accessToken = 'mock-access-token-refreshed-' + Date.now();
        token.accessTokenExpires = Date.now() + 30 * 1000;
        return token;
      }

      // both tokens expired
      return {}; // Returning empty object ends session on frontend
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
