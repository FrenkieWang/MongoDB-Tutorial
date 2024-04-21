// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
else if (path.startsWith('/modules/get/') && request.method === 'GET') {
    const segments = path.split('/').filter(Boolean);
    const moduleId = segments[2]; // Get `:moduleId`      
    const objectId = new ObjectId(moduleId); // String Id -> ObjectId

    // [MongoDB Method] - Find One Module by ID
    client.db('myDatabase').collection('modules').findOne({ _id: objectId })
        .then(result => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(result));
        })
        .catch(() => {
        response.writeHead(500);
        response.end('Server Error');
    });
}