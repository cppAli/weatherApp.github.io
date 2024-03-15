let intervalId; // Глобальная переменная для хранения идентификатора интервала
// weatherWidget.js
export const updateWeatherWidget = (weather) => {
    const dayElement = document.querySelector('.weather .day');
    const dateElement = document.querySelector('.weather .date');
    const weatherIconElement = document.querySelector('.weather .weather-icon')
    const tempElement = document.querySelector('.weather .temperature');
    const textWeatherElement = document.querySelector('.weather .description');
    const nameCityElement = document.querySelector('.weather .city-name');
    const timeElement = document.querySelector ('.weather .time')
    
    dayElement.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    dateElement.textContent = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    tempElement.textContent = `${Math.round(weather.main.temp - 273)}°C`;
    textWeatherElement.textContent = weather.weather[0].description;
    nameCityElement.textContent = weather.name;

   // Очищаем содержимое элемента перед добавлением новой иконки
   weatherIconElement.innerHTML = '';

   // Создаем элемент img с атрибутом src и добавляем его к элементу .weather-icon
   let imgUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
   let theIcon = document.createElement('img');
   theIcon.setAttribute('src', imgUrl);
   theIcon.classList.add("weather_icon"); // Добавляем класс для стилизации иконки
   weatherIconElement.appendChild(theIcon);

   // Очищаем предыдущий интервал, если он существует
   if (intervalId) {
    clearInterval(intervalId);
    }

    // Обновляем временной интервал и сохраняем его идентификатор
    intervalId = setInterval(() => {
        const cityTimezone = weather.timezone - 7200; // Вычитаем 2 часа в секундах (7200 секунд)
        const cityDate = new Date(new Date().getTime() + cityTimezone * 1000);
    
        const timeOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };
    
        const cityTimeString = cityDate.toLocaleTimeString('en-US', timeOptions);
        timeElement.textContent = cityTimeString;
    }, 1000);
};