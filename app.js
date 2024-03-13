const express = require('express')
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 3000

app.use(express.json())

const CONNECTION_STRING = "mongodb+srv://alfito:xqoyTzOHqCCAcpv8@cluster0.wdpzzmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var db = null;

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
        "title": req.body.title,
        "author": req.body.author,
        "content": req.body.content,
        "image": req.body.image,
        "category": req.body.category

    }
    const result = await db.collection("posts").insertOne(newPost);

    res.send(result)
})

app.put('/posts/update', async function (req, res) {

    try {
        const empUpdate = db.collection('posts')
        const result = await empUpdate.findOneAndUpdate(
            { "post_nmb":parseInt(req.body.post_nmb) },
            { $set: req.body },
            { returnDocument: 'after', upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});


//  DELETE ONE POST
app.delete('/posts/delete/:id', async function (req, res) {
    try {
        const result = await db.collection('posts').findOneAndDelete(
            { "_id": new ObjectId(req.params.id) }
        )
        res.send((result) ? "Post deleted..." : "Post not found")
    } catch (error) {
        console.log(error)
    }
});

//  SELECT ALL COMMENTS
app.get('/comments', async (req, res) => {
    const comments = await db.collection('comments').find().toArray();

    comments.forEach(element => {
        console.log(element)
    });

    res.send(comments)
})

//  POST ONE COMMENT
app.post('/comments', async function (req, res) {

    const newComment = {
        "id": req.body.id,
        "commenter": req.body.commenter,
        "comment": req.body.comment,
        "created_at": req.body.created_at,
        "post_id": req.body.post_id,
    }
    const result = await db.collection("comments").insertOne(newComment);

    res.send(result)
})

app.put('/comments/update', async function(req, res) {
    try {
        const empUpdate = db.collection('comments')
        const result = await empUpdate.findOneAndUpdate(
            { "post_nmb":parseInt(req.body.post_nmb) },
            { $set: req.body },
            { returnDocument: 'after', upsert: true }
        )
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});

app.delete('/comments/delete/:id', async function(req, res) {
    try {
        const result = await db.collection('comments').findOneAndDelete(
            { "_id": new ObjectId(req.params.id) }
        )
        res.send((result) ? "Post deleted..." : "Post not found")
    } catch (error) {
        console.log(error)
    }
});

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