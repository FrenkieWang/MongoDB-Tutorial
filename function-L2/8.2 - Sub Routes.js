const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://chenshuhang329:qwer1234@cs239.havypff.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=CS239";
const client = new MongoClient(ATLAS_URI);
client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect'));


/* [Path 1 - Path 5] Copy and Paste
   1) app -> router
   2) remove path `/modules`
*/


module.exports = router;