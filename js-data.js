function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hour}:${minutes}`;
}

// let dayOne = document.querySelector("#dayOne");
// let dayTwo = document.querySelector("#dayTwo");
// let dayThree = document.querySelector("#dayThree");
// let dayFour = document.querySelector("#dayFour");
// let dayFive = document.querySelector("#dayFive");
// let daySix = document.querySelector("#daySix");

function showTemperature(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#citySearched");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#speed");
  // let searchLat = response.data.coord.lat;
  // let searchLon = response.data.coord.lon;
  let currentDate = document.querySelector("#date-display");
  let iconElement = document.querySelector("#currentTempIcon");
  // let apiKey = "55b97e6fc2cb7988f72fb6de6b7eef45";
  // let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;
  celsiusTemperature = response.data.main.temp;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  // axios.get(`${forecastUrl}`).then(sixDayForecast);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "55b97e6fc2cb7988f72fb6de6b7eef45";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);

  // apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  // axios.get(`${apiUrl}`).then(sixDayForecast);
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

// function sixDayForecast(response) {
//   console.log(response.data);
//   let dayOneTemp = document.querySelector("#dayOneTemp");
//   let dayTwoTemp = document.querySelector("#dayTwoTemp");
//   let dayThreeTemp = document.querySelector("#dayThreeTemp");
//   let dayFourTemp = document.querySelector("#dayFourTemp");
//   let dayFiveTemp = document.querySelector("#dayFiveTemp");
//   let daySixTemp = document.querySelector("#daySixTemp");
//   dayOneTemp.innerHTML = Math.round(response.data.daily[0].temp.max);
//   dayTwoTemp.innerHTML = Math.round(response.data.daily[1].temp.max);
//   dayThreeTemp.innerHTML = Math.round(response.data.daily[2].temp.max);
//   dayFourTemp.innerHTML = Math.round(response.data.daily[3].temp.max);
//   dayFiveTemp.innerHTML = Math.round(response.data.daily[4].temp.max);
//   daySixTemp.innerHTML = Math.round(response.data.daily[5].temp.max);
// }
// function farenheitWeather(event) {
//   event.preventDefault();
//   let displayFarenheit = document.querySelector("#temperature");
//   displayFarenheit.innerHTML = "70°";
// }
// let farenheit = document.querySelector("#farenheit-link");
// farenheit.addEventListener("click", farenheitWeather);
