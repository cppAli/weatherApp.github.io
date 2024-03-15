import { getWeatherForecastData } from "./utils.js"

export const getWeatherDaily = (forecast) => {
    const forecastData = getWeatherForecastData(forecast);

    const forecastDataContainer = document.querySelector('.hourly-weather-info');
    // Очищаем старые контейнеры перед добавлением новых
    forecastDataContainer.innerHTML = '';

    forecastData.forEach((item, index) => { // Добавляем индекс
        const hourlyWeatherItem = document.createElement('div');
        hourlyWeatherItem.classList.add('hourly-weather-item_info'); // Используем общий класс

        hourlyWeatherItem.innerHTML = `
            <div class="hourly__dayOfWeek"><b>${item.dayOfWeek}</b></div>
            <div class="hourly__icon"><img src="https://openweathermap.org/img/wn/${item.weatherIcon}.png" width="60" alt="Weather Icon"></div>
            <div class="hourly__minTemp">${item.minTemp}°C </div></br>
            <div class="hourly__minWindSpeed"> ${item.minWindSpeed}m/s</div>
            `;

        forecastDataContainer.appendChild(hourlyWeatherItem);
    });
};












/*
function getDayOfWeek(dateTime) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = new Date(dateTime * 1000); // Преобразуем секунды в миллисекунды
        const dayOfWeekIndex = date.getDay(); // Получаем индекс дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
        return daysOfWeek[dayOfWeekIndex]; // Возвращаем название дня недели по индексу
    }

    let forecastDataContainers = document.querySelectorAll('.hourly-weather-item_info');

    forecastDataContainers.forEach((forecastDataContainer, index) => {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + index);
        const nextDayYear = currentDate.getFullYear();
        const nextDayMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const nextDayDate = currentDate.getDate().toString().padStart(2, '0');
        const nextDayQuery = `${nextDayYear}-${nextDayMonth}-${nextDayDate} 12:00:00`;

        let fetchUrl = '';
        if (index === 0) {
            fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0c26f917db7643c3772cc3465de6b764`; // Fetch for today
        } else {
            fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=0c26f917db7643c3772cc3465de6b764&dt=${nextDayQuery}`; // Fetch for other days
        }

        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                // Обработка данных погоды для города
                //console.log(`Weather forecast for ${city}:`, data);
                let item = data.list.find(entry => entry.dt_txt.includes('12:00:00')); // Находим данные для 12:00 следующего дня
                let dayOfWeek = getDayOfWeek(item.dt); // Получаем название дня недели
                let icon = item.weather[0].icon;
                let forecastItem = item.weather[0].description; 
                let temp = `${Math.round(item.main.temp - 273)}°C`;
                let realfeel =`${Math.round(item.main.feels_like - 273)}°C`;

                forecastDataContainer.innerHTML = `
                <div class="hourly-weather-item_info">
                    <div class="hourly__time"><b>${dayOfWeek}</b></div>
                    <div class="hourly__icon"><img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></div>
                    <div class="hourly__forecast">${forecastItem}</div>
                    <div class="hourly__temp">${temp}</div>
                    <div class="hourly__realfeel">${realfeel}</div>
                    <div class="hourly__wind">${Math.round(item.wind.speed)} ${item.wind.deg}</div>
                </div>`;
            })
            .catch(error => console.error(`Error fetching weather data for ${city}:`, error));
    });
*/