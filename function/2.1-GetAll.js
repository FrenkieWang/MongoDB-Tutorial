const url = require('url');

const URL = url.parse(request.url, true);
const path = URL.pathname;
console.log(path);

// [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
if (path === '/modules/get' && request.method === 'GET') {
  // [MongoDB Method] - Get all Modules
  client.db('myDatabase').collection('modules').find().toArray()
    .then(results => {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(results));
    })
    .catch(() => {
      response.writeHead(500);
      response.end('Server Error');
  });
}  
  
// [Path 6] Path Not Found
else {
  response.writeHead(404); 
  response.end('Path not found.');  
}