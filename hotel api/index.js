const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');  
const app = express();

app.use(cors({
  origin: 'http://localhost:3001'
}));

const url = 'mongodb+srv://bajpaisaksham183:H5QmgcfIifQZEvDI@cluster0.gtzu0p9.mongodb.net/';
const dbName = 'Hotel';
const collectionName = 'Data';

async function getMongoClient() {
  let client;
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');
    return client;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

app.get('/api/data', async (req, res) => {
  let client;
  try {
    client = await getMongoClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = await collection.find({}).toArray();
    res.send(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send({ message: 'Error fetching data' });
  } finally {
    if (client) {
      client.close();
    }
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
