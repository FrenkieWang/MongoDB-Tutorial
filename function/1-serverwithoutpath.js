const { MongoClient, ObjectId } = require('mongodb'); // npm install mongodb
const http = require('http');

const ATLAS_URI = "mongodb+srv://frenkiewang21:afdkjpxx124@mongotutorial.qkegqpd.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=MongoTutorial";
const client = new MongoClient(ATLAS_URI);

client.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('MongoDB failed to connect:'));

const server = http.createServer((request, response) => {
  
  // Default Path - 404 Not found
  response.writeHead(404);
  response.end('Path not found.');  
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});