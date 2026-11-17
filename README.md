# QuoteWall

QuoteWall is a small, open-source app for sharing quotes. Anyone can read the feed. Create an account to post a quote of up to 300 characters.

The project is intentionally simple: it is a place to learn React, TypeScript, Supabase, Git, and how to contribute to open source.

## What it uses

- React and TypeScript
- Vite
- Supabase Authentication and Postgres
- Plain CSS

## Run it on your computer

You need [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/).

```bash
git clone https://github.com/Guru-09092004/quote-wall.git
cd quote-wall
npm install
```

### Connect Supabase

1. Create a project at [Supabase](https://supabase.com/).
2. In your project's **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql). It creates the `quotes` table and the security policies that allow public reads and users to insert their own quotes.
3. Find your **Project URL** and **anon/public key** in the project API settings.
4. Copy `.env.example` to `.env` and add your values:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
   ```

5. In **Authentication → URL Configuration**, set the local site URL to `http://localhost:5173`. If email confirmation is enabled, new users need to confirm their email before logging in.

The anon/public key is intended for browser apps; Row Level Security protects the database. Never use a `service_role` or secret key in this app. Do not commit `.env` or share your project credentials.

### Start the app

```bash
npm run dev
```

Open the local address printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

## How it works

The quote form checks the text before submitting it. The app sends the quote, the signed-in user's ID, and their display name to Supabase. Row Level Security checks that the quote belongs to that user. The feed loads saved quotes newest first, so quotes remain after refreshing the page.

The `quotes` table has an `author_name` field so the public feed can show a name without exposing private authentication records.

## Project map

| File or folder | What it does |
| --- | --- |
| `src/App.tsx` | Connects authentication, quote loading, posting, and logout. |
| `src/components/Login.tsx` | Shows the login and registration forms. |
| `src/components/QuoteForm.tsx` | Validates and submits a quote. |
| `src/components/QuoteList.tsx` | Displays quotes, authors, and dates. |
| `src/lib/supabase.ts` | Creates the Supabase client from `.env` settings. |
| `src/index.css` | Styles the app. |
| `src/main.tsx` | Starts the React app. |
| `supabase/schema.sql` | Creates the table and Row Level Security policies. |
| `.env.example` | Lists the required environment variable names. |
| `package.json` | Lists dependencies and useful commands. |
| `CONTRIBUTING.md` | Explains how to make and submit a contribution. |



## Contributing

New contributors are welcome. You can improve the docs, fix a bug, or pick a beginner-friendly issue. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) for a step-by-step guide to forking, branching, committing, and opening a pull request.


Maintained by Guru-09092004.
