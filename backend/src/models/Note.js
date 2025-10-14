import mongoose from "mongoose";

// 1 - Create a schema
// 2 - Then, make a model based off of the schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }  
    },
    { timestamps : true } // mongoose provides createdAt, updatedAt for free
)

const Note = mongoose.model("Note", noteSchema);

export default Note;