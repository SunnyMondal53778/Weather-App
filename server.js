import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url'; // Import for converting URL to path
import { dirname } from 'path'; // Import to get directory name

dotenv.config();

// Define __dirname manually for ES Modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
const __dirname = dirname(__filename); // Get the directory name of the current file

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve index.html when accessing the root URL "/"
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`); // Use the dynamically defined __dirname
});

// Weather route
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ message: "Error fetching data" });
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
