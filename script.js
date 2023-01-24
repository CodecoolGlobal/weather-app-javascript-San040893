const API_KEY_Z = "a1e553a5f6344ec9933112310232301";
const weather_api_path = "http://api.weatherapi.com/v1";
const current_weather = "/current.json";
const forecast_weather = "/forecast.json";

const parameters = new URLSearchParams({
  key: API_KEY_Z,
  q: "Vienna",
  days: 2,
});

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
