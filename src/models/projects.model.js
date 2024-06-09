const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
        },
        clientId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        division: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            required: true,
            upperCase: true,
            enum: ["LOW", "MEDIUM", "HIGH"],
            trim: true,
        },
        department: {
            type: String,
            required: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        endDate: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            required: true,
            upperCase: true,
            default: "REGISTERED",
            enum: ["REGISTERED", "RUNNING", "CANCELLED", "CLOSED"],
        },
    },
    { timestamps: true },
);

module.exports = model("Project", projectSchema);
