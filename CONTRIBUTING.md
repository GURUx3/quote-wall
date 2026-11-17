# Contributing to QuoteWall

Welcome! QuoteWall is made for learners, so questions and small first contributions are encouraged. You do not need to be an expert or know every tool before you start.

## What is a contribution?

You can help by fixing a bug, improving the wording in the documentation, making the interface clearer, or adding a small feature that fits the project. If you are new, documentation fixes are a great place to begin.

Before starting a large change, open an issue to describe your idea and ask whether it fits the project. For a small typo or clear bug fix, you can usually start directly.

## A few Git and GitHub words

- **Repository (repo):** the project files and their history.
- **Fork:** your own GitHub copy of the project.
- **Clone:** downloading a repo to your computer.
- **Branch:** a separate workspace for one change.
- **Commit:** a saved checkpoint with a short message.
- **Pull request (PR):** a request to review and add your branch's changes to the main project.

## 1. Prepare your computer

Install [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/). Check that they work:

```bash
git --version
node --version
npm --version
```

## 2. Fork and clone the project

1. Visit [QuoteWall on GitHub](https://github.com/Guru-09092004/quote-wall).
2. Select **Fork** to create your copy under your GitHub account.
3. Clone your fork. Replace `YOUR-GITHUB-NAME` with your GitHub username:

   ```bash
   git clone https://github.com/YOUR-GITHUB-NAME/quote-wall.git
   cd quote-wall
   ```

4. Tell Git where the original project lives:

   ```bash
   git remote add upstream https://github.com/Guru-09092004/quote-wall.git
   ```

The `origin` remote is your fork. The `upstream` remote is the original project.

## 3. Install and run QuoteWall

Install the project's packages:

```bash
npm install
```

To run the app locally, connect your own Supabase project by following **Connect Supabase** in the README. Copy `.env.example` to `.env` and add your project URL and anon/public key. Never use a `service_role` key in the app.

Start the development server:

```bash
npm run dev
```

Vite prints a local URL. Open it in your browser. Stop the server with `Ctrl+C`.

## 4. Create a branch

Start from the latest main branch, then create a short, descriptive branch for your change:

```bash
git switch main
git pull upstream main
git switch -c docs/clarify-setup
```

Use a prefix that describes the work, such as `docs/`, `fix/`, or `feature/`. Keep each branch focused on one change.

## 5. Make and check your change

Edit the files related to your change. Before saving a commit, check what changed:

```bash
git status
git diff
```

For code changes, run the production build:

```bash
npm run build
```

If you change behavior, explain how you tested it in your pull request. For documentation-only changes, read the rendered Markdown once to check headings, links, and commands.

### Protect your local settings

Your `.env` file contains local Supabase settings and must not go into a commit. Check that Git ignores it:

```bash
git check-ignore -v .env
```

If Git lists `.env` in `git status`, do not stage it. Never paste passwords or secret keys into an issue, pull request, or commit.

## 6. Stage and commit

Stage only the files for your change. For example:

```bash
git add README.md
```

Review exactly what will be committed:

```bash
git diff --cached
git status
```

Create a short commit message that describes the change:

```bash
git commit -m "docs: explain local setup"
```

Good commit messages say what the commit does, for example `fix: reject blank quotes` or `docs: explain how to open a pull request`.

## 7. Push your branch

The first time you push a branch, use:

```bash
git push -u origin docs/clarify-setup
```

Replace `docs/clarify-setup` with your branch name. GitHub may ask you to sign in or authorize Git Credential Manager. After the first push, `git push` is enough.

## 8. Open a pull request

1. Open your fork on GitHub. Select **Compare & pull request** (or **New pull request**).
2. Set the base repository to `Guru-09092004/quote-wall` and the base branch to `main`.
3. Set the compare branch to your fork and your work branch.
4. Write a clear title and describe:
   - What you changed.
   - Why you changed it.
   - How you tested it, or say if you did not run a test.
5. Select **Create pull request**.

Maintainers may ask questions or suggest a small change. That is a normal part of learning and review. Make requested changes on the same branch, commit them, and push again; the pull request updates automatically.

## 9. Update your fork later

After your pull request is merged, update your local `main` and your GitHub fork:

```bash
git switch main
git pull upstream main
git push origin main
```

Then create a new branch for your next contribution.

## Keep in mind

- Keep changes small and focused.
- Ask questions when something is unclear.
- Be kind and constructive in discussions and reviews.
- Do not commit `.env`, credentials, `node_modules`, or generated build output.
- QuoteWall is a learning project; clear code and helpful explanations are valued.
