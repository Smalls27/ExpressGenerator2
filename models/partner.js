const mongoose = require('mongoose');
const someSchema = mongoose.Schema;

const partnerSchema = new someSchema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    image: {
        type: String,
        required: true,
    },

    featured: {
        type: Boolean
    },

    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;