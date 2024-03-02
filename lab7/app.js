const apiKey = "09b67f3bfc34d0aae233b5ce0ba6876b";

const cityInput = document.querySelector(".city-input");
const countrySelect = document.querySelector("#country-select");
const citiesContainer = document.querySelector(".cities-container");

let savedCities = JSON.parse(localStorage.getItem("cities")) || [];

document.addEventListener("DOMContentLoaded", () => {
  loadSavedCities();
});

async function loadSavedCities() {
  const savedCitiesStorage = localStorage.getItem("cities");

  if (savedCitiesStorage) {
    savedCities = JSON.parse(savedCitiesStorage);

    for (const city of savedCities) {
      try {
        const weatherData = await getWeather(city);
        if (weatherData && weatherData.cod && weatherData.cod !== "404") {
          updateUI(city, weatherData);
        } else {
          throw new Error("City not found.");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

async function getWeather(city, country) {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function updateUI(city, weatherData) {
  const { main, weather } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  const cityElement = document.createElement("div");
  cityElement.classList.add("city");
  cityElement.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${main.temp} °C</p>
    <p>Humidity: ${main.humidity} %</p>
    <img src="${weatherIcon}" alt="Weather Icon">
    <button onclick="removeCity('${city}')">Remove</button>
  `;

  citiesContainer.appendChild(cityElement);
}

const maxCities = 10;

function formatCityName(city) {
  return city
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function addCity() {
  const cityInputValue = cityInput.value.trim();
  const city = cityInputValue.toLowerCase();

  const country = countrySelect.value;

  if (city) {
    if (savedCities.length < maxCities) {
      const formattedCity = formatCityName(city);

      if (
        !savedCities.some(
          (savedCity) => savedCity.toLowerCase() === formattedCity.toLowerCase()
        )
      ) {
        try {
          const weatherData = await getWeather(city, country);

          if (weatherData.cod && weatherData.cod === "404") {
            throw new Error("City not found");
          }

          savedCities.push(formattedCity);
          localStorage.setItem("cities", JSON.stringify(savedCities));

          updateUI(formattedCity, weatherData);
          cityInput.value = "";
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      } else {
        alert("This city is already in the list.");
      }
    } else {
      alert("You can add max 10 cities.");
    }
  } else {
    alert("Please enter a city.");
  }
}

function removeCity(city) {
  savedCities = savedCities.filter((savedCity) => savedCity !== city);
  localStorage.setItem("cities", JSON.stringify(savedCities));

  const cityElements = document.querySelectorAll(".city");
  cityElements.forEach((cityElement) => {
    if (cityElement.textContent.includes(city)) {
      cityElement.remove();
    }
  });
}
