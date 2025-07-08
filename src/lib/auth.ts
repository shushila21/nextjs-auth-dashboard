import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';
import type { User, Session } from 'next-auth';

// Custom user object returned from `authorize`
interface ExtendedUser extends User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  refreshTokenExpires: number;
}

// Extend the token with custom fields
interface ExtendedToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  refreshTokenExpires?: number;
}

// Extend session user to include token fields
interface ExtendedSession extends Session {
  user: ExtendedToken;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@gmail.com' &&
          credentials.password === 'admin@123'
        ) {
          const accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 min
          const refreshTokenExpires = Date.now() + 1 * 24 * 60 * 60 * 1000; // 1 day

          const user: ExtendedUser = {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            accessTokenExpires,
            refreshTokenExpires,
          };

          return user;
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
    async jwt({ token, user }) {
      const u = user as ExtendedUser;

      // First login
      if (user) {
        token.accessToken = u.accessToken;
        token.refreshToken = u.refreshToken;
        token.accessTokenExpires = u.accessTokenExpires;
        token.refreshTokenExpires = u.refreshTokenExpires;
        return token;
      }

      // Access token still valid
      if (
        typeof token.accessTokenExpires === 'number' &&
        Date.now() < token.accessTokenExpires
      ) {
        return token;
      }

      // Access token expired but refresh token is still valid
      if (
        token.refreshToken &&
        typeof token.refreshTokenExpires === 'number' &&
        Date.now() < token.refreshTokenExpires
      ) {
        token.accessToken = 'mock-access-token-refreshed-' + Date.now();
        token.accessTokenExpires = Date.now() + 15 * 60 * 1000; // 15 min
        return token;
      }

      // Both expired — clear session
      return {} as ExtendedToken;
    },

    async session({ session, token }) {
      (session as ExtendedSession).user = token as ExtendedToken;
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
