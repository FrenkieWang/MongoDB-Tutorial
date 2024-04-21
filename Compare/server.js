const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://chenshuhang329:qwer1234@cs239.havypff.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=CS239";
const client = new MongoClient(ATLAS_URI);
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect'));

// Create an Express app
const app = express();

const cors = require('cors');
app.use(cors()); 

app.use(express.json()); 

// [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
app.get('/modules/get', (req, res) => {
  client.db('myDatabase').collection('modules').find().toArray()
    .then(results => {
      res.json(results);
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

// [Path 2 - POST] -- Create a Module,  path === '/modules/create'
app.post('/modules/create', (req, res) => {
  client.db('myDatabase').collection('modules').insertOne(req.body)
    .then(() => {
      res.status(201).send('Module created successfully!');
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
app.get('/modules/get/:moduleId', (req, res) => {
  const objectId = new ObjectId(req.params.moduleId);
  client.db('myDatabase').collection('modules').findOne({ _id: objectId })
    .then(result => {
      res.json(result);
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
app.put('/modules/update/:moduleId', async (req, res) => {
  const objectId = new ObjectId(req.params.moduleId);
  client.db('myDatabase').collection('modules').updateOne(
    { _id: objectId },
    { $set: req.body }
  )
    .then(() => {
      res.send('Module updated!');
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
app.delete('/modules/delete/:moduleId', async (req, res) => {
  const objectId = new ObjectId(req.params.moduleId);
  client.db('myDatabase').collection('modules').deleteOne({ _id: objectId })
    .then(() => {
      res.send('Module deleted!');
    })
    .catch(() => {
      res.status(500).send('Server Error');
    });
});

// [Path 6] Path Not Found
app.use((req, res) => {
  res.status(404).send('Path not found.');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});