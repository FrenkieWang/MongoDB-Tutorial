const { MongoClient, ObjectId } = require('mongodb'); // npm install mongodb
const express = require('express'); // npm install express
const cors = require('cors'); // npm install cors
const bodyParser = require('body-parser'); // npm install body-parser

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://frenkiewang21:afdkjpxx124@mongotutorial.qkegqpd.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=MongoTutorial";
const client = new MongoClient(ATLAS_URI);
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect:'));

// Create HTTP Server
const app = express();
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse "Request Body" in JSON

// [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
app.get('/modules/get', (req, res) => {
  // [MongoDB Method] - Get all Modules
  client.db('myDatabase').collection('modules').find().toArray()
    .then(results => res.json(results))
    .catch(() => res.status(500).send('Server Error'));
});

// [Path 2 - POST] -- Create a Module,  path === '/modules/create'
app.post('/modules/create', (req, res) => {
  // [MongoDB Method] - Create One Module
  client.db('myDatabase').collection('modules').insertOne(
    req.body
  )
    .then(() => res.status(201).send('Module created!'))
    .catch(() => res.status(500).send('Server Error'));
});

// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
app.get('/modules/get/:moduleId', (req, res) => {
  const objectId = new ObjectId(req.params.moduleId);
  // [MongoDB Method] - Find One Module by ID
  client.db('myDatabase').collection('modules').findOne({ _id: objectId })
    .then(result => res.json(result))
    .catch(() => res.status(500).send('Server Error'));
});

// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
app.put('/modules/update/:moduleId', (req, res) => {
  const objectId = new ObjectId(req.params.moduleId);
  // [MongoDB Method] - Update One Module by ID
  client.db('myDatabase').collection('modules').updateOne(
    { _id: objectId }, 
    { $set: req.body }
  )
    .then(() => res.send('Module updated!'))
    .catch(() => res.status(500).send('Server Error'));
});

// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
app.delete('/modules/delete/:moduleId', (req, res) => {
  const objectId = new ObjectId(req.params.moduleId);
  // [MongoDB Method] - Delete One Module by _id
  client.db('myDatabase').collection('modules').deleteOne({ _id: objectId })
    .then(() => res.send('Module deleted!'))
    .catch(() => res.status(500).send('Server Error'));
});

// [Path 6] Path Not Found
app.use((req, res) => {
  res.status(404).send('Path not found.');
});

// Server listen to the PORT => http://localhost:5000
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});