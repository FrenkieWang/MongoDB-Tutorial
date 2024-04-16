const http = require('http');
const mongoose = require('mongoose'); // npm install mongoose
const url = require('url');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://frenkiewang21:afdkjpxx124@mongotutorial.qkegqpd.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=MongoTutorial";

// Connect to MongoDB
mongoose.connect(ATLAS_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect:'));

// Create a Mongoose Model - Module
const ModuleSchema = new mongoose.Schema({
  code: String,
  moduleName:String
});
const Module = mongoose.model('Module', ModuleSchema);


// Configure HTTP Server - 5 Paths
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

  // [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
  if (path === '/modules/get' && request.method === 'GET') {
    Module.find().then(results => {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(results));
    }).catch(() => {
      response.writeHead(500);
      response.end('Server Error');
    });
  }
  
  // [Path 2 - POST] -- Create a Module,  path === '/modules/create'
  else if (path === '/modules/create' && request.method === 'POST') {
    let body = '';
    request.on('data', chunk => {
      //convert Buffer Chunks to Strings and concatenate them
      body += chunk.toString();
    });

    request.on('end', () => {
      const moduleData = JSON.parse(body); // String -> JSON
      
      // [Mongoose] - Create a new Module Instance
      const newModule = new Module({
        code: moduleData.code,
        moduleName: moduleData.moduleName
      });

      // Save new Module into MongoDB
      newModule.save().then(savedModule => {
        response.writeHead(201);
        response.end(`Module created successfully with ID: ${savedModule._id}`);
      }).catch(() => {
        response.writeHead(500);
        response.end('Server Error');
      });
    });
  }

  // [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
  else if (path.startsWith('/modules/get/') && request.method === 'GET') {
    const segments = path.split('/').filter(Boolean);
    const moduleId = segments[2]; // Get `:moduleId`

    // [Mongoose] - Query modules by ID
    Module.findById(moduleId).then(module => {
      if (!module) {
        response.writeHead(404);
        response.end('Module not found');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(module));
    }).catch(() => {
      response.writeHead(500);
      response.end('Server Error');
    });
  }

  // [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
  else if (path.startsWith('/modules/update/') && request.method === 'PUT') {
    const segments = path.split('/').filter(Boolean);
    const moduleId = segments[2]; // Get `:moduleId`

    let body = '';
    request.on('data', chunk => {
      //convert Buffer Chunks to Strings and concatenate them
      body += chunk.toString();
    });

    request.on('end', () => {
      const updatedData = JSON.parse(body); // String -> JSON

      // [Mongoose] - Update Module by ID
      Module.findByIdAndUpdate(moduleId, updatedData, { new: true }).then(module => {
        if (!module) {
          response.writeHead(404);
          response.end('Module not found');
          return;
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(module)); // {new: true} => Return Updated Module
      }).catch(() => {
        response.writeHead(500);
        response.end('Server Error');
      });
    });
  }

  // [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
  else if (path.startsWith('/modules/delete/') && request.method === 'DELETE') {
    const segments = path.split('/').filter(Boolean);
    const moduleId = segments[2]; // Get `:moduleId`

    // [Mongoose] - Delete Module by ID
    Module.findOneAndDelete(moduleId).then(deletedModule => {
      if (!deletedModule) {
        response.writeHead(404);
        response.end('Module not found');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end(`Module with ID: ${moduleId} deleted.`);
    }).catch(() => {
      response.writeHead(500);
      response.end('Server Error');
    });
  }

  // [Path 6] Path Not Found
  else {
    response.writeHead(404);
    response.end('Not Found');
  }
}); // end of http.createServer

// Server listen to the PORT => http://localhost:5000
const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});