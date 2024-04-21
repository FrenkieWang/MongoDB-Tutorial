


app.get(`${URLpath}`, (request, response) => {
    mongoDBmethod
      .then(results => {
        response.json(results); // GET
        response.status(201).send('Success'); // POST, PUT, DELETE
      })
      .catch(() => {
        response.status(500).send('Error');
      });
  });