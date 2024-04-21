const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');

// Remember to fill in your Password and Database Name!
const ATLAS_URI = "mongodb+srv://chenshuhang329:qwer1234@cs239.havypff.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=CS239";
const client = new MongoClient(ATLAS_URI);
client.connect()
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('MongoDB failed to connect'));

// [Path 1 - Get] -- Get all Modules,  path === '/modules/get'
router.get('/get', (request, response) => {
    client.db('myDatabase').collection('modules').find().toArray()
        .then(results => {
        response.json(results);
        })
        .catch(() => {
        response.status(500).send('Server Error');
    });
});

// [Path 2 - POST] -- Create a Module,  path === '/modules/create'
router.post('/create', (request, response) => {
    client.db('myDatabase').collection('modules').insertOne(request.body)
        .then(() => {
        response.status(201).send('Module created successfully!');
        })
        .catch(() => {
        response.status(500).send('Server Error');
    });
});

// [Path 3 - GET] -- Get a Module,  path === '/modules/get/:moduleId'
router.get('/get/:moduleId', (request, response) => {
    const objectId = new ObjectId(request.params.moduleId);
    client.db('myDatabase').collection('modules').findOne({ _id: objectId })
        .then(result => {
        response.json(result);
        })
        .catch(() => {
        response.status(500).send('Server Error');
    });
});

// [Path 4 - PUT] -- Update a Module,  path === '/modules/update/:moduleId'
router.put('/update/:moduleId', (request, response) => {
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

// [Path 5 -- DELETE] -- Delete a Module,  path === '/modules/delete/:modulId'
router.delete('/delete/:moduleId', (request, response) => {
    const objectId = new ObjectId(request.params.moduleId);
    client.db('myDatabase').collection('modules').deleteOne({ _id: objectId })
        .then(() => {
        response.send('Module deleted!');
        })
        .catch(() => {
        response.status(500).send('Server Error');
    });
});

module.exports = router;