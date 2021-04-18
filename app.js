const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

const config = require('./config');
const mockController = require('./controllers/mockController');
const apiController = require('./controllers/apiController');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect(config.getDbConnectionString())
    .then(() => {console.log('Database connection successful')})
    .catch(err => {console.error('Database connection error')});
    
// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.user || null;
  next();
});


mockController(app);
apiController(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
