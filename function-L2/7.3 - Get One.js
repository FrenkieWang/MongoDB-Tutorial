// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
app.get('/modules/get/:moduleId', (request, response) => {
  const objectId = new ObjectId(request.params.moduleId);
  client.db('myDatabase').collection('modules').findOne({ _id: objectId })
    .then(result => {
      response.json(result);
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});