// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
app.put('/modules/update/:moduleId', (request, response) => {
  const objectId = new ObjectId(request.params.moduleId);
  client.db('myDatabase').collection('modules').updateOne(
    { _id: objectId },
    { $set: request.body }
  )
    .then(() => {
      response.send('Module updated!');
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});