const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    clientId: Number,
    timestamp: Number,
    value: Number
});

const Msgs = mongoose.model('Msgs', msgSchema);

module.exports = Msgs;