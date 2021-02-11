const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static('src'));

app.get('/', (req, res) => {

});

app.listen(3006, () => {
    console.log(`App is running on port 3006`);
});