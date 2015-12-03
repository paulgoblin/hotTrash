'use strict';


let PORT = process.env.PORT || 3000;

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');

let app = express();

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', function(req, res){
  res.render('index')
});

// 404 HANDLER
app.use((req, res) => {
  res.status(404).render('404')
});

app.listen(PORT);

