const Msgs = require('../models/MsgModel');
const express = require('express');

module.exports = function (app) {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Index page
    app.get('/', (req, res) => {
        const title = 'Welcome';
        res.render('index', {
            title: title
        });
    });

    // Empty flash page
    app.get('/flash', (req, res) => {
        res.render('flash', {
        });
    });

    // About page
    app.get('/about', (req, res) => {
        res.render('about');
    });

    //read data from database, convert to human readable and render to send to browser
    app.get('/api/msgs', (req, res) => {
        Msgs.find({}).lean()
            .sort({ timestamp: 'asc' })
            .then(msgs => {
                if(msgs.length > 0) {
                    msgs.forEach( msg => msg.timestamp = new Date(msg.timestamp * 1000).toLocaleString());
                    res.render('gasdata/display', {
                        msgs: msgs
                    });
                }
                else {
                    req.flash('error_msg', 'No data to display');
                    res.redirect('/flash');
                }
            });
    });
}