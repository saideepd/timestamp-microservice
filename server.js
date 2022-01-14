var express = require('express');
var timestamp = require('./timestamp');
var app = express();

// enable CORS
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

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
