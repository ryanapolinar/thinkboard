import Note from "../models/Note.js"

export async function getAllNotes (_, response) {
    try {
        // Get all notes sorted by most recent
        const notes = await Note.find().sort({createdAt:-1}); // -1 will sort by desc. order (newest first)

        // Return response
        response.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        response.status(500).json({message:"Internal server error"})
    }
}

export async function getNoteById (request, response) {
    try {
        // Finds a note by its ID
        const note = await Note.findById(request.params.id);
        if (!note) return response.status(404).json({message:"Note not found"});

        // Return response
        response.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        response.status(500).json({message:"Internal server error"})
    }
}

export async function createNote (request, response) {
    try {
        // Retrieve request information
        const {title, content} = request.body;
        const newNote = new Note( {
            title: title,
            content: content
        });

        // Save to database
        const savedNote = await newNote.save();

        // Return response
        response.status(201).json({ savedNote });
    } catch (error) {
        response.status(500).json({ message: "Internal Server Error"});
    }
}

export async function updateNote (request, response)  {
    try {
        // Retrieve request information
        const {title, content} = request.body;

        // Update Note if the ID exists
        const updatedNote = await Note.findByIdAndUpdate(
            request.params.id, 
            {title,content},
            {new: true}
        );
        if (!updatedNote) return response.status(404).json({message:"Note not found"});
        
        // Return response
        response.status(200).json({updatedNote})
    } catch (error) {
        console.error("Error in updateNote controller", error);
        response.status(500).json({message:"Internal server error"})
    }
    
}

export async function deleteNote (request, response)  {
    try {
        // Retrieve request information
        const {title, content} = request.body;

        // Find and delete
        const deletedNote = await Note.findByIdAndDelete(
            request.params.id
        );
        if (!deletedNote) return response.status(404).json({message:"Note not found"});
        
        // Return response
        response.status(200).json({message:"Note " + request.params.id + " deleted successfully."})
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        response.status(500).json({message:"Internal server error"})
    }
}