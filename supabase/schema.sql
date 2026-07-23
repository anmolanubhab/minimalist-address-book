-- Create dashboar_47531c_contacts table
create table if not exists public.dashboar_47531c_contacts (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    phone text not null,
    created_at timestamptz not null default now(),
    is_favorite boolean not null default false
);

-- Enable Row Level Security
alter table public.dashboar_47531c_contacts enable row level security;

-- Create permissive policies for anonymous/authenticated access
drop policy if exists "Allow public read access" on public.dashboar_47531c_contacts;
create policy "Allow public read access" on public.dashboar_47531c_contacts for select using (true);
drop policy if exists "Allow public insert access" on public.dashboar_47531c_contacts;
create policy "Allow public insert access" on public.dashboar_47531c_contacts for insert with check (true);
drop policy if exists "Allow public update access" on public.dashboar_47531c_contacts;
create policy "Allow public update access" on public.dashboar_47531c_contacts for update using (true);
drop policy if exists "Allow public delete access" on public.dashboar_47531c_contacts;
create policy "Allow public delete access" on public.dashboar_47531c_contacts for delete using (true);

-- WebdevsAI safety net: RLS is always forced on.
alter table if exists public."dashboar_47531c_contacts" enable row level security;
