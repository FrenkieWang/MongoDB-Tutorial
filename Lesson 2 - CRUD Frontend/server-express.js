const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://chenshuhang329:qwer1234@cs239.havypff.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=CS239";
const client = new MongoClient(ATLAS_URI);
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect'));

// Create an Express app
const app = express();
app.use(cors()); 

app.use(express.json()); 

// [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
app.get('/modules/get', (request, response) => {
  client.db('myDatabase').collection('modules').find().toArray()
    .then(results => {
      response.json(results);
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});

// [Path 2 - POST] -- Create a Module,  path === '/modules/create'
app.post('/modules/create', (request, response) => {
  client.db('myDatabase').collection('modules').insertOne(request.body)
    .then(() => {
      response.status(201).send('Module created successfully!');
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});

// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
app.get('/modules/get/:moduleId', (request, response) => {
  const objectId = new ObjectId(request.params.moduleId);
  client.db('myDatabase').collection('modules').findOne({ _id: objectId })
    .then(result => {
      response.json(result);
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});

// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
app.put('/modules/update/:moduleId', (request, response) => {
  const objectId = new ObjectId(request.params.moduleId);
  client.db('myDatabase').collection('modules').updateOne(
    { _id: objectId },
    { $set: request.body }
  )
    .then(() => {
      response.send('Module updated!');
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});

// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
app.delete('/modules/delete/:moduleId', (request, response) => {
  const objectId = new ObjectId(request.params.moduleId);
  client.db('myDatabase').collection('modules').deleteOne({ _id: objectId })
    .then(() => {
      response.send('Module deleted!');
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});

// [Path 6] Path Not Found
app.use((request, response) => {
  response.status(404).send('Path not found.');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});