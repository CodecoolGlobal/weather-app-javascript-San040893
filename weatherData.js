const weatherTextToIcon = [
  { name: "Overcast", 
    day: "icon-weather-cloud", 
    night: "", 
    backgroundImg: "" },
  { name: "Cloudy", 
    day: "icon-weather-cloud", 
    night: "", 
    backgroundImg: "" },
  { name: "Sunny", 
    day: "icon-weather-sun", 
    night: "", 
    backgroundImg: "" },
  {
    name: "Partly cloudy",
    day: "icon-weather-variable-sun",
    night: "",
    backgroundImg: "",
  },
  { name: "Clear", 
    day: "icon-weather-sun", 
    night: "", 
    backgroundImg: "" },
  {
    name: "Patchy rain possible",
    day: "icon-weather-hail-sun",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy light rain with thunder",
    day: "icon-weather-hail-sun",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy rain with thunder",
    day: "icon-weather-hail-sun",
    night: "",
    backgroundImg: "",
  },
  { name: "Light rain", day: "icon-weather-rain", night: "", backgroundImg: "" },
  {
    name: "Moderate rain",
    day: "icon-weather-rain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate rain at times",
    day: "icon-weather-rain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy freezing rain",
    day: "icon-weather-rain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy rain shower",
    day: "icon-weather-rain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light rain shower",
    day: "icon-weather-rain-sun",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light freezing rain",
    day: "icon-weather-rain-sun",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy light rain",
    day: "icon-weather-rain-sun",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Heavy rain",
    day: "icon-weather-storm-11",
    night: "",
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
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light showers of ice pellets",
    day: "icon-weather-storm-11",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy showers of ice pellets",
    day: "icon-weather-storm-11",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Thundery outbreaks possible",
    day: "icon-weather-lightning",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light drizzle",
    day: "icon-weather-mistyrain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy light drizzle",
    day: "icon-weather-mistyrain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Freezing drizzle",
    day: "icon-weather-mistyrain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy freezing drizzle possible",
    day: "icon-weather-mistyrain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Heavy freezing drizzle",
    day: "icon-weather-mistyrain",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light sleet",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light sleet showers",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy sleet",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy sleet showers",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy sleet possible",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  { name: "Light snow", 
    day: "icon-weather-snow", 
    night: "", 
    backgroundImg: "" },
  {
    name: "Patchy light snow",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy light snow with thunder",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy snow possible",
    day: "icon-weather-snow",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Blowing snow",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate snow",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy moderate snow",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Heavy snow",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Patchy heavy snow",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy snow with thunder",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Light snow showers",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Moderate or heavy snow showers",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Blizzard",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  {
    name: "Ice pellets",
    day: "icon-weather-snowflake",
    night: "",
    backgroundImg: "",
  },
  { name: "Fog", day: "icon-weather-fog", night: "", backgroundImg: "" },
  { name: "Mist", day: "icon-weather-fog", night: "", backgroundImg: "" },
  {
    name: "Freezing fog",
    day: "icon-weather-fog",
    night: "",
    backgroundImg: "",
  },
];

const backgroundImage = [
    {
        condition: "cloudy",
        imgSrc: "./img/cloudy.jpg"
    },
    {
        condition: "rain",
        imgSrc: "./img/rainy.jpg"
    },
    {
        condition: "rain",
        imgSrc: "./img/rainy.jpg"
    },
    {
        condition: "sunny",
        imgSrc: "./img/sunny.jpg"
    },
    {
        condition: "snow",
        imgSrc: "./img/snow.jpg"
    },
    {
        condition: "fog",
        imgSrc: "./img/jog.webp"
    },
    {
        condition: "mist",
        imgSrc: "./img/jog.webp"
    },
    {
        condition: "clear",
        imgSrc: "./img/sunny.jpg"
    },
    {
        condition: "none",
        imgSrc: "./img/none.jpg"
    },

]
