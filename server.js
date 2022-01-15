const express = require('express');
const timestamp = require('./timestamp');
const app = express();

// enable CORS
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// Set up rate limiter: maximum of 10 requests per minute
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 1*60*1000, // 1 Minute
    max: 60
});
const staticLimiter = rateLimit({
    windowMs: 1*60*1000, // 1 Minute
    max: 60
});

// apply rate limiter to API requests
app.use('/api/:date?', apiLimiter);
// apply rate limiter to static file requests
app.use('/', staticLimiter);

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    // res.sendFile(__dirname + '/views/index.html');

    let currentDate = new Date();
    let jsonDateTime = JSON.stringify({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });

    let html = `<!DOCTYPE html><title>Timestamp Microservice</title><link href=https://i.ibb.co/Vj5dJHg/favicon-16x16.png rel=icon type=image/png><style>body{font-family:Courier,sans-serif;font-size:1.5em;color:#222;background-color:#FaFaFa;text-align:center;line-height:1.4em}.container{padding:0;margin-top:2em}h1,h3{margin-top:1.5em}hr{margin:1em}.footer{margin-top:2em}code{font-family:monospace;padding:.5em;color:#000;background-color:#d3d3d3}ul{list-style-type:none}li{margin-bottom:.5em}a{color:#2574A9}img{height:24px}</style><h1>Timestamp Microservice</h1><hr><div class=container><h3>Example Usage:</h3><ul><li><a href=api/2015-12-25>[project url]/api/2022-01-15</a><li><a href=api/1451001600000>[project url]/api/1642204800000</a></ul><h3>Example Output:</h3><p><code>${jsonDateTime}</code></div><div class=footer><p>By <a href=https://github.com/saideepd/ >Saideep Dicholkar</a> <img alt="GitHub Logo"src=https://i.ibb.co/wCBny6v/github.png></div>`;
    res.send(html);
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
