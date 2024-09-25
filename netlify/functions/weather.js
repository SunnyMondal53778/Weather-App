const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const city = event.queryStringParameters.city;
    const apiKey = process.env.API_KEY; // Ensure your API key is set in Netlify environment variables
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ message: "Error fetching data" }),
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Server error" }),
        };
    }
};
