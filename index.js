let express = require("express")

let app = express()

let port = process.env.PORT || 5000

require('dotenv').config()

// here is midlewir setup

let cors = require('cors')

app.use(cors())

app.use(express.json())

// here is midlewir setup ends






console.log(process.env.DB_EMAIL);

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASS}@cluster0.s7onimz.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://mahedinir34678:VwsQK40YxmqkSPjr@cluster0.s7onimz.mongodb.net/?retryWrites=true&w=majority`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection


        // const coffeeCollection = client.db("DBnewCoffee").collection("newCoffee");

        // collection("newCoffee");
        const database = client.db("insertDB");

        const haiku = database.collection("haiku");




        app.get('/coffee', async (req, res) => {

            let coursor = haiku.find()

            let result = await coursor.toArray()
            res.send(result)

        })


        app.patch('/coffee/:id', async (req, res) => {
            let id = req.params.id

            let qury = { _id: new ObjectId(id) }

            let result = await haiku.findOne(qury)

            res.send(result)


        })


        app.post('/coffee', async (req, res) => {

            let newCoffee = req.body

            console.log(newCoffee);

            const result = await haiku.insertOne(newCoffee)

            res.send(result)




        })


        app.delete('/coffee/:id', async (req, res) => {
            let id = req.params.id

            let qury = { _id: new ObjectId(id) }

            let result = await haiku.deleteOne(qury)
            res.send(result)


        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})