const express = require('express');
const timestamp = require('./timestamp');
const app = express();

// enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// Set up rate limiter: maximum of 10 requests per minute
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1*60*1000, // 1 Minute
    max: 10
});

// apply rate limiter to all requests
app.use('/api/:date?', limiter);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// Simple Hello API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

// Date API endpoint... 
app.get("/api/:date?", function (req, res) {

    let dateInput = req.params.date;

    let currentDate = timestamp(dateInput);

    if (currentDate.toString() === 'Invalid Date') {
        res.json({
            error: currentDate.toString()
        });
    }
    else {
        res.json({
            unix: currentDate.getTime(),
            utc: currentDate.toUTCString()
        });
    }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
