export const config = {
  matcher: '/admin.html',
};

export default function middleware(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Fietsvrienden Admin"' },
    });
  }

  const base64 = authHeader.slice(6);
  const decoded = atob(base64);
  const colonIndex = decoded.indexOf(':');
  const user = decoded.slice(0, colonIndex);
  const pass = decoded.slice(colonIndex + 1);

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return new Response('Invalid credentials', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Fietsvrienden Admin"' },
    });
  }

  // Authenticated — serve the page
}
