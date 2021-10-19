const express = require('express');
//const {cors} = require('./middlewares/middlewares');
const app = express();
const routes = require('./routes/index');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res)=>{
	res.send('hi, estas en el inicio');
})

app.use('/', routes);

module.exports = app;