const express = require('express')
const app = express()
const port = 3000

app.use(express.json())


var db = null;


//  COMMENTS
app.get('/comments', async (req, res) => {

    const comments = await db.collection('employees').find().toArray();

    comments.forEach(element => {
        console.log(element)
    });

    res.send(comments)
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))