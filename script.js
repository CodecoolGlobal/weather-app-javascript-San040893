const API_KEY = "6291b1eb57924843b8b234211232301";

const input = document.getElementById("input-cities");
const dataList = document.getElementById("cities");

const buildOptions = (text) => `<option value="${text}"></option>`;

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
    `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input.value}`)
    .then((response) => response.json())
    .then((locations) => populateAutocompleteList(locations))
    .catch((error) => console.log("Error", error));
});
