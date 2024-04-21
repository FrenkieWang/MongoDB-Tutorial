const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

const ATLAS_URI = "MongoDBConnectionString9";
const client = new MongoClient(ATLAS_URI);
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect'));

// [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
// [Path 2 - POST] -- Create a Module,  path === '/modules/create'
// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'

module.exports = router;