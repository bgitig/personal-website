/**
 * One-time script to obtain a Spotify refresh token.
 *
 * Usage (PowerShell):
 *   node --env-file=.env scripts/get-spotify-token.mjs
 *
 * .env file should contain:
 *   SPOTIFY_CLIENT_ID=your_id
 *   SPOTIFY_CLIENT_SECRET=your_secret
 */

import readline from 'readline'

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI  = 'http://127.0.0.1:8888/callback'
const SCOPE         = 'user-read-recently-played'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nError: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set.')
  console.error('Run with: node --env-file=.env scripts/get-spotify-token.mjs\n')
  process.exit(1)
}

const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id:     CLIENT_ID,
    scope:         SCOPE,
    redirect_uri:  REDIRECT_URI,
  }).toString()

console.log('\n── Spotify Token Setup ──────────────────────────────────────')
console.log('\n1. Open this URL in your browser:\n')
console.log('   ' + authUrl)
console.log('\n2. Approve access.')
console.log('   Your browser will then show an error page — that\'s fine.')
console.log('   The address bar will contain a URL like:')
console.log('   http://localhost:8888/callback?code=AQD...\n')
console.log('3. Copy the full URL from the address bar and paste it below.\n')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('Paste the redirect URL here: ', async (input) => {
  rl.close()

  let code
  try {
    code = new URL(input.trim()).searchParams.get('code')
  } catch {
    code = input.trim()
  }

  if (!code) {
    console.error('\nCould not find a code in that URL. Try again.\n')
    process.exit(1)
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/x-www-form-urlencoded',
      Authorization:   'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const tokens = await tokenRes.json()

  if (!tokens.refresh_token) {
    console.error('\nToken exchange failed:', tokens, '\n')
    process.exit(1)
  }

  console.log('\n✅ Success!\n')
  console.log('Add these to Cloudflare Pages → Settings → Environment variables:\n')
  console.log(`  SPOTIFY_CLIENT_ID     = ${CLIENT_ID}`)
  console.log(`  SPOTIFY_CLIENT_SECRET = ${CLIENT_SECRET}`)
  console.log(`  SPOTIFY_REFRESH_TOKEN = ${tokens.refresh_token}`)
  console.log('\nDo NOT commit these values to git.\n')
})
