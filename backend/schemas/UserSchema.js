const { Schema } = require("mongoose");

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String }, // Optional: User's display name
});

module.exports = { UserSchema };