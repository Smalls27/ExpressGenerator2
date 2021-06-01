const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const someSchema = mongoose.Schema;

const userSchema = new someSchema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: String,
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);