# 🧩 Next.js Auth Dashboard

A modern full-stack web application starter built with:

- **Next.js 15**
- **NextAuth.js** with **JWT**
- **Ant Design** UI library
- **React Query** for data fetching and caching
- **Zustand** for global state management

---

## 🚀 Features

- 🔐 JWT-based authentication with [NextAuth.js](https://next-auth.js.org/)
- 🎨 UI powered by [Ant Design](https://ant.design/)
- ⚡ Server-side rendering and API routes with **Next.js**
- 📦 Efficient data fetching with [React Query](https://tanstack.com/query/latest)
- 🧠 State management using [Zustand](https://zustand-demo.pmnd.rs/)
- 📁 Clean and modular code structure

---

## 📦 Tech Stack

| Category           | Tool             |
|--------------------|------------------|
| Framework          | Next.js 15       |
| Authentication     | NextAuth.js (JWT)|
| UI Components      | Ant Design       |
| State Management   | Zustand          |
| Data Fetching      | React Query      |

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shushila21/nextjs-auth-dashboard.git
cd nextjs-auth-dashboard
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add:

```env
NEXTAUTH_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000
```

> 🔐 Replace the variables with your actual credentials.

---

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 📁 Project Structure

```
.
├── src
│   ├── app
│   │   ├── api
│   │   │   └── auth
│   │   │       └── [...nextauth]
│   │   │           └── route.ts
│   │   ├── auth
│   │   │   └── login
│   │   │       └── page.tsx
│   │   ├── (main)
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── users
│   │   │   │   └── page.tsx
│   │   │   ├── layoutStyles.ts
│   │   │   └── layout.tsx
│   │   ├── ClientProviders.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── BrandLogo
│   │   │   └── index.tsx
│   │   ├── charts
│   │   │   └── SampleChart.tsx
│   │   ├── MobileMenuDrawer
│   │   │   └── index.tsx
│   │   └── UserProfileDropdown
│   │       └── index.tsx
│   ├── constants
│   │   ├── dashboard.ts
│   │   ├── layout.ts
│   │   ├── theme.ts
│   │   └── users.ts
│   ├── hooks
│   │   ├── useAuthForm.ts
│   │   ├── useDebouncedSearch.ts
│   │   └── useFormHandler.ts
│   ├── lib
│   │   └── auth.ts
│   ├── types
│   │   └── layout.ts
│   ├── utils
│   │   └── validators.ts
│   └── middleware.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── prettier.config.js
├── README.md
└── tsconfig.json
```
