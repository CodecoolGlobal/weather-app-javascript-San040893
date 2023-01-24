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

/**Function sends GET request to URL,
 * in case of success returns Promise,
 * otherwide error will be thrown
 * @param {string} url, 
 * @param {string} errorMsg, 
 * @returns {Promise} Promise(data,json())
 */
function getJSONData(url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
}
/**Function formats parameter Object
 * and convert it into usable query String
 * @param {Object} p 
 * @returns Formated String 
 */
function formatParameters(p) {
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
  const url = `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input.value}`;
  getJSONData(url, "Problem getting Locations")
    .then((locations) => populateAutocompleteList(locations))
    .catch((error) => console.log("Error", error));
});

function getWeatherData(parameters) {
  const url = `${weather_api_path}${forecast_weather}${parameters}`;
  return getJSONData(url, "Problem getting Weather Data");
}

 // test get weather data //
(async () => {
  const weatherData = await getWeatherData(formatParameters(parameters));
  renderWeather(weatherData)
  console.log(weatherData);
  
})();
 

function renderWeather(weatherData){
  // render Weather-box 
  document.getElementById("current-city").innerText = weatherData.location.name;
  document.getElementById("current-temperature").innerHTML = `${weatherData.current.temp_c}&#8451`;
  document.getElementById("current-condition").innerText = weatherData.current.condition.text;
  document.getElementById("current-feel").innerHTML = `Feels like ${weatherData.current.feelslike_c}&#8451`;
  document.getElementById("geo-position").innerHTML = `H: ${weatherData.location.lat.toFixed()}  L:${weatherData.location.lon.toFixed()}`;
  
  // render weather-extra-info
  document.getElementById("current-wind").innerHTML = `H: ${weatherData.current.wind_kph} km/h `;
  document.getElementById("current-precip_mm").innerHTML = `L:${weatherData.current.precip_mm} mm`;
  document.getElementById("current-cloud").innerHTML = `H: ${weatherData.current.cloud} %`;





  // render weather prognosis
}






async function getPicUrl (dataName){
  const PEXELS_API = "dg6HLQTArwkI5XkCB7eBS7I5rhH9Sm78PkdkRYoBheFizFof55f0Q5db "
  const picUrl = `https://api.pexels.com/v1/search`
  const cityParameter = {

    query: dataName,
    orientation: "Landscape",
    size: "medium",
    per_page: 1
  }
  const cityParameterString = formatParameters(cityParameter)
  const changePicUrl = `${picUrl}${cityParameterString}`;

  const myHeaders = new Headers({Authorization: PEXELS_API});

  const myRequest = new Request(changePicUrl, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  });

  const cityData = await getJSONData(myRequest, "Problem getting Locations");
  return (cityData.photos[0].src.medium).split("?")[0];
}



async function changeBackgroundPic(cityName){
  document.body.style.backgroundImage = `url("${await getPicUrl(cityName)}")`;
}
 

function updateWeather() {
  console.log("Sunny");
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    updateWeather();
    changeBackgroundPic(input.value);
  }
});
