// Delete `Modules` Collection if it exists
db.modules.drop();

// Create Collection `modules`, then insert Many Modules.
db.modules.insertMany([
    { code: 'CS210', moduleName: 'Algorithms & Data Structures 1' },
    { code: 'CS211', moduleName: 'Algorithms & Data Structures 2' },
    { code: 'CS130', moduleName: 'Database' }
]);

// mongodb+srv://frenkiewang21:afdkjpxx124@mongotutorial.qkegqpd.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=MongoTutorial

// [GET] -  Get all Modules
db.modules.find();

// [POST] - Insert One Module.
db.modules.insertOne({
    code: 'CS353', 
    moduleName: 'Software Project'
});

// [GET] - Get one Module
db.modules.find(
    { _id: ObjectId("660c4762fe94a08be79f990b") }
);

// [PUT] - Update one Module
db.modules.updateOne(
    { _id: ObjectId("660c9fbcd0b4897e739f990d") },
    { 
        $set: {
         code: "CS320", 
         moduleName: "Computer Networks",
        } 
    }
);

// [DELETE] - Delete one Module
db.modules.deleteOne(
    { _id: ObjectId("660c9fbcd0b4897e739f990d") }
);


/* 
    Mongo DB Shell: https://www.mongodb.com/try/download/shell
    https://www.youtube.com/watch?v=J2FvuDcz5jk
    Input: ATLAS_URI
    Connect to that Database
*/