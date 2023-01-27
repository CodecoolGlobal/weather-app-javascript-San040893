const weatherTextToIcon = [
  { name: "Overcast", 
    day: "icon-weather-cloud", 
    night: "icon-weather-cloud", 
    backgroundImg: "" },
  { name: "Cloudy", 
    day: "icon-weather-cloud", 
    night: "icon-weather-cloud", 
    backgroundImg: "" },
  { name: "Sunny", 
    day: "icon-weather-sun", 
    night: "icon-weather-moon", 
    backgroundImg: "" },
  {
    name: "Partly cloudy",
    day: "icon-weather-variable-sun",
    night: "icon-weather-variable-halfmoon",
    backgroundImg: "",
  },
  { name: "Clear", 
    day: "icon-weather-sun", 
    night: "icon-weather-moon", 
    backgroundImg: "" },
  {
    name: "Patchy rain possible",
    day: "icon-weather-hail-sun",
    night: "icon-weather-rain-halfmoon",
    backgroundImg: "",
  },
  {
    name: "Patchy light rain with thunder",
    day: "icon-weather-hail-sun",
    night: "icon-weather-rain-halfmoon",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy rain with thunder",
    day: "icon-weather-hail-sun",
    night: "icon-weather-rain-halfmoon",
    backgroundImg: "",
  },
  { name: "Light rain", day: "icon-weather-rain", night: "icon-weather-rain", backgroundImg: "" },
  {
    name: "Moderate rain",
    day: "icon-weather-rain",
    night: "icon-weather-rain",
    backgroundImg: "",
  },
  {
    name: "Moderate rain at times",
    day: "icon-weather-rain",
    night: "icon-weather-rain",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy freezing rain",
    day: "icon-weather-rain",
    night: "icon-weather-rain",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy rain shower",
    day: "icon-weather-rain",
    night: "icon-weather-rain",
    backgroundImg: "",
  },
  {
    name: "Light rain shower",
    day: "icon-weather-rain-sun",
    night: "icon-weather-rain",
    backgroundImg: "",
  },
  {
    name: "Light freezing rain",
    day: "icon-weather-rain-sun",
    night: "icon-weather-rain-halfmoon",
    backgroundImg: "",
  },
  {
    name: "Patchy light rain",
    day: "icon-weather-rain-sun",
    night: "icon-weather-rain-halfmoon",
    backgroundImg: "",
  },
  {
    name: "Heavy rain",
    day: "icon-weather-storm-11",
    night: "icon-weather-storm-11",
    backgroundImg: "",
  },
  {
    name: "Heavy rain at times",
    day: "icon-weather-storm-11",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Torrential rain shower",
    day: "icon-weather-storm-11",
    night: "icon-weather-storm-11",
    backgroundImg: "",
  },
  {
    name: "Light showers of ice pellets",
    day: "icon-weather-storm-11",
    night: "icon-weather-storm-11",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy showers of ice pellets",
    day: "icon-weather-storm-11",
    night: "icon-weather-storm-11",
    backgroundImg: "",
  },
  {
    name: "Thundery outbreaks possible",
    day: "icon-weather-lightning",
    night: "icon-weather-lightning",
    backgroundImg: "",
  },
  {
    name: "Light drizzle",
    day: "icon-weather-mistyrain",
    night: "icon-weather-mistyrain",
    backgroundImg: "",
  },
  {
    name: "Patchy light drizzle",
    day: "icon-weather-mistyrain",
    night: "icon-weather-mistyrain",
    backgroundImg: "",
  },
  {
    name: "Freezing drizzle",
    day: "icon-weather-mistyrain",
    night: "icon-weather-mistyrain",
    backgroundImg: "",
  },
  {
    name: "Patchy freezing drizzle possible",
    day: "icon-weather-mistyrain",
    night: "icon-weather-mistyrain",
    backgroundImg: "",
  },
  {
    name: "Heavy freezing drizzle",
    day: "icon-weather-mistyrain",
    night: "icon-weather-mistyrain",
    backgroundImg: "",
  },
  {
    name: "Light sleet",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  {
    name: "Light sleet showers",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy sleet",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy sleet showers",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  {
    name: "Patchy sleet possible",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  { name: "Light snow", 
    day: "icon-weather-snow", 
    night: "icon-weather-snow", 
    backgroundImg: "" },
  {
    name: "Patchy light snow",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  {
    name: "Patchy light snow with thunder",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "icon-weather-snow",
  },
  {
    name: "Patchy snow possible",
    day: "icon-weather-snow",
    night: "icon-weather-snow",
    backgroundImg: "",
  },
  {
    name: "Blowing snow",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Moderate snow",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Patchy moderate snow",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Heavy snow",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Patchy heavy snow",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy snow with thunder",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Light snow showers",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy snow showers",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Blizzard",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  {
    name: "Ice pellets",
    day: "icon-weather-snowflake",
    night: "icon-weather-snowflake",
    backgroundImg: "",
  },
  { name: "Fog", day: "icon-weather-fog", night: "icon-weather-fog", backgroundImg: "" },
  { name: "Mist", day: "icon-weather-fog", night: "icon-weather-fog", backgroundImg: ""},
  {
    name: "Freezing fog",
    day: "icon-weather-fog",
    night: "icon-weather-fog",
    backgroundImg: "",
  },
];

const backgroundImage = [
    {
        condition: "cloudy",
        imgSrc: "./img/cloudy.jpg",
        imgSrcNight: "./img/night.webp"

    },
    {
        condition: "rain",
        imgSrc: "./img/rainy.jpg",
        imgSrcNight: "./img/rain_night.jpg"

    },
    {
        condition: "rain",
        imgSrc: "./img/rainy.jpg",
        imgSrcNight: "./img/rain_night.jpg"

    },
    {
        condition: "sunny",
        imgSrc: "./img/sunny.jpg",
        imgSrcNight: "./img/night.webp"

    },
    {
        condition: "snow",
        imgSrc: "./img/snow.jpg",
        imgSrcNight: "./img/snow_night.jpg"

    },
    {
        condition: "fog",
        imgSrc: "./img/jog.webp",
        imgSrcNight: "./img/fog_night.jpg"

    },
    {
        condition: "mist",
        imgSrc: "./img/jog.webp",
        imgSrcNight: "./img/fog_night.jpg"

    },
    {
        condition: "clear",
        imgSrc: "./img/sunny.jpg",
        imgSrcNight: "./img/night.webp"

    },
    {
        condition: "none",
        imgSrc: "./img/none.jpg",
        imgSrcNight: "./img/none.jpg"

    },

]
const temperatureBackgroundColor = [
  {
    min: -100,
    color: "#28526387",
    max: -0,
  },
  {
    min: -0,
    color: "#0f1b3187",
    max: 10,
  },
  {
    min: 10,
    color: "#28634687",
    max: 20,
  },
  {
    min: 20,
    color: "#63602887",
    max: 30,
  },
  {
    min: 30,
    color: "#bd575287",
    max: 40,
  },
  {
    min: 40,
    color: "#632c2887",
    max: 100,
  }
]