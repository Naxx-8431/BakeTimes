const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    recipeName: {
        type: String,
        required: [true, 'Recipe name is required'],
        trim: true
    },
    question: {
        type: String,
        required: [true, 'Question text is required'],
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
