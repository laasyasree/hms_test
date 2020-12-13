const express = require('express');
const fetch = require('node-fetch');
// Create the Server Instance
const app = express();
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 3003;
var path = require('path');
const fetchData={method:"post",headers:{"Content-Type":"application/json"}}
app.use(express.static(path.join(__dirname, 'smtg')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
var request = require('request');

/*
 Configure the REST paths for the server.
 Express provides functions to add paths. app.get() will listen for GET requests, app.post() for POST requests.
 These functions require the url part to listen to and a callback function to execute when something arrives at this url.
 The callback function to execute receives the request (req) and a JavaScript Object containing multiple reply functions (res) from express.
 At the end of our callback we use the reply functions to fulfill a request.
*/

/*
Provide the frontend.
If a request is made to the URL paths specified the server sends the corresponding HTML files.*/


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/smtg/index.html');
});

app.get('/guest1', (req, res) => {
    res.sendFile(__dirname + '/smtg/guest.html')
})

app.get('/room1', (req, res) => {
    res.sendFile(__dirname + '/smtg/rooms.html')
});

app.get('/booking123', (req, res) => {
    res.sendFile(__dirname + '/smtg/bookings.html')
});



//app.use('/static', express.static(__dirname + '/frontend'));


app.post('/guest', (req, res) => {
    fetch('http://guests:3001/guest', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});

app.post('/room', (req, res) => {
    fetch('http://localhost:3000/rooms', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
});


app.post('/booking/add', (req, res) => {
    fetch('http://localhost:3002/bookings', {...fetchData, body: JSON.stringify(req.body)})
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
}); 

app.listen(PORT, () => console.log(`Api Gateway listening on ${PORT}`));