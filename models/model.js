const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user');
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var kittySchema = mongoose.Schema({
    name: String,
    password: String,
});

module.exports = mongoose.model('Kitten', kittySchema);