// [Path 2 - POST] -- Create a Module,  path === '/modules/create'
else if (path === '/modules/create' && request.method === 'POST') {
  let body = '';
  request.on('data', chunk => {
      // Convert Buffer Chunks to Strings and concatenate them
      body += chunk.toString();
  });

  request.on('end', () => { 
    const moduleData = JSON.parse(body); // String -> JSON 

    // [MongoDB Method] - Create One Module
    client.db('myDatabase').collection('modules').insertOne({
        code: moduleData.code,
        moduleName: moduleData.moduleName
    })
    .then(() => {
        response.writeHead(201, { 'Content-Type': 'text/plain' });
        response.end(`Module created successfully!`);
    })
    .catch(() => {
        response.writeHead(500);
        response.end('Server Error');
    });  
  });
}    