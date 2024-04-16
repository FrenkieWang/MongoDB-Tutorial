// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
else if (path.startsWith('/modules/delete/') && request.method === 'DELETE') {
  const segments = path.split('/').filter(Boolean);
  const moduleId = segments[2]; // Get `:moduleId`    
  const objectId = new ObjectId(moduleId); // String Id -> ObjectId

  // [MongoDB Method] - Delete One Module by _id
  client.db('myDatabase').collection('modules').deleteOne({ _id: objectId })
  .then(() => {  
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`Module deleted!`);
  })
  .catch(() => {
    response.writeHead(500);
    response.end('Server Error');
  });
}     