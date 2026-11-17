create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  content text not null check (
    char_length(trim(content)) between 1 and 300
  ),
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null check (char_length(trim(author_name)) > 0),
  created_at timestamptz not null default now()
);

alter table public.quotes enable row level security;

grant select on table public.quotes to anon, authenticated;
grant insert on table public.quotes to authenticated;

drop policy if exists "Anyone can read quotes" on public.quotes;
create policy "Anyone can read quotes"
  on public.quotes
  for select
  using (true);

drop policy if exists "Users can insert their own quotes" on public.quotes;
create policy "Users can insert their own quotes"
  on public.quotes
  for insert
  to authenticated
  with check (auth.uid() = user_id);
