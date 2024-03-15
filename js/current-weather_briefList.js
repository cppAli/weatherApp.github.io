/*Получение погоды на четыре дня и получение рассвета и заката время */

export const updateCurrentWeatherList = (weather) => {
    const sunriseElement = document.querySelector('.sunrise-sunset #sunrise');
    const sunsetElement = document.querySelector('.sunrise-sunset #sunset');

    // Создаем объекты Date для восхода и захода солнца
    const sunrise = new Date(weather.sys.sunrise * 1000);
    const sunset = new Date(weather.sys.sunset * 1000);

    // Форматируем время в строку в формате 'HH:mm'
    const sunriseTime = `${sunrise.getHours()}:${String(sunrise.getMinutes()).padStart(2, '0')}`;
    const sunsetTime = `${sunset.getHours()}:${String(sunset.getMinutes()).padStart(2, '0')}`;

    // Устанавливаем содержимое элементов на странице
    sunriseElement.textContent = sunriseTime;
    sunsetElement.textContent = sunsetTime;
}
