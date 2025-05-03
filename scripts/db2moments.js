#!/usr/bin/env node
// db2csv.js
// Usage: node db2csv.js path/to/markers.csv
// Outputs: markers-stories.csv in same directory

import fs from 'node:fs';
import path from 'node:path';

// Quote a CSV field
function csvQuote(field) {
  const str = String(field ?? '');
  return `"${str.replace(/"/g, '""')}"`;
}

// Parse serialized PHP cpm_point blob via regex
function parseBlob(blob) {
  const entries = [];
  const entryRegex = /i:\d+;a:\d+:\{([\s\S]*?)\}(?=(?:i:\d+;a:|$))/g;
  let m;
  while ((m = entryRegex.exec(blob)) !== null) {
    const chunk = m[1];
    const latMatch = chunk.match(/latitude";(?:s:\d+:"([^";]+)"|d:([^;]+))/);
    const lngMatch = chunk.match(/longitude";(?:s:\d+:"([^";]+)"|d:([^;]+))/);
    if (!latMatch || !lngMatch) continue;
    const lat = (latMatch[1] || latMatch[2] || '').trim();
    const lng = (lngMatch[1] || lngMatch[2] || '').trim();
    const descM = chunk.match(/s:\d+:"description";s:\d+:"([^"]*)"/);
    const nameM = chunk.match(/s:\d+:"name";s:\d+:"([^"]*)"/);
    const descVal = descM ? descM[1].trim() : '';
    const nameVal = nameM ? nameM[1].trim() : '';
    entries.push({ lat, lng, desc: descVal, name: nameVal });
  }
  return entries;
}

async function main() {
  const [inputPath] = process.argv.slice(2);
  if (!inputPath) {
    console.error('Usage: node db2csv.js <input.csv>');
    process.exit(1);
  }
  if (!fs.existsSync(inputPath)) {
    console.error(`File not found: ${inputPath}`);
    process.exit(1);
  }

  const { dir, name, ext } = path.parse(inputPath);
  const outPath = path.join(dir, `${name}-stories${ext}`);
  const lines = fs.readFileSync(inputPath, 'latin1').split(/\r?\n/);

  const out = ['lat,lng,description,slug'];

  for (const line of lines) {
    if (!line.trim()) continue;
    const [title, slug, blob] = line.split('\t');
    if (!title || !slug || !blob) {
      console.warn('Skipping malformed line:', line);
      continue;
    }

    const markers = parseBlob(blob);
    for (const { lat, lng, desc, name } of markers) {
      if (!lat || !lng) continue;
      const isValidName = name && /[a-zA-Z]/.test(name);
      const description = desc || (isValidName ? name : '') || title;
      out.push([lat, lng, csvQuote(description), csvQuote(slug)].join(','));
    }
  }

  fs.writeFileSync(outPath, out.join('\n'), 'utf8');
  console.log(`Wrote ${out.length - 1} records to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
