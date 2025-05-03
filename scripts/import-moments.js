/**
 *  import‑moments.js
 *  Usage: node scripts/import‑moments.js path/to/file.csv
 *  CSV columns required: lat,lng,description,slug   (header names are case‑insensitive)
 */

import fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// ─── env ────────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: resolve(__dirname, '..', '.env') });

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    '❌  SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in .env'
  );
  process.exit(1);
}
const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

// ─── helpers ────────────────────────────────────────────────────────────────
const pointEWKT = (lng, lat) => `SRID=4326;POINT(${lng} ${lat})`;

const DEFAULT_STATUS = 'approved';
const DEFAULT_LANGUAGE = null; // or e.g. 'en'
const DESCR_TEMPLATE =
  '<a href="https://peoplesriverhistory.org/post/%%slug%%" target="sharp">%%description%%</a> <small>-Secret&nbspHistory</small>';

// ─── ingest CSV ─────────────────────────────────────────────────────────────
if (process.argv.length < 3) {
  console.error('usage: node scripts/import‑moments.js file.csv');
  process.exit(1);
}

const csvBuf = fs.readFileSync(process.argv[2]);
const srcRows = parse(csvBuf, { columns: true, skip_empty_lines: true });

const inserts = [];

for (const r of srcRows) {
  const lat = parseFloat(r.lat ?? r.latitude);
  const lng = parseFloat(r.lng ?? r.lon ?? r.longitude);
  const rawDescription = (r.description ?? '').trim();
  const slug = (r.slug ?? '').trim();

  if (Number.isNaN(lat) || Number.isNaN(lng) || !rawDescription || !slug) {
    console.warn('✗  skipped invalid row:', r);
    continue;
  }

  const description = DESCR_TEMPLATE.replace('%%slug%%', slug).replace(
    '%%description%%',
    rawDescription
  );

  inserts.push({
    location: pointEWKT(lng, lat),
    description,
    status: DEFAULT_STATUS,
    language: DEFAULT_LANGUAGE
  });
}

if (!inserts.length) {
  console.log('No valid rows to insert.');
  process.exit(0);
}

// ─── insert to Supabase ─────────────────────────────────────────────────────
const { error, count } = await sb
  .from('moments')
  .insert(inserts, { count: 'exact' });

if (error) {
  console.error('❌  Insert failed:', error.message);
  process.exit(1);
}

console.log(`✅  Inserted ${count} rows.`);
