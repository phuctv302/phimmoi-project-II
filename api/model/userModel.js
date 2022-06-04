const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide us your name!'],
            trim: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        email: {
            type: String,
            required: [true, 'Please provide us your name!'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide us your email!'],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: [8, 'Password must have at least 8 characters!'],
            select: false,
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: {
                validator: function (val) {
                    return val === this.password;
                },
                message: 'Passwords are not the same!',
            },
        },
        
        data: Object
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

/* HASH PASSWORD WHEN CREATING NEW USER || CHANGE PASSWORD*/
userSchema.pre('save', function(next){
    if (!this.isModified('password')) return next();

    this.password = bcrypt.hash(this.password, 12);

    next();
})


/* CHECK PASSWORD WHEN LOGGING IN */
userSchema.methods.correctPassword = async function(inputPass, userPass){
    return await bcrypt.compare(inputPass, userPass);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
