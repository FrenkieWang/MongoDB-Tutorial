// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
else if (path.startsWith('/modules/update/') && request.method === 'PUT') {
    const segments = path.split('/').filter(Boolean);
    const moduleId = segments[2]; // Get `:moduleId`
    const objectId = new ObjectId(moduleId); // String Id -> ObjectId

    let body = '';
    request.on('data', chunk => {
        // Convert Buffer Chunks to Strings and concatenate them
        body += chunk.toString();
    });

    request.on('end', () => {
        const updatedData = JSON.parse(body); // String -> JSON

        // [MongoDB Method] - Update One Module by ID
        client.db('myDatabase').collection('modules').updateOne(
            { _id: objectId },
            { $set: updatedData }
        )
        .then(() => {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`Module updated!`);
        })
        .catch(() => {
            response.writeHead(500);
            response.end('Server Error');
        });
    });
}  