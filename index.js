// const express = require('express');
// const app = express();
// const port = 3000;
//
// app.get('/',(req,res)=>{
//     app.use(express.static('public'));
//     app.sendFile('mainPage.html');
// });
//
// app.get('/about',(req,res)=>{
//     app.use(express.static('public'));
//     app.sendFile('about.html');
// });
//
// app.listen(port,()=>{
//     console.log(`listening on port ${port}`);
// })

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Helper function to update and save the counter value to a file
function updateCounter() {
    let counter = 0;

    return function() {
        counter++;
        fs.writeFile('counter.txt', counter.toString(), (err) => {
            if (err) throw err;
        });
    };
}

// Load the counter value from the file when the server starts

let counterValue = parseInt(fs.readFileSync('counter.txt'));

// Create the counter update function
const updateCounterValue = updateCounter();

// Handler for the home page ("/")
app.get('/', (req, res) => {
    updateCounterValue();
    res.send(`Home Page<br>Views: ${counterValue}<br><a href="/about">About</a>`);
});

// Handler for the about page ("/about")
app.get('/about', (req, res) => {
    updateCounterValue();
    res.send(`About Page<br>Views: ${counterValue}<br><a href="/">Main Page</a>`);
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
