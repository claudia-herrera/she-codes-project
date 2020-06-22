let now = new Date();
let currentDate = document.querySelector("#date-display");
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

// function showWeather(event) {
//   event.preventDefault();
//   let displayCelsius = document.querySelector("span");
//   displayCelsius.innerHTML = "20°";
// }
// let celsius = document.querySelector("#celsius-link");
// celsius.addEventListener("click", showWeather);

// function farenheitWeather(event) {
//   event.preventDefault();
//   let displayFarenheit = document.querySelector("#temperature");
//   displayFarenheit.innerHTML = "70°";
// }
// let farenheit = document.querySelector("#farenheit-link");
// farenheit.addEventListener("click", farenheitWeather);

function currentPosition() {
  navigator.geolocation.getCurrentPosition(currentLocationWeather);
}
function currentLocationWeather(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "55b97e6fc2cb7988f72fb6de6b7eef45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function cityLookup(event) {
  event.preventDefault();
  let city = document.querySelector("#city-text-input");
  let apiKey = "55b97e6fc2cb7988f72fb6de6b7eef45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("click", cityLookup);
let currentSearch = document.querySelector("#current-location");
currentSearch.addEventListener("click", currentPosition);

function showTemperature(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temp}°C `;
  let currentCityValue = response.data.name;
  let currentCityName = document.querySelector("#citySearched");
  currentCityName.innerHTML = `${currentCityValue}`;
}

// let currentSearch = document.querySelector("#currentLocation");
// currentSearch.addEventListener("click", currentLocation);
// console.log(working);
// function currentLocation() {
//   navigator.geolocation.getCurrentPosition(currentLocationWeather);
// }
//

// function showTemperature(response) {
//   console.log(response.data.main.temp);
//   let temp = Math.round(response.data.main.temp);
//   let currentTemperature = document.querySelector("#temperature");
//   currentTemperature.innerHTML = `${temp}`;
// }

// function showTemperature(response) {
//   console.log(response.data.main.temp);
//   let temp = Math.round(response.data.main.temp);
//   let currentTemperature = document.querySelector("#temperature");
