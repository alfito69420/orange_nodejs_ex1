const express = require('express')
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3000

app.use(express.json())

const CONNECTION_STRING = "mongodb+srv://alfito:xqoyTzOHqCCAcpv8@cluster0.wdpzzmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var db = null;
/*
MongoClient.connect(CONNECTION_STRING, function (err, db) {
    if (err) {
        console.log(err);
    }
    else {

        console.log("Connected to db");

        const db = client.db();


        // Routes
        app.get('/posts', async (req, res) => {
            const posts = await db.collection('posts').find().toArray();
            posts.forEach(element => {
                console.log(element)
            });
            res.send(posts)
        });

        app.post('/posts', async function (req, res) {
            const newPost = {
                "commenter": req.body.commenter,
                "comment": req.body.comment,
                "created_at": req.body.created_at,
                "post_id": req.body.post_id
            }
            const result = await db.collection("posts").insertOne(newPost);
            res.send(result)
        });

        app.get('/', (req, res) => res.send('Hello World!'));

        app.listen(port, () => console.log(`Example app listening on port ${port}!`));

    }
});

*/


//  POSTS
app.get('/posts', async (req, res) => {

    const posts = await db.collection('posts').find().toArray();

    posts.forEach(element => {
        console.log(element)
    });

    res.send(posts)
})


//  INSERT ONE POST
app.post('/posts', async function (req, res) {

    const newPost = {
        "commenter": req.body.commenter,
        "comment": req.body.comment,
        "created_at": req.body.created_at,
        "post_id": req.body.post_id

    }
    const result = await db.collection("posts").insertOne(newPost);

    res.send(result)
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)
    const client = new MongoClient(CONNECTION_STRING)
    try {
        await client.connect();

        console.log("Mongo Connection Success");

        db = client.db("Orange")
    } catch (error) {
        console.log(error);
    }
})