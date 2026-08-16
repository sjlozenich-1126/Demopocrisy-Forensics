# Cloud backend setup (5 minutes)

Admin edits used to live only in the browser (`localStorage`).  
With Supabase connected, **every device** loads and saves the same data.

## 1. Create a free Supabase project

1. Go to [https://supabase.com](https://supabase.com) → **Start your project**
2. Create an organization and a new project (any region)
3. Wait until the project is ready

## 2. Create the data table

In Supabase → **SQL Editor** → New query, paste and run:

```sql
create table if not exists site_data (
  id text primary key,
  payload jsonb not null,
  updated_at timestamptz default now()
);

alter table site_data enable row level security;

-- Public read + write so the public site and admin CMS can sync.
-- (Tighten later with auth if you need stricter access.)
create policy "Public read" on site_data
  for select using (true);

create policy "Public insert" on site_data
  for insert with check (true);

create policy "Public update" on site_data
  for update using (true);
```

## 3. Copy your API keys

Supabase → **Project Settings** → **API**:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 4. Add keys to the app

### Local development

Create a file `.env` in the project root (same folder as `package.json`):

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Then restart `npm run dev`.

### Vercel (live site)

1. Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add both:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Apply to **Production** (and Preview if you want)
4. **Redeploy** the project (Deployments → … → Redeploy)

Vite only reads `VITE_*` variables at **build time**, so a redeploy is required after adding them.

## 5. Publish your current data

1. Open the live site → Admin login
2. You should see a **☁** status badge (not “Local only”)
3. Click **Publish to Cloud** once
4. Refresh on your phone — the same images and text should appear

After that, normal Save actions in Admin auto-sync within about a second.

## How it works

| Action | What happens |
|--------|----------------|
| Open site | Loads shared data from Supabase (falls back to local cache if offline) |
| Edit in Admin | Saves to this browser + debounced upload to Supabase |
| Publish to Cloud | Immediate force upload |
| Pull from Cloud | Reload latest from Supabase |

## Troubleshooting

- Badge still says **Local only** → env vars missing or site not redeployed after adding them
- **Sync error** → check table name `site_data`, RLS policies, and that the anon key is correct
- Phone still old → open Admin on laptop → **Publish to Cloud**, then hard-refresh phone

## Security note

The policies above allow public write so setup is simple. For a higher-security setup later, restrict write to authenticated users and use Supabase Auth for the admin login.
