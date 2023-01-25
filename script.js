const weatherApiUrl = "http://api.weatherapi.com/v1";
const weatherApiKEY = "6291b1eb57924843b8b234211232301";
const pexelApiUrl = `https://api.pexels.com/v1/search`;
const pexelsApiKEY ="dg6HLQTArwkI5XkCB7eBS7I5rhH9Sm78PkdkRYoBheFizFof55f0Q5db ";

const current_weather = "/current.json";
const forecast_weather = "/forecast.json";
const weatherSimpleData = {};

const input = document.getElementById("input-cities");
const dataList = document.getElementById("cities");

const buildOptions = (text) => `<option value="${text}"></option>`;

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
  const url = `http://api.weatherapi.com/v1/search.json?key=${weatherApiKEY}&q=${input.value}`;
  getJSONData(url, "Problem getting Locations")
    .then((locations) => populateAutocompleteList(locations))
    .catch((error) => console.error("Error", error));
});

function getWeatherData(parameters) {
  const url = `${weatherApiUrl}${forecast_weather}${parameters}`;
  return getJSONData(url, "Problem getting Weather Data");
}

function resetHTMLWeatherData() {
  document.querySelectorAll(".reset").forEach(el=>el.innerText="-");
};


function renderForecastHourly(weatherData) {
  const hour = parseInt(
    weatherData.location.localtime.split(" ")[1].split(":")[0]
  );
  const forecastHourlyUpdateEl = document.querySelectorAll(
    ".weather-prognosis-box-hour"
  );

  forecastHourlyUpdateEl.forEach((el, index) => {
    const day = hour + index > 24 ? 1 : 0;
    let { time, temp_c, condition } = weatherData.forecast.forecastday[day].hour[(hour + index) % 24];
    time = parseInt(time.split(" ")[1]);
    el.style.height = 7 + (5 / 30) * temp_c + "rem";
    
    el.innerHTML = `
      <i class="${weatherTextToIcon[condition.text]}"></i>  
      <div class="small-text reset">${temp_c}&#8451;</div>
      <div class="small-text reset">${time} h</div>`;
  });
}

function renderWeather(weatherData) {
  weatherSimpleData["condition"] = weatherData.current.condition.text;
  
  // render Weather-box
  document.getElementById("current-city").innerText = weatherData.location.name;
  document.getElementById(
    "current-temperature"
  ).innerHTML = `${weatherData.current.temp_c}&#8451`;
  document.getElementById("current-condition").innerText =
    weatherData.current.condition.text;
  document.getElementById(
    "current-feel"
  ).innerHTML = `Feels like ${weatherData.current.feelslike_c}&#8451`;
  document.getElementById(
    "geo-position"
  ).innerHTML = `H: ${weatherData.location.lat.toFixed()}  L:${weatherData.location.lon.toFixed()}`;
  // render weather-extra-info
  document.getElementById(
    "current-wind"
  ).innerHTML = `${weatherData.current.wind_kph} kph `;
  document.getElementById(
    "current-precip_mm"
  ).innerHTML = `${weatherData.current.precip_mm} mm`;
  document.getElementById(
    "current-cloud"
  ).innerHTML = `${weatherData.current.cloud} %`;

  // render weather prognosis
  renderForecastHourly(weatherData);
}


function toggleSpinnerAndWeatherBox() {
  document.getElementById("spinner-box").classList.toggle("hide");
  document.getElementById("weather-box").classList.toggle("hide");
}

async function getPicData(cityName) {
  const cityParameter = {
    query: cityName,
    orientation: "Landscape",
    size: "medium",
    per_page: 1,
  };
  const cityParameterString = formatParameters(cityParameter);
  const requestPicUrl = `${pexelApiUrl}${cityParameterString}`;

  const myHeaders = new Headers({ Authorization: pexelsApiKEY });

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
  console.log(weatherSimpleData.condition);
  if (weatherSimpleData.condition.includes("cloudy")) {
    return "./img/cloudy.jpg";
  } else if (weatherSimpleData.condition.includes("rain")) {
    return "./img/rainy.jpg";
  } else if (weatherSimpleData.condition.includes("Sunny")) {
    return "./img/sunny.jpg";
  } else if (weatherSimpleData.condition.includes("snow")) {
    return "./img/snow.jpg";
  } else if (weatherSimpleData.condition.includes("fog")) {
    return "./img/jog.webp";
  } else {
    return "./img/none.jpg";
  }
}

async function changeBackgroundPic(cityName) {
try {
  const cityData = await getPicData(cityName);
  const picUrl = parsePicUrl(cityData);
  document.body.style.backgroundImage = `url("${picUrl}")`;
} catch (error) {
  console.error(error);
  iconToBackgroundImg();
}
}

async function updateWeather(cityName) {
  try {
    toggleSpinnerAndWeatherBox();
    const parameters = {
      key: weatherApiKEY,
      q: cityName,
      days: 2,
    };
    const weatherData = await getWeatherData(formatParameters(parameters));
    renderWeather(weatherData);
  } catch (error) {
    resetHTMLWeatherData();
    document.getElementById("current-city").innerText = "City not found";
    console.error(error);
  } finally {
    toggleSpinnerAndWeatherBox();
  }
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    updateWeather(input.value);
    changeBackgroundPic(input.value);
    input.value = "";
  }
});

