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