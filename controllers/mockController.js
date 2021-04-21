const Msgs = require('../models/MsgModel');
const mock = require('../config/mocking');

module.exports = function (app) {

    //add random-generated messages to database
    app.get('/mock/gen', function (req, res) {
        Msgs.find({}).lean()
            .sort({ timestamp: 'asc' })
            .then(msgs => {
                if (msgs.length > 0){
                    req.flash('error_msg', 'Data is already present on database');
                }
                else {
                    const mockedmsgs = mock();
                    Msgs.create(mockedmsgs, (err, results) => {
                        if (err) console.log(err);
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
                        if (err) console.log(err);
                    });
                    req.flash('success_msg', 'Data succesfully deleted');
                }
                else {
                    req.flash('error_msg', 'Attempt to delete from empty database');
                }
                res.redirect('/flash');
            });
    });

    app.get('/mock/del', (req, res) =>{
        res.render('delete');
    });
}

