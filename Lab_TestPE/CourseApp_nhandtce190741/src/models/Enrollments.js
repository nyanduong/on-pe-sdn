const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId
    },
    course: {
        type: mongoose.Schema.Types.ObjectId
    },
    progressPercentage: {
        type: Number
    },
    status: {
        type: String,
        enum: ["enrolled", "completed"],
        default: "enrolled"
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);