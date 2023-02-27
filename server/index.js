const express = require('express');
const cors = require('cors');
require('dotenv').config();

const path = require('path');
const app = express();

const mongoose = require("mongoose");
const rankRouter = require('./routes/rank');
const loginRouter = require('./routes/login');

app.use(express.json());
app.use(cors());


app.use('/rank', rankRouter);
app.use('/login', loginRouter);


const OMongooseOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect("mongodb://root:tnfqkrtm@db:27017", OMongooseOption).then(
  () => { console.log("mongoose connection complete") },
  (err) => { console.log(`mongoose connection error: ${err}`) }
);

app.listen(8000, () => {
  console.log('listening on 8000')
}); 