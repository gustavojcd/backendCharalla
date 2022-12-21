const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
})

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const UserModel = model('user', UserSchema)

module.exports = {
    UserModel
}