const apiUrl = "/weather"; // Call your server endpoint
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
        const response = await fetch(`${apiUrl}?city=${city}`);
        if (response.status === 404) {
            errorElement.textContent = "Invalid city name";
            errorElement.style.display = "block";
            weatherElement.style.display = "none";
        } else {
            const data = await response.json();

            // Update UI with weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            // Update weather icon based on weather condition
            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/cloud.png";
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
                default:
                    weatherIcon.src = "images/default.png"; // Fallback image
            }

            weatherElement.style.display = "block";
            errorElement.style.display = "none";
        }
    } catch (error) {
        errorElement.textContent = "An error occurred while fetching the weather data.";
        errorElement.style.display = "block";
        weatherElement.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    searchBox.value = ""; // Clear the input field after searching
});
