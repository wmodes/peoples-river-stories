// src/lib/scripts/fetchData.ts
import { getDB } from '../clients/mysqlClient';
import fs from 'fs';
import path from 'path';
import type { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { roundCoordinates } from '$lib/utils/utils';

type CoordRow = { short_id: number; lat: number; lng: number };
type DescRow = { short_id: number; description: string };

export async function fetchIdCoords(): Promise<FeatureCollection<
  Point,
  GeoJsonProperties
> | null> {
  const db = await getDB();
  try {
    const [rows] = await db.query(
      'SELECT short_id, lat, lng FROM moments WHERE status = "approved"'
    );

    const geoJson: FeatureCollection<Point, GeoJsonProperties> = {
      type: 'FeatureCollection',
      features: (rows as CoordRow[]).map((row) => ({
        type: 'Feature',
        id: row.short_id,
        geometry: {
          type: 'Point',
          coordinates: roundCoordinates([row.lng, row.lat], 6)
        },
        properties: {}
      }))
    };

    return geoJson;
  } catch (err) {
    console.error('Error fetching coordinates:', err);
    return null;
  } finally {
    await db.end();
  }
}

export async function fetchIdDescriptions(): Promise<Record<
  number,
  string
> | null> {
  const db = await getDB();
  try {
    const [rows] = await db.query(
      'SELECT short_id, description FROM moments WHERE status = "approved"'
    );

    const descriptions = (rows as DescRow[]).reduce(
      (acc, row) => {
        acc[row.short_id] = row.description;
        return acc;
      },
      {} as Record<number, string>
    );

    return descriptions;
  } catch (err) {
    console.error('Error fetching descriptions:', err);
    return null;
  } finally {
    await db.end();
  }
}

export async function writeGeoJsonToFile(
  geoJson: FeatureCollection<Point, GeoJsonProperties>
): Promise<string> {
  const outputDir = path.resolve('static/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const simplifiedGeoJson = {
    ...geoJson,
    features: geoJson.features.map((f) => ({
      type: f.type,
      id: f.id,
      geometry: f.geometry
    }))
  };

  const filePath = path.resolve(outputDir, 'moments.json');
  await fs.promises.writeFile(filePath, JSON.stringify(simplifiedGeoJson));
  return filePath;
}

export async function writeDescriptionsToFile(
  descriptions: Record<number, string>
): Promise<string> {
  const outputDir = path.resolve('static/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.resolve(outputDir, 'descriptions.json');
  await fs.promises.writeFile(filePath, JSON.stringify(descriptions));
  return filePath;
}

export async function fetchAndWriteData() {
  const geoJson = await fetchIdCoords();
  const descriptions = await fetchIdDescriptions();

  if (!geoJson || !descriptions) {
    console.error('Failed to fetch data, aborting file write.');
    process.exit(1);
  }

  const geoJsonFilePath = await writeGeoJsonToFile(geoJson);
  const descriptionsFilePath = await writeDescriptionsToFile(descriptions);

  console.log(
    `Fetched ${geoJson.features.length} moments and saved to ${geoJsonFilePath}`
  );
  console.log(
    `Fetched ${Object.keys(descriptions).length} descriptions and saved to ${descriptionsFilePath}`
  );
}

fetchAndWriteData().catch((err) => {
  console.error('Error in fetchAndWriteData:', err);
  process.exit(1);
});
