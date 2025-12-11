export async function GET(req) {
  const cookie = req.headers.get("cookie");
  if (!cookie) {
    return new Response(JSON.stringify({ name: null }), { status: 200 });
  }

  const match = cookie.match(/user=([^;]+)/);
  const user = match ? JSON.parse(decodeURIComponent(match[1])) : null;

  return new Response(JSON.stringify(user || { name: null }), { status: 200 });
}
