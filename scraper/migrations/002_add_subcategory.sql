alter table public.trearddurbay_places add column if not exists subcategory text;
create index if not exists trearddurbay_places_subcategory_idx on public.trearddurbay_places(subcategory);
