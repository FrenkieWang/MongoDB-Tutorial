// Import the routes
const moduleRoutes = require('./routes/moduleRoutes'); 

// Let all [moduleRoutes] begins with `/modules`.
app.use('/modules', moduleRoutes); 