  // Set CORS headers to allows Cross-Origin-Resourse-Share
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS -> Preflight request ... Browser will determine whether server is safe
  if (request.method === 'OPTIONS') {
      response.writeHead(204); // No Content
      response.end();
      return;
  }