const express = require('express');
const cors = require('cors');
const moduleRoutes = require('./routes/moduleRoutes'); // Import the routes

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Let all [moduleRoutes] begins with `/modules`.
app.use('/modules', moduleRoutes); 

app.use((req, res) => {
  res.status(404).send('Path not found.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
