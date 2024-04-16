const { MongoClient, ObjectId } = require('mongodb'); // npm install mongodb
const http = require('http');
const url = require('url');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://frenkiewang21:afdkjpxx124@mongotutorial.qkegqpd.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=MongoTutorial";
const client = new MongoClient(ATLAS_URI); 
client.connect()    
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect:'));

// Create HTTP Server
const server = http.createServer((request, response) => {
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


  // Get request URL and print in Console 
  const URL = url.parse(request.url, true);
  const path = URL.pathname;
  console.log(path);

  // [Path 0 - GET] -- Default path to show deployment success
  if (path === '/' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: "You have successfully deployed your application!" }));
    return;
  }

  // [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
  else if (path === '/modules/get' && request.method === 'GET') {
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
  
  // [Path 6] Path Not Found
  else {
    response.writeHead(404); 
    response.end('Path not found.');  
  }
}); // end of http.createServer 

// Server listen to the PORT => http://localhost:5000
const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});