const express = require('express');
const bodyParser = require('body-parser');

const router=require("./backend/rute/Rute");

const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

app.listen(3003, () => {
    console.log('Server started on port 3003...');
});