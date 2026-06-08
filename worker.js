export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/spotify') {
      return handleSpotify(env)
    }

    return env.ASSETS.fetch(request)
  },
}

async function handleSpotify(env) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = env

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return json({ error: 'Spotify env vars not configured' }, 500)
  }

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  })

  if (!tokenRes.ok) return json({ error: 'Token refresh failed' }, 502)

  const { access_token } = await tokenRes.json()

  const recentRes = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played?limit=1',
    { headers: { Authorization: `Bearer ${access_token}` } }
  )

  if (!recentRes.ok) return json({ error: 'Spotify API request failed' }, 502)

  const data = await recentRes.json()
  const item = data.items?.[0]
  if (!item) return json({ error: 'No recent tracks found' }, 404)

  const track = item.track
  return json({
    title: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    album: track.album.name,
    albumArt: track.album.images[0]?.url ?? null,
    playedAt: item.played_at,
    trackUrl: track.external_urls.spotify,
  })
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
