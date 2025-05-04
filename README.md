# Peoples River Stories

Community-driven interactive map of American river stories---forked from Queering the Map for "A Secret History of American River People."

## Setup

### Database (MySQL)

This branch uses a MySQL backend instead of Supabase.

- The Supabase configuration is preserved in the `switch2supabase` branch, with an appropriate README for that setup.

- The MySQL schema is located in `setup/create-mysql-db.sql`.

### Markers

- The database is only used to hold submissions until they are approved.

- For now, approval must be done manually within the database by updating the `status` field from `'pending'` to `'approved'`.

- To pre-populate the database with existing markers, experiment with:

```
node scripts/insert-moments.js test-data/markers-stories.csv
```

- To fetch the data from the database and create the `moments.json` and `descriptions.json` static files:

```
npm run fetch-data
```

## Developing

To start the development server:

```
npm run dev
```

To start the production server (you will need a proper deployment stack for Node/SvelteKit):

```
npm run build
npm run preview
```

## Captcha Protection

We use Cloudflare Turnstile to protect point submissions. Set the following environment variables:

```
PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY
CLOUDFLARE_TURNSTILE_SECRET
```

More info: https://developers.cloudflare.com/turnstile/get-started/

## Attribution

- Forked from the [Queering the Map](https://github.com/queeringthemap/queering-the-map) codebase (MIT License)

- Code of Conduct adapted from the [Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct.html)

- Concept and participatory framework inspired by **A Secret History of American River People**

- Map tiles by OpenStreetMap contributors (ODbL)
