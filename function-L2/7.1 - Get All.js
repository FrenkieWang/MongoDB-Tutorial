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