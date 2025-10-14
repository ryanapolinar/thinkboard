// Packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import path from "path";

// Routes
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


// Set up .env variables
dotenv.config();

// Connect to database
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

/* MIDDLEWARE
* After sending request, server sends response.
* Middleware comes in after the server sends response and modifies it.
*
* Popular use cases: auth check, rate limiting (Upstash Redis)
*/

// Use localhost when developing locally
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}

app.use(express.json()); // middleware parses JSON bodies: gives us access to request.body
app.use(rateLimiter);


// simple custom middleware
// app.use((request, response, next) => {
//     console.log(`Request method is ${request.method} & request URL is ${request.url}`);
//     next();
// })

// Routes
app.use("/api/notes", notesRoutes)

// When on production, handle the frontend at the same location as the backend
if (process.env.NODE_ENV === "production") {
    // Serve the frontend react application as a static asset under the backend.
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (request, response) => {
        response.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
})
}

// Start the server AFTER we connect to the database
connectDB().then(() => {
    // Start the server
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT)
    });
})



