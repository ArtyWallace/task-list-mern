const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false},
    date: { type: Date, default: Date.now },
    list: { type: mongoose.Types.ObjectId, ref: 'List' }
});

module.exports = mongoose.model('Task', taskSchema);