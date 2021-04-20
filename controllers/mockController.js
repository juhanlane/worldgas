const Msgs = require('../models/MsgModel');
const mock = require('../config/mocking');

module.exports = function (app) {

    //add random-generated messages to database
    app.get('/mock/gen', function (req, res) {
        Msgs.find({}).lean()
            .sort({ timestamp: 'asc' })
            .then(msgs => {
                if (msgs.length > 0){
                    req.flash('error_msg', 'Data already present');
                }
                else {
                    const mockedMsgs = mock();
                    Msgs.create(mockedMsgs, (err, results) => {
                        if (err) next(err);
                    });
                    req.flash('success_msg', 'New data generated');
                }
                res.redirect('/flash');
            });
    });


    //delete all messages from datbase
    app.delete('/mock/deleteAll', (req, res) => {
        Msgs.find({}).lean()
            .sort({ timestamp: 'asc' })
            .then(msgs => {
                if (msgs.length > 0){
                    Msgs.deleteMany({}, (err, results) => {
                        if (err) next(err);
                    });
                    req.flash('success_msg', 'Data succesfully deleted');
                }
                else {
                    const mockedMsgs = mock();
                    Msgs.create(mockedMsgs, (err, results) => {
                        if (err) next(err);
                    });
                    req.flash('error_msg', 'Database empty');
                }
                res.redirect('/flash');
            });
    });

    app.get('/mock/del', (req, res) =>{
        res.render('delete');
    });
}

