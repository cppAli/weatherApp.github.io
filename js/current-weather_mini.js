export const getWeatherDays = (forecast) => {
    function getHoursString(dateTime){
        let date = new Date((dateTime - 7200) * 1000); // Вычитаем 2 часа в секундах и преобразуем в миллисекунды
        let hours = date.getHours().toString().padStart(2, '0');
        return hours;
    }

    let forecastDataContainers = document.querySelectorAll('.forecast__item');

    forecastDataContainers.forEach((forecastDataContainer, index) => {
        let item = forecast.list[index];
        let temp = `${Math.round(item.main.temp)}°C`; // Убрали преобразование из кельвинов в цельсии
        let icon = item.weather[0].icon;
        let hours = (index == 0 ? 'Now' : getHoursString(item.dt));

        forecastDataContainer.innerHTML = `
            <div class="forecast__item">
                <div class="forecast__time">${hours}</div>
                <div class="forecast__temp">${temp}</div>
                <div class="forecast__icon"><img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon"></div>
            </div>`;
    });
};
