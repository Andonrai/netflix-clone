# Netflix Clone

A full-stack Netflix-inspired streaming platform built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Drizzle ORM](https://orm.drizzle.team/), and [PostgreSQL](https://www.postgresql.org/). This project allows users to browse, watch, and favorite movies, featuring authentication (email/password and social login), a modern UI, and persistent user data.

## Features

- **User Authentication**: Email/password registration and login, plus OAuth with Google and GitHub.
- **Movie Catalog**: Browse a list of movies, view details, and watch trailers or full videos.
- **Favorites**: Add or remove movies from your personal favorites list.
- **Responsive UI**: Netflix-like interface, fully responsive for desktop and mobile.
- **Profile Selection**: Choose a user profile after login.
- **Protected Routes**: Only authenticated users can access main content.
- **Modern Stack**: Uses React Query for data fetching, Zustand for state management, and Drizzle ORM for database access.

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/) (App Router, SSR/CSR)
  - [React](https://react.dev/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [React Query](https://tanstack.com/query/latest) for data fetching/caching
  - [Zustand](https://zustand-demo.pmnd.rs/) for modal state
  - [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/) for icons

- **Backend**:
  - [Drizzle ORM](https://orm.drizzle.team/) for type-safe database access
  - [PostgreSQL](https://www.postgresql.org/) as the database
  - [Hono](https://hono.dev/) for API routing
  - [Better Auth](https://github.com/better-auth/better-auth) for authentication
  - [dotenv](https://www.npmjs.com/package/dotenv) for environment variables

- **Dev Tools**:
  - [TypeScript](https://www.typescriptlang.org/)
  - [ESLint](https://eslint.org/)
  - [Docker](https://www.docker.com/) for local PostgreSQL setup

## Project Structure

```
src/
  app/                # Next.js app directory (pages, layouts, routes)
  components/         # React UI components
  database/           # Drizzle ORM schema and database connection
  hooks/              # Custom React hooks (data fetching, modal state, etc.)
  lib/                # Auth client/server logic
  types/              # TypeScript types
public/               # Static assets (images, icons)
postgres-init/        # PostgreSQL initialization scripts
```

## Getting Started

### Prerequisites

- Node.js v18+
- Docker (for local PostgreSQL)
- npm / pnpm / yarn

### 1. Clone the repository

```sh
git clone https://github.com/Andonrai/netflix-clone.git
cd netflix-clone
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/netflix
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### 3. Run Database Migrations

```sh
npx drizzle-kit push
```

### 4. Install Dependencies

```sh
npm install
# or
yarn install
# or
pnpm install
```

### 5. Start the Development Server

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- Register or sign in with email/password, Google, or GitHub.
- Select your profile.
- Browse movies, watch trailers, and add/remove favorites.
- Click on a movie for more info or to play.

## Screenshots

> _Add screenshots here to showcase the UI._

## License

This project is for educational purposes only and is not affiliated with Netflix.

---

Inspired by Netflix. Built with ❤️ using Next.js, Drizzle ORM, and PostgreSQL.
```
