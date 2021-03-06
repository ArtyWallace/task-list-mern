const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    owner: { type: mongoose.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('List', listSchema);

