const { MongoClient, ObjectId } = require('mongodb');
const http = require('http');
const url = require('url');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://chenshuhang329:qwer1234@cs239.havypff.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=CS239";
const client = new MongoClient(ATLAS_URI); 
client.connect()    
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect'));

// Create HTTP Server
const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
      response.writeHead(204); 
      response.end();
      return;
  }

  const URL = url.parse(request.url, true);
  const path = URL.pathname;

  // [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
  if (path === '/modules/get' && request.method === 'GET') {
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
        body += chunk.toString();
    });
    request.on('end', () => { 
      const moduleData = JSON.parse(body); 

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
    const moduleId = segments[2];     
    const objectId = new ObjectId(moduleId);
  
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
    const moduleId = segments[2]; 
    const objectId = new ObjectId(moduleId); 

    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      const updatedData = JSON.parse(body); 

      client.db('myDatabase').collection('modules').updateOne(
        { _id: objectId },
        { 
          $set: {
            code: updatedData.code,
            moduleName: updatedData.moduleName
          }
        }
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
    const moduleId = segments[2];     
    const objectId = new ObjectId(moduleId); 

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
}); 

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});