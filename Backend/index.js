const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
require('dotenv').config({ path: './Backend/.env' });
connectToMongo();
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


