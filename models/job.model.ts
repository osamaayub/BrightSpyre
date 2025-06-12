// models/Job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
            title: { type: String, required: true },
            description: { type: String, required: true },
            category_name: { type: String },
            city: { type: String },
            country: { type: String },
            salary: { type: Number },
            end_date: { type: Date },
            encrypted_id: { type: String, required: true, unique: true },
            organization_logo: { type: String },
    },
    { timestamps: true }
);

// Avoid Overwrite Error in Next.js (due to hot reloading)
export default mongoose.models.Job || mongoose.model("Job", JobSchema);
