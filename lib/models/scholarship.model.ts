import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
    url: {type: String, required: true, unique: true},
    amount: {type: String},
    deadline: {type: String},
    name: {type: String, required: true, unique: true},
    requirements: {type: String},
    users: [
        {email: {type: String, required: true}}
    ], default: [],
}, {timestamps: true})

const Scholarship = mongoose.models.Scholarship || mongoose.model('Scholarship', scholarshipSchema)

export default Scholarship;