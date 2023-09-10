const { mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Enter an username']
    },
    password: {
        type: String,
        required: [true, 'Please Enter a password'],
        minlength: [6, 'minimum password length is 6 characters']   
    }
});

//bcrypt before saving of data
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//login function
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Password Incorrect');
    }
    throw Error('Incorrect username');
}

const User = mongoose.model('user', userSchema);
module.exports = User;