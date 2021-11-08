const express = require('express');
const { cors } = require('./middlewares/middlewares');
const app = express();
const path = require('path');
const routes = require('./routes/index');
const expresshbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');

app.use('/views', express.static(__dirname + '/public'));
app.use(express.json());

//Configuracion
app.set('views', path.join(__dirname, 'public/views'));
app.engine(
  '.hbs',
  expresshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));

app.use(cors);

app.use('/', routes);

module.exports = app;
