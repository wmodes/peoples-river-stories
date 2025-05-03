import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDB } from '$lib/clients/mysqlClient';
import { CLOUDFLARE_TURNSTILE_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
  const { lng, lat, description, captchaToken } = await request.json();

  if (!captchaToken) {
    return json({ error: 'CAPTCHA token is missing.' }, { status: 400 });
  }

  if (!description?.trim()) {
    return json({ error: 'Description cannot be empty.' }, { status: 400 });
  }

  const verifyResponse = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: CLOUDFLARE_TURNSTILE_SECRET,
        response: captchaToken
      })
    }
  );

  const captchaResult = await verifyResponse.json();

  if (!captchaResult.success) {
    return json({ error: 'CAPTCHA verification failed.' }, { status: 400 });
  }

  try {
    const db = await getDB();
    await db.execute(
      `INSERT INTO moments (lat, lng, description, status) VALUES (?, ?, ?, ?)`,
      [lat, lng, description.trim(), 'pending']
    );
    return json({}, { status: 201 });
  } catch (err) {
    console.error('Insert error:', err);
    return json({ error: 'Error saving new moment' }, { status: 500 });
  }
};
