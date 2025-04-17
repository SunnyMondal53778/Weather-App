// Using Base64 encoded API key for basic obfuscation
const encodedKey = "ZjFiOGI5OTBjNTk3YWI0ZDYzMmY3YmZjZTIxY2U4NWM=";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const errorElement = document.querySelector(".error");
    const weatherElement = document.querySelector(".weather");

    if (!city) {
        errorElement.textContent = "Please enter a city name.";
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
        return;
    }

    try {
        const apiKey = atob(encodedKey);
        const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.cod === "404") {
            errorElement.textContent = "City not found. Please check the spelling and try again.";
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
            return;
        }

        if (data.cod !== 200) {
            throw new Error('Weather data not available');
        }

        // Update UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on weather condition
        const weatherMain = data.weather[0].main.toLowerCase();
        const iconMap = {
            'clouds': 'clouds.png',
            'clear': 'clear.png',
            'rain': 'rain.png',
            'drizzle': 'drizzle.png',
            'mist': 'mist.png',
            'snow': 'snow.png'
        };

        weatherIcon.src = `images/${iconMap[weatherMain] || 'clouds.png'}`;
        
        errorElement.style.display = "none";
        weatherElement.style.display = "block";
    } catch (error) {
        console.error("Weather fetch error:", error);
        errorElement.textContent = "Network error. Please check your connection and try again.";
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
