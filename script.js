const API_KEY = "6291b1eb57924843b8b234211232301";
const weather_api_path = "http://api.weatherapi.com/v1";
const current_weather = "/current.json";
const forecast_weather = "/forecast.json";
const parameters = {
  key: API_KEY,
  q: "Vienna",
  days: 2,
};

const input = document.getElementById("input-cities");
const dataList = document.getElementById("cities");

const buildOptions = (text) => `<option value="${text}"></option>`;

function getJSONData(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
}

function getParameters(p) {
  const parameters = new URLSearchParams(p);
  return `?${parameters.toString()}`;
}

function populateAutocompleteList(locations) {
  for (const location of locations) {
    dataList.insertAdjacentHTML("beforeend", buildOptions(location.name));
  }
}

input.addEventListener("keyup", () => {
  dataList.innerHTML = "";

  if (input.value.length < 3) {
    return;
  }

  fetch(
    `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input.value}`
  )
    .then((response) => response.json())
    .then((locations) => populateAutocompleteList(locations))
    .catch((error) => console.log("Error", error));
});

async function getWeatherData(parameters) {
  const weatherData = await fetch(
    `${weather_api_path}${forecast_weather}${parameters}`
  );
  if (!weatherData.ok) throw new Error("Problem getting weather data");
  const data = await weatherData.json();
  return data;
}

(async () => {
  const weatherData = await getWeatherData(getParameters(parameters));
  console.log(weatherData);
})();
