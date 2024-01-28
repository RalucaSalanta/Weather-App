document.addEventListener("DOMContentLoaded", function () {
    const apiKey = 'ca6e05d0573b2d679e1f70688dd47bbd';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=YOUR_CITY&appid=' + apiKey;

    function searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();

        if (city !== '') {
            const apiUrlForCity = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

            fetch(apiUrlForCity)
                .then(response => response.json())
                .then(data => {
                    const weatherList = document.getElementById('weather-list');
                    weatherList.innerHTML = ''; 

                    for (let i = 0; i < data.list.length; i += 8) {
                        const weatherItem = document.createElement('div');
                        weatherItem.className = 'weather-item';

                        const date = new Date(data.list[i].dt * 1000);
                        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

                        const iconUrl = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`;

                        const temperatureCelsius = Math.round(data.list[i].main.temp - 273.15);

                        weatherItem.innerHTML = `
                            <h3>${day}</h3>
                            <p>${data.list[i].weather[0].description}</p>
                            <img src="${iconUrl}" alt="${data.list[i].weather[0].description}">
                            <p>Temperature: ${temperatureCelsius}°C</p>
                            <p>Humidity: ${data.list[i].main.humidity}%</p>
                        `;

                        weatherList.appendChild(weatherItem);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }

    document.getElementById('cityInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });
    document.getElementById('searchButton').addEventListener('click', searchWeather);
});
