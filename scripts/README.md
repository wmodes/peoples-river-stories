# Importing Marker Data into PeoplesRiverHistory

This is a step-by-step guide to go from raw MySQL post data to a populated `moments` table in Supabase.

---

## 1. Extract marker data from MySQL

```bash
mysql -u root 1740013389_peoplesriverhistory_org \
  -e "SELECT p.post_title AS title, p.post_name AS slug, pm.meta_value AS cpm_point \
      FROM wp_postmeta pm \
      JOIN wp_posts p ON p.ID = pm.post_id \
      WHERE pm.meta_key = 'cpm_point' \
        AND p.post_status = 'publish' \
        AND p.post_type = 'post';" \
  --batch --raw --skip-column-names \
  > test-data/markers.csv
```

## 2. Convert serialized marker data to flat CSV

```
node scripts/db2moments.js test-data/markers.csv
```

This outputs: `test-data/markers-stories.csv`
Columns: `lat,lng,description,slug`

## 3. Import into Supabase moments table

```
node scripts/import-moments.js test-data/markers-stories.csv
```

Uses `.env` for credentials. Inserts geodata + templated description.

## 4. Fetch into local app from Supabase

From the original QTM repo:

```
npm run fetch-data
```

## 5. Restart server (if needed)

```
npm run dev
# or for PM2
pm2 restart server
```
