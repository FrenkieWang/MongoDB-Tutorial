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

// [Default] Path Not Found
app.use((request, response) => {
  response.status(404).send('Path not found.');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});