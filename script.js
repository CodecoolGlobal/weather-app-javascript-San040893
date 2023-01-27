const weatherApiUrl = "http://api.weatherapi.com/v1";
const weatherApiKey = "6291b1eb57924843b8b234211232301";
const pexelApiUrl = `https://api.pexels.com/v1/search`;
const pexelsApiKey =
  "dg6HLQTArwkI5XkCB7eBS7I5rhH9Sm78PkdkRYoBheFizFof55f0Q5db ";


const searchCityUrl = "/search.json";
const currentWeatherUrl = "/current.json";
const forecastWeatherUrl = "/forecast.json";
const weatherSimpleData = {};

const currentCityElement = document.getElementById("current-city");
const currentTemperatureElement = document.getElementById("current-temperature");
const currentConditionElement = document.getElementById("current-condition");
const currentFeelElement = document.getElementById("current-feel");
const geoPositionElement = document.getElementById("geo-position");
const currentWindElement = document.getElementById("current-wind");
const currentPercipElement = document.getElementById("current-precip_mm");
const currentCloudElement = document.getElementById("current-cloud");
const favoriteIconElement = document.getElementById("favoriteIcon");
const hourlyForecastElements = document.querySelectorAll(
  ".weather-prognosis-box-hour"
);

const inputElement = document.getElementById("input-cities");
const dataListElement = document.getElementById("cities");
const dataListFavoriteElement = document.getElementById("favorite");

//############################################################################
//////////////////////////GENERAL FUNCTIONS //////////////////////////////////

/**Function sends GET request to URL,
 * in case of success returns Promise,
 * otherwise error will be thrown
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
 * and converts it into usable query String
 * @param {Object} p
 * @returns Formated String
 */
function formatParameters(p) {
  const parameters = new URLSearchParams(p);
  return `?${parameters.toString()}`;
}

/**Function checks if a sentence starts with 
 * a word 
 * @param {string} word 
 * @param {string} sentence 
 * @returns {boolean} - true/false
 */
function doesStartWith(word, sentence){
  const re = new RegExp(`^${word.toLowerCase()}`,"g");
  return re.test(sentence.toLowerCase())
}


////////////////////WEATHER DATA RELATED FUNCTIONS //////////////////////////

async function updateWeather(cityName) {
  try {
    toggleSpinnerAndWeatherBox();
    const parameters = {
      key: weatherApiKey,
      q: cityName,
      days: 2,
    };
    const weatherData = await getWeatherData(formatParameters(parameters));
    renderWeather(weatherData);
  } catch (error) {
    resetHTMLWeatherData();
    weatherSimpleData["condition"] = null;
    iconToBackgroundImg();
    currentCityElement.innerText = "City not found";
    console.error(error);
  } finally {
    toggleSpinnerAndWeatherBox();
  }
}

function resetHTMLWeatherData() {
  document.querySelectorAll(".reset").forEach((el) => (el.innerText = "-"));
}

function toggleSpinnerAndWeatherBox() {
  document.getElementById("spinner-box").classList.toggle("hide");
  document.getElementById("weather-box").classList.toggle("hide");
}

function getWeatherData(parameters) {
  const url = `${weatherApiUrl}${forecastWeatherUrl}${parameters}`;
  return getJSONData(url, "Problem getting Weather Data");
}

function renderWeather(weatherData) {
  weatherSimpleData["condition"] = weatherData.current.condition.text.toLowerCase();
  weatherSimpleData["is_day"] = weatherData.current.is_day;

  // render Weather-box
  currentCityElement.innerText = weatherData.location.name;
  currentTemperatureElement.innerHTML = `${weatherData.current.temp_c}&#8451`;
  currentConditionElement.innerText = weatherData.current.condition.text;
  currentFeelElement.innerHTML = `Feels like ${weatherData.current.feelslike_c}&#8451`;
  geoPositionElement.innerHTML = `H: ${weatherData.location.lat.toFixed()}  L:${weatherData.location.lon.toFixed()}`;
 
  // render weather-extra-info
  currentWindElement.innerHTML = `${weatherData.current.wind_kph} kph `;
  currentPercipElement.innerHTML = `${weatherData.current.precip_mm} mm`;
  currentCloudElement.innerHTML = `${weatherData.current.cloud} %`;

  // render weather prognosis
  renderForecastHourly(weatherData);
}

function renderForecastHourly(weatherData) {
  const hour = parseInt(
    weatherData.location.localtime.split(" ")[1].split(":")[0]
  );
  
  hourlyForecastElements.forEach((el, index) => {
    const day = hour + index > 24 ? 1 : 0;
    let { time, temp_c, condition, is_day } =
      weatherData.forecast.forecastday[day].hour[(hour + index) % 24];
    time = parseInt(time.split(" ")[1]);
    el.style.height = 7 + (5 / 30) * temp_c + "rem";
    const iconStyle = weatherTextToIcon.find(el=>el.name === condition.text);
    const iconStyleModule = is_day === 1 ? iconStyle.day : iconStyle.night;

    el.innerHTML = `
      <i class="${iconStyleModule}"></i>  
      <div class="small-text reset">${temp_c}&#8451;</div>
      <div class="small-text reset">${time} h</div>`;
  });
}

//////////////BACKGROUND IMAGE RELATED FUNCTIONS/////////////////////////

async function changeBackgroundPic(cityName) {
  try {
    const cityParameter = {
      query: cityName,
      orientation: "Landscape",
      size: "medium",
      per_page: 1,
    };
    const cityData = await getPicData(formatParameters(cityParameter));
    const picUrl = parsePicUrl(cityData);
    document.body.style.backgroundImage = `url("${picUrl}")`;
  } catch (error) {
    console.error(error);
    iconToBackgroundImg();
  }
}

async function getPicData(cityParameter) {
  const requestPicUrl = `${pexelApiUrl}${cityParameter}`;
  const myHeaders = new Headers({ Authorization: pexelsApiKey });
  const myRequest = new Request(requestPicUrl, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });

  return await getJSONData(myRequest, "Problem getting Locations");
}

function parsePicUrl(cityData) {
  if (cityData.photos.length === 0) {
    return iconToBackgroundImg();
  } else {
    return cityData.photos[0].src.original;
  }
}

function iconToBackgroundImg() {
  if (weatherSimpleData.condition === null) return "./img/none.jpg";
  const imageResource = backgroundImage.find(el => weatherSimpleData.condition.toLowerCase().includes(el.condition));
  return imageResource.imgSrc;
}

/////////////////////////INPUT RELATED FUNCTIONS//////////////////////
const buildOptions = (text) => `<option value="${text}"></option>`;

function getLocationList(searchCity){
  parameters = {
    key: weatherApiKey,
    q: searchCity
  }
  const url = `${weatherApiUrl}${searchCityUrl}${formatParameters(parameters)}`;
  return getJSONData(url, "Problem getting Locations");
}

function populateAutocompleteList(locations, searchCity) {
  for (const location of locations) {
    if (doesStartWith(searchCity, location.name) /* && !isInDataList(location.name) */) {
      dataListElement.insertAdjacentHTML("beforeend", buildOptions(location.name));
    }
  }
}

function isInDataList(name) {
  const item = [];
  dataListElement.children.forEach(el=>{item.push(el.value)});
  if (item.includes(name)) return true;
  return false;
}

///////////////////////////MAIN FUNCTION///////////////////////////////
//#####################################################################
function main() {
  updateWeather("Vienna");
  changeBackgroundPic("Vienna");
}

//#####################################################################
//////////////////////////////EVENT LISTENERS//////////////////////////

favoriteIconElement.addEventListener("click", () => {
  dataListFavoriteElement.insertAdjacentHTML( "beforeend", buildOptions(currentCityElement.innerText));
});

addEventListener("keypress", function (e) {
  if (e.key == "f") {
    dataListElement.innerHTML = dataListFavoriteElement.innerHTML;
  }
});

inputElement.addEventListener("keyup", async () => {
  dataListElement.innerHTML = "";

  if (inputElement.value.length < 3) {
    return;
  }
  try {
    const locations = await getLocationList(inputElement.value);
    populateAutocompleteList(locations, inputElement.value);
  } catch (error) {
    console.error("Error", error);
  }
});

inputElement.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    updateWeather(inputElement.value);
    changeBackgroundPic(inputElement.value);
    inputElement.value = "";
  }
});

//////////////CALL TO MAIN FUNCTION///////////////
//################################################
main();
//################################################

