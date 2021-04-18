var configValues = require('./config');

module.exports = {
    getDbConnectionString: function() {
        return 'mongodb+srv://' + configValues.uname + ':' + configValues.pwd +
        '@cluster0.aagmy.mongodb.net/gasmeterData?retryWrites=true&w=majority';

    }    
}