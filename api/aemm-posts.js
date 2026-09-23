/**
 * Vercel Serverless Function: /api/aemm-posts
 * Fetches recent Instagram media from the Instagram Graph API for @rearecon2025,
 * filters for posts containing '#AEMM' (case-insensitive) in the caption,
 * and returns them ordered newest-first.
 *
 * Required Environment Variables in Vercel:
 * - INSTAGRAM_ACCESS_TOKEN: User Access Token or Page Access Token for Instagram Graph API / Basic Display API
 * - INSTAGRAM_USER_ID (optional, defaults to 'me'): Instagram User ID
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID || 'me';

  if (!token) {
    return res.status(200).json({
      success: false,
      message: 'INSTAGRAM_ACCESS_TOKEN is not configured in Vercel environment variables. Serving fallback static embeds.',
      posts: []
    });
  }

  try {
    // Fetch user media (id, caption, permalink, timestamp, media_type)
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,permalink,timestamp,media_type&access_token=${token}&limit=50`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Instagram API Error:', data.error);
      return res.status(200).json({
        success: false,
        error: data.error.message,
        posts: []
      });
    }

    const allMedia = data.data || [];

    // Filter media containing #AEMM in caption
    const aemmPosts = allMedia
      .filter(item => item.caption && item.caption.toLowerCase().includes('#aemm'))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .map(item => ({
        id: item.id,
        permalink: item.permalink,
        caption: item.caption,
        timestamp: item.timestamp,
        media_type: item.media_type
      }));

    // Cache responses for 1 hour (s-maxage=3600, stale-while-revalidate=86400)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    return res.status(200).json({
      success: true,
      count: aemmPosts.length,
      posts: aemmPosts
    });
  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch posts from Instagram API',
      posts: []
    });
  }
}
