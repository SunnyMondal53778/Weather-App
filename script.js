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
        // Decode API key when making the request
        const apiKey = atob(encodedKey);
        const response = await fetch(`${apiUrl}${encodeURIComponent(city)}&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            errorElement.textContent = "Invalid city name";
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
            return;
        }

        // Update UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update weather icon based on weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                break;
            default:
                weatherIcon.src = "images/clouds.png";
        }

        errorElement.style.display = "none";
        weatherElement.style.display = "block";
    } catch (error) {
        console.error("Weather fetch error:", error);
        errorElement.textContent = "An error occurred while fetching weather data. Please try again.";
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Add enter key support
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
