// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
app.delete('/modules/delete/:moduleId', (request, response) => {
  const objectId = new ObjectId(request.params.moduleId);
  client.db('myDatabase').collection('modules').deleteOne({ _id: objectId })
    .then(() => {
      response.send('Module deleted!');
    })
    .catch(() => {
      response.status(500).send('Server Error');
    });
});