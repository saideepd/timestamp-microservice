const express = require('express');
const timestamp = require('./timestamp');
const app = express();
const serverless = require('serverless-http');
const router = express.Router();
// const path = require('path');

// enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// Hide X-powered-by header ;)
app.use(function (req, res, next) {
    res.header("X-powered-by", "Efforts, Sweat, Dedication and Desire");
    next();
});

// Set up rate limiter: maximum of 10 requests per minute
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 Minute
    max: 60
});
const staticLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 Minute
    max: 60
});

// apply rate limiter to API requests
app.use('/api/:date?', apiLimiter);
// apply rate limiter to static file requests
app.use('/', staticLimiter);

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
router.get("/", function (req, res) {
    res.json({
        "Name": "Timestamp Microservice",
        "Example Usage": [
            "/api/2022-01-15",
            "/api/1642204800000"
        ],
        "Example Output": { "unix": 1642204800000, "utc": "Sat, 15 Jan 2022 00:00:00 GMT" },
        "Made By": "https://github.com/saideepd/"
    })
    // Path of html file
    // res.sendFile(path.join(__dirname, '../', 'dist/index.html'));
});


// Simple Hello API endpoint... 
router.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});


// Date API endpoint... 
router.get("/api/:date?", function (req, res) {
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


// Used to redirect to router
app.use('/', router);


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//     console.log('Your app is listening on port ' + listener.address().port);
// });


module.exports.handler = serverless(app);
