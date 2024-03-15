/*Получение погоды на четыре дня и получение рассвета и заката время */

export const updateCurrentWeather = (weather) => {
    const humidityElement =  document.querySelector('.current-weather_brief #humidity');
    const windSpeedElement = document.querySelector(".current-weather_brief #wind-speed");

    humidityElement.textContent = weather.main.humidity;
    windSpeedElement.textContent = `${weather.wind.speed} m/s`;
};