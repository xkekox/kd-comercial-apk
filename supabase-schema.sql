create table if not exists public.kd_records (
  id text primary key,
  payload jsonb,
  updated_at timestamptz not null default timezone('utc', now()),
  deleted boolean not null default false
);

alter table public.kd_records enable row level security;

drop policy if exists "kd_records_select_anon" on public.kd_records;
create policy "kd_records_select_anon"
on public.kd_records
for select
to anon
using (true);

drop policy if exists "kd_records_insert_anon" on public.kd_records;
create policy "kd_records_insert_anon"
on public.kd_records
for insert
to anon
with check (true);

drop policy if exists "kd_records_update_anon" on public.kd_records;
create policy "kd_records_update_anon"
on public.kd_records
for update
to anon
using (true)
with check (true);

create index if not exists kd_records_updated_at_idx
on public.kd_records (updated_at desc);
