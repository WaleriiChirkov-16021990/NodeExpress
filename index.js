'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Helper function to update and save the counter value to a file
const updateCounterValue = function updateCounter(data) {
    fs.writeFileSync(path.join(__dirname, 'public', 'data.json'), JSON.stringify(data));
}

// Load the counter value from the file when the server starts

const counterValue = JSON.parse(fs.readFileSync('public/data.json').toString());


// Handler for the home page ("/")
app.get('/', (req, res) => {
    counterValue.main = counterValue.main + 1;
    updateCounterValue(counterValue);
    res.send(`Home Page<br>Views: ${counterValue.main}<br><a href="/about">About</a>`);
});

// Handler for the about page ("/about")
app.get('/about', (req, res) => {
    counterValue.about = counterValue.about + 1;
    updateCounterValue(counterValue)
    res.send(`About Page<br>Views: ${counterValue.about}<br><a href="/">Main Page</a>`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
