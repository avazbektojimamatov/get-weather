// This function returns the current weather for a given city
function getWeather(city) {
    const apiKey = '5122cabc8fdc14b01d66dc40c939417d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Convert the temperature from Kelvin to Celsius
        const temperature = Math.floor(data.main.temp - 273.15);
        return {
          temperature: temperature,
          description: data.weather[0].description
        }
      })
      .catch(error => {
        console.error(error);
        return { error: 'There was an error getting the weather for the given city.' };
      });
  }
  
  // This function displays the current weather on the page
  function displayWeather(city) {
    getWeather(city)
      .then(weather => {
        const temperatureElement = document.querySelector('.temperature');
        const descriptionElement = document.querySelector('.description');
        if (weather.error) {
          temperatureElement.textContent = '';
          descriptionElement.textContent = weather.error;
        } else {
          temperatureElement.textContent = `${weather.temperature}°C`;
          descriptionElement.textContent = weather.description;
        }
      });
  }
  
  // Add an event listener to the form to display the weather when the form is submitted
  const form = document.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const cityInput = document.querySelector('input[name="city"]');
    const city = cityInput.value;
    displayWeather(city);
  });