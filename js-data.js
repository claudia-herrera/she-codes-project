function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function showTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#citySearched");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");

  let currentDate = document.querySelector("#date-display");
  let iconElement = document.querySelector("#currentTempIcon");

  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);

  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function sixDayForecast(response) {
  let dayOne = document.querySelector("#dayOne");
  let dayTwo = document.querySelector("#dayTwo");
  let dayThree = document.querySelector("#dayThree");
  let dayFour = document.querySelector("#dayFour");
  let dayFive = document.querySelector("#dayFive");
  let daySix = document.querySelector("#daySix");
  let dayOneTemp = document.querySelector("#dayOneTemp");
  let dayTwoTemp = document.querySelector("#dayTwoTemp");
  let dayThreeTemp = document.querySelector("#dayThreeTemp");
  let dayFourTemp = document.querySelector("#dayFourTemp");
  let dayFiveTemp = document.querySelector("#dayFiveTemp");
  let daySixTemp = document.querySelector("#daySixTemp");
  let forecastOne = response.data.list[0];
  let forecastTwo = response.data.list[1];
  let forecastThree = response.data.list[2];
  let forecastFour = response.data.list[3];
  let forecastFive = response.data.list[4];
  let forecastSix = response.data.list[5];

  dayOne.innerHTML = `${formatHours(forecastOne.dt * 1000)}`;
  dayTwo.innerHTML = `${formatHours(forecastTwo.dt * 1000)}`;
  dayThree.innerHTML = `${formatHours(forecastThree.dt * 1000)}`;
  dayFour.innerHTML = `${formatHours(forecastFour.dt * 1000)}`;
  dayFive.innerHTML = `${formatHours(forecastFive.dt * 1000)}`;
  daySix.innerHTML = `${formatHours(forecastSix.dt * 1000)}`;
  dayOneTemp.innerHTML = `<strong>${Math.round(
    forecastOne.main.temp_max
  )}°</strong> | ${Math.round(forecastOne.main.temp_min)}°`;

  dayTwoTemp.innerHTML = `<strong>${Math.round(
    forecastTwo.main.temp_max
  )}°</strong> | ${Math.round(forecastTwo.main.temp_min)}°`;

  dayThreeTemp.innerHTML = `<strong>${Math.round(
    forecastThree.main.temp_max
  )}°</strong> | ${Math.round(forecastThree.main.temp_min)}°`;

  dayFourTemp.innerHTML = `<strong>${Math.round(
    forecastFour.main.temp_max
  )}°</strong> | ${Math.round(forecastFour.main.temp_min)}°`;

  dayFiveTemp.innerHTML = `<strong>${Math.round(
    forecastFive.main.temp_max
  )}°</strong> | ${Math.round(forecastFive.main.temp_min)}°`;

  daySixTemp.innerHTML = `<strong>${Math.round(
    forecastSix.main.temp_max
  )}°</strong> | ${Math.round(forecastSix.main.temp_min)}°`;
}
function search(city) {
  let apiKey = "55b97e6fc2cb7988f72fb6de6b7eef45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(sixDayForecast);
}

function cityLookup(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input");
  search(city.value);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let displayFarenheit = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(displayFarenheit);
}

let celsiusTemperature = null;
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", cityLookup);

let farenheitLink = document.querySelector("#farenheitLink");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Los Angeles");
