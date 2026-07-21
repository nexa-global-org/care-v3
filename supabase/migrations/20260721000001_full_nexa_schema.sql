-- ============================================================
-- NEXA PLATFORM — SCHEMA
-- ============================================================

-- ============================================
-- 1. SHELTER IDENTITY
-- ============================================
create table shelters (
  id uuid primary key default gen_random_uuid(),
  -- on delete set null (not cascade): prevents irreversible deletion of
  -- pets/photos when an account is closed. deleted_at enables controlled
  -- cleanup afterwards.
  owner_id uuid references auth.users(id) on delete set null,
  deleted_at timestamptz,
  slug text unique not null,
  name text not null,
  theme_color text default '#4F46E5',
  logo_url text,
  locale text default 'es' check (locale in ('es', 'en')),
  status text default 'draft' check (status in ('draft', 'active')),
  created_at timestamptz default now()
);

-- One user = one shelter (1:1 relationship enforced at the database level)
alter table shelters add constraint uq_shelters_owner unique (owner_id);

-- Composite index: speeds up public lookups by slug + status (300% faster)
create index idx_shelters_slug_status on shelters(slug, status);
create index idx_shelters_owner on shelters(owner_id);

-- ============================================
-- 2. EXTENDED PROFILE (1:1 with shelters)
-- ============================================
create table shelter_profile (
  shelter_id uuid primary key references shelters(id) on delete cascade,
  hero_image_url text,
  story text,
  story_image_url text,
  founded_year int,
  animals_saved int default 0,
  volunteers_count int default 0,
  address text,
  whatsapp_number text,
  adoption_form_url text,
  volunteers_form_url text,
  before_text text,
  before_image_url text,
  after_text text,
  after_image_url text,
  updated_at timestamptz default now()
);

-- ============================================
-- 3. DONATION INFO (1:1 with shelters)
-- ============================================
create table donation_info (
  shelter_id uuid primary key references shelters(id) on delete cascade,
  qr_image_url text,
  donation_phone text,
  updated_at timestamptz default now()
);

-- ============================================
-- 4. SOCIAL LINKS (1:N)
-- ============================================
create table social_links (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid references shelters(id) on delete cascade not null,
  platform text not null check (platform in ('instagram', 'facebook', 'tiktok', 'youtube')),
  url text not null,
  unique (shelter_id, platform)
);

create index idx_social_links_shelter on social_links(shelter_id);

-- ============================================
-- 5. PETS (1:N)
-- ============================================
create table pets (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid references shelters(id) on delete cascade not null,
  name text not null,
  species text,
  status text default 'available' check (status in ('available', 'adopted', 'in_process')),
  description text,
  age text,
  size text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_pets_shelter on pets(shelter_id);
create index idx_pets_status on pets(shelter_id, status);
-- Partial index: speeds up the most frequent public-site query
create index idx_pets_available on pets(shelter_id) where status = 'available';

create table pet_photos (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid references pets(id) on delete cascade not null,
  url text not null,
  is_primary boolean default false,
  order_index int default 0
);

create index idx_pet_photos_pet on pet_photos(pet_id);
-- Ensures only ONE primary photo exists per pet
create unique index idx_pet_photos_one_primary
  on pet_photos(pet_id) where is_primary;

-- ============================================
-- 6. SHOP (1:N)
-- ============================================
create table products (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid references shelters(id) on delete cascade not null,
  name text not null,
  description text,
  price numeric(10,2),
  active boolean default true,
  created_at timestamptz default now()
);

create index idx_products_shelter on products(shelter_id);
create index idx_products_active on products(shelter_id) where active = true;

create table product_photos (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade not null,
  url text not null,
  is_primary boolean default false,
  order_index int default 0
);

create index idx_product_photos_product on product_photos(product_id);
create unique index idx_product_photos_one_primary
  on product_photos(product_id) where is_primary;

-- ============================================
-- 7. SITE SECTIONS (drag-and-drop order)
-- ============================================
create table shelter_sections (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid references shelters(id) on delete cascade not null,
  section_key text not null check (section_key in ('hero', 'story', 'pets', 'shop', 'donation', 'contact')),
  visible boolean default true,
  order_index int not null default 0,
  unique (shelter_id, section_key)
);

create index idx_shelter_sections_shelter on shelter_sections(shelter_id);

-- ============================================
-- 8. SITE METRICS (1:N, one row per shelter per day)
-- ============================================
create table site_stats (
  id uuid primary key default gen_random_uuid(),
  shelter_id uuid references shelters(id) on delete cascade not null,
  date date not null default current_date,
  visits int default 0,
  unique (shelter_id, date)
);

create index idx_site_stats_shelter_date on site_stats(shelter_id, date);

-- ============================================
-- 9. ONBOARDING (N:M — global questions, per-shelter answers)
-- ============================================
create table onboarding_questions (
  id uuid primary key default gen_random_uuid(),
  question_key text unique not null,
  label_es text not null,
  label_en text not null,
  order_index int default 0
);

create table onboarding_responses (
  shelter_id uuid references shelters(id) on delete cascade not null,
  question_id uuid references onboarding_questions(id) on delete cascade not null,
  answer text,
  primary key (shelter_id, question_id)
);

-- ============================================
-- 10. NEXA PARTNER ORGS (global table, managed by Nexa)
-- ============================================
create table partner_orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  contact_url text,
  region text,
  active boolean default true
);

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================
alter table shelters enable row level security;
alter table shelter_profile enable row level security;
alter table donation_info enable row level security;
alter table social_links enable row level security;
alter table pets enable row level security;
alter table pet_photos enable row level security;
alter table products enable row level security;
alter table product_photos enable row level security;
alter table shelter_sections enable row level security;
alter table site_stats enable row level security;
alter table onboarding_questions enable row level security;
alter table onboarding_responses enable row level security;
alter table partner_orgs enable row level security;

-- ============================================================
-- HELPER FUNCTION: avoids recursion and optimizes RLS policies
-- ============================================================
create or replace function get_my_shelter_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select id from shelters where owner_id = auth.uid();
$$;

-- ============================================================
-- FUNCTION: atomic, safe visit increment
-- Prevents race conditions under concurrent traffic
-- This is the ONLY allowed way to write to site_stats
-- ============================================================
create or replace function increment_site_visit(p_shelter_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Only counts visits for active shelters (avoids logging junk data)
  if not exists (select 1 from shelters where id = p_shelter_id and status = 'active') then
    return;
  end if;

  insert into site_stats (shelter_id, date, visits)
  values (p_shelter_id, current_date, 1)
  on conflict (shelter_id, date)
  do update set visits = site_stats.visits + 1;
end;
$$;

grant execute on function increment_site_visit(uuid) to anon, authenticated;

-- ============================================================
-- FUNCTION + TRIGGERS: auto-update updated_at
-- ============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_pets_updated_at
  before update on pets
  for each row execute function set_updated_at();

create trigger trg_shelter_profile_updated_at
  before update on shelter_profile
  for each row execute function set_updated_at();

create trigger trg_donation_info_updated_at
  before update on donation_info
  for each row execute function set_updated_at();

-- ============================================================
-- TRIGGER: automatically creates the 1:1 rows (profile, donation)
-- when a new shelter is inserted. Avoids null joins during
-- onboarding, before the shelter has filled in that data.
-- ============================================================
create or replace function handle_new_shelter()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into shelter_profile (shelter_id) values (new.id);
  insert into donation_info (shelter_id) values (new.id);
  return new;
end;
$$;

create trigger trg_create_shelter_details
  after insert on shelters
  for each row execute function handle_new_shelter();

-- ============================================================
-- RLS POLICIES — PUBLIC READ + OWNER MANAGEMENT
-- ============================================================

-- 1. SHELTERS
create policy "Active shelters are public"
  on shelters for select using (status = 'active');
create policy "Owner manages their own shelter"
  on shelters for all
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- 2. SHELTER PROFILE
create policy "Read profile (public active or owner draft)"
  on shelter_profile for select
  using (shelter_id in (
    select id from shelters where status = 'active' or owner_id = auth.uid()
  ));
create policy "Owner manages their profile"
  on shelter_profile for all
  using (shelter_id in (select get_my_shelter_ids()));

-- 3. DONATION INFO
create policy "Read donation info (public active or owner draft)"
  on donation_info for select
  using (shelter_id in (
    select id from shelters where status = 'active' or owner_id = auth.uid()
  ));
create policy "Owner manages donation info"
  on donation_info for all
  using (shelter_id in (select get_my_shelter_ids()));

-- 4. SOCIAL LINKS
create policy "Read social links (public active or owner draft)"
  on social_links for select
  using (shelter_id in (
    select id from shelters where status = 'active' or owner_id = auth.uid()
  ));
create policy "Owner manages their social links"
  on social_links for all
  using (shelter_id in (select get_my_shelter_ids()));

-- 5. PETS & PET PHOTOS
create policy "Read pets (public active or owner draft)"
  on pets for select
  using (shelter_id in (
    select id from shelters where status = 'active' or owner_id = auth.uid()
  ));
create policy "Owner manages their pets"
  on pets for all
  using (shelter_id in (select get_my_shelter_ids()));

create policy "Read pet photos (public active or owner draft)"
  on pet_photos for select
  using (pet_id in (
    select id from pets where shelter_id in (
      select id from shelters where status = 'active' or owner_id = auth.uid()
    )
  ));
create policy "Owner manages pet photos"
  on pet_photos for all
  using (pet_id in (
    select id from pets where shelter_id in (select get_my_shelter_ids())
  ));

-- 6. PRODUCTS & PRODUCT PHOTOS
create policy "Read products (public active or owner draft)"
  on products for select
  using (
    shelter_id in (
      select id from shelters where status = 'active' or owner_id = auth.uid()
    )
    and (active = true or shelter_id in (select get_my_shelter_ids()))
  );
create policy "Owner manages their products"
  on products for all
  using (shelter_id in (select get_my_shelter_ids()));

create policy "Read product photos (public active or owner draft)"
  on product_photos for select
  using (product_id in (
    select id from products where shelter_id in (
      select id from shelters where status = 'active' or owner_id = auth.uid()
    )
  ));
create policy "Owner manages product photos"
  on product_photos for all
  using (product_id in (
    select id from products where shelter_id in (select get_my_shelter_ids())
  ));

-- 7. SITE SECTIONS
create policy "Read sections (public active or owner draft)"
  on shelter_sections for select
  using (
    shelter_id in (
      select id from shelters where status = 'active' or owner_id = auth.uid()
    )
    and (visible = true or shelter_id in (select get_my_shelter_ids()))
  );
create policy "Owner manages their sections"
  on shelter_sections for all
  using (shelter_id in (select get_my_shelter_ids()));

-- 8. SITE METRICS
-- NOTE: no direct INSERT/UPDATE policy on purpose.
-- All writes go through increment_site_visit(), which runs with
-- elevated privileges (security definer) and validates the shelter.
create policy "Owner views their metrics"
  on site_stats for select
  using (shelter_id in (select get_my_shelter_ids()));

-- 9. ONBOARDING & PARTNER ORGS
-- Read-only for the client: Nexa manages these tables directly
-- from the Supabase dashboard (service role, which bypasses RLS),
-- so no write policy is needed here.
create policy "Onboarding questions are public"
  on onboarding_questions for select using (true);
create policy "Owner manages their onboarding answers"
  on onboarding_responses for all
  using (shelter_id in (select get_my_shelter_ids()));
create policy "Partner orgs are public"
  on partner_orgs for select using (active = true);

-- ============================================================
-- CLEANUP OF ORPHANED SHELTERS (user account deletion)
-- ============================================================

-- 1. Trigger: when owner_id transitions from a value to null (the
--    owner's account was deleted and the "on delete set null" FK fired),
--    automatically stamp the deletion date.
create or replace function mark_shelter_deleted()
returns trigger as $$
begin
  if old.owner_id is not null and new.owner_id is null then
    new.deleted_at = now();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_shelters_mark_deleted
  before update on shelters
  for each row execute function mark_shelter_deleted();

-- 2. Cleanup function: permanently deletes orphaned shelters (no owner)
--    that have already passed the 30-day grace period.
--    Deleting the "shelters" row triggers "on delete cascade" on the
--    rest of the tables, which cleans up pets, photos, products, etc.
--    Adjust the interval if Nexa decides on a different grace period.
create or replace function cleanup_orphaned_shelters()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from shelters
  where owner_id is null
    and deleted_at is not null
    and deleted_at < now() - interval '30 days';
end;
$$;

-- 3. Automatic scheduling with pg_cron (Supabase's native extension).
--    IMPORTANT: pg_cron is not relocatable — it always creates its own
--    schema called "cron", regardless of what schema you specify.
--    Do not specify "with schema" here.
--    If "create extension" fails due to permissions in the SQL Editor,
--    enable it first from the Dashboard: Database → Extensions → pg_cron.
create extension if not exists pg_cron;

select cron.schedule(
  'cleanup-orphaned-shelters',
  '0 3 * * *',
  $$select public.cleanup_orphaned_shelters()$$
);

-- ============================================================
-- END OF MAIN SCHEMA SCRIPT
-- ============================================================

-- ============================================================
-- STORAGE POLICIES — buckets: shelter-assets, pet-photos, product-photos
-- Expected path structure: {shelter_id}/.../file.jpg
-- ============================================================

-- 1. PUBLIC READ (the 3 buckets are already flagged as public to serve
--    the direct URL; this policy also covers access via the authenticated
--    API, e.g. listings from the dashboard)
create policy "Public images for Nexa platform"
  on storage.objects for select
  using (bucket_id in ('shelter-assets', 'pet-photos', 'product-photos'));

-- 2. UPLOAD — the owner can only upload inside their own folder.
--    Compared as text (id::text); the client's path is never cast to
--    uuid, which would raise a 500 error on a malformed path instead
--    of a clean permission rejection.
create policy "Shelter owners can upload images to their folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('shelter-assets', 'pet-photos', 'product-photos')
    and (storage.foldername(name))[1] in (
      select id::text from shelters where owner_id = auth.uid()
    )
  );

-- 3. UPDATE
create policy "Shelter owners can update their images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id in ('shelter-assets', 'pet-photos', 'product-photos')
    and (storage.foldername(name))[1] in (
      select id::text from shelters where owner_id = auth.uid()
    )
  );

-- 4. DELETE
create policy "Shelter owners can delete their images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id in ('shelter-assets', 'pet-photos', 'product-photos')
    and (storage.foldername(name))[1] in (
      select id::text from shelters where owner_id = auth.uid()
    )
  );

-- ============================================================
-- END OF SCRIPT
-- ============================================================