import mongoose, { Schema } from "mongoose";

const MeetSchema = new Schema(
    {
        meetUrl: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Meet || mongoose.model("Meet", MeetSchema, "meet");