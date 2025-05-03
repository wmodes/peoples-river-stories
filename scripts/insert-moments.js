#!/usr/bin/env node
// scripts/import-moments.js
// Usage: node scripts/import-moments-mysql.js path/to/file.csv
// Requires CSV columns: lat,lng,description,slug

import fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import mysql from 'mysql2/promise';

// ─── env ────────────────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: resolve(__dirname, '..', '.env') });

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } =
  process.env;

if (!MYSQL_HOST || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD) {
  console.error('❌  Missing one or more MySQL connection env vars');
  process.exit(1);
}

// ─── connect to MySQL ───────────────────────────────────────────────────────
const db = await mysql.createConnection({
  host: MYSQL_HOST,
  port: MYSQL_PORT || 3306,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
});

// ─── constants ──────────────────────────────────────────────────────────────
const DEFAULT_STATUS = 'approved';
const DESCR_TEMPLATE =
  '<a href="https://peoplesriverhistory.org/post/%%slug%%" target="sharp">%%description%%</a> <small>-Secret&nbspHistory</small>';

// ─── ingest CSV ─────────────────────────────────────────────────────────────
if (process.argv.length < 3) {
  console.error('usage: node scripts/import-moments-mysql.js file.csv');
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

  inserts.push([lat, lng, description, DEFAULT_STATUS]);
}

// ─── insert into MySQL ──────────────────────────────────────────────────────
if (!inserts.length) {
  console.log('No valid rows to insert.');
  process.exit(0);
}

try {
  const [result] = await db.query(
    'INSERT INTO moments (lat, lng, description, status) VALUES ?',
    [inserts]
  );
  console.log(`✅  Inserted ${result.affectedRows} rows.`);
} catch (err) {
  console.error('❌  Insert failed:', err.message);
  process.exit(1);
} finally {
  await db.end();
}
