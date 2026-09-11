-- Create trearddurbay_places table for local business directory
create table if not exists public.trearddurbay_places (
  id          bigint generated always as identity primary key,
  place_id    text not null,
  name        text not null,
  slug        text not null,
  address     text,
  phone       text,
  website     text,
  google_maps_url text,
  rating      numeric(2,1),
  review_count integer,
  category    text not null,
  lat         numeric(9,6),
  lng         numeric(9,6),
  updated_at  timestamptz not null default now(),
  unique(place_id)
);

-- Index for category lookups and dedup
create index if not exists trearddurbay_places_place_id_idx on public.trearddurbay_places(place_id);
create index if not exists trearddurbay_places_category_idx on public.trearddurbay_places(category);
create index if not exists trearddurbay_places_slug_idx on public.trearddurbay_places(slug);

-- Enable RLS
alter table public.trearddurbay_places enable row level security;

-- Public read access (directory is public)
create policy "Public read" on public.trearddurbay_places
  for select using (true);

-- Service role can do everything
create policy "Service write" on public.trearddurbay_places
  for all using (auth.role() = 'service_role');
