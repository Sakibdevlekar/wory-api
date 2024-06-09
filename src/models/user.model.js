const { Schema, model } = require("mongoose");
const { hashCount } = require("../constant");
const { compare, hash } = require("bcrypt");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        userType: {
            type: Number,
            required: true,
            default: 0, // 0 = freelancer; 1 = client
        },
        refreshToken: {
            type: String,
            default: null,
            select: false,
        },
    },
    { timestamps: true },
);

/**
 * Runs before the user document is saved to the database.
 * If the password field is modified, it hashes the password using bcrypt.
 * @param {import("mongoose").HookNextFunction} next - A callback function to continue the save process.
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hash(this.password, hashCount);
});

/**
 * Compares the given plaintext password with the hashed password stored in the database.
 * @param {string} password - The plaintext password to compare with the hashed password.
 * @returns {boolean} `true` if the passwords match, `false` otherwise.
 */
userSchema.methods.isPasswordCorrect = async function (password) {
    return await compare(password, this.password);
};

module.exports = model("User", userSchema);
