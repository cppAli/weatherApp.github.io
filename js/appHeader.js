

import { getWeatherData } from "./api.js";
import { getWeatherForecast } from "./apiList.js";
import { updateWeatherWidget } from "./weatherWidget.js";
import { updateCurrentWeather } from "./current-weather_brief.js";
import { updateCurrentWeatherList } from "./current-weather_briefList.js";
import { getWeatherDays } from "./current-weather_mini.js";
import { getWeatherDaily } from "./hourly-weather-item_info.js"
import { getWeatherForecastData } from "./utils.js"


const DEFAULT_CITY = 'Kamianske'; // Установите город по умолчанию здесь

const app = async () => {
    // Функция для проверки введенных символов в поле ввода
    const validateInput = (event) => {
        const input = event.target;
        const inputValue = input.value;
        const regex = /^[a-zA-Zа-яА-ЯёЁ\s]*$/; // Регулярное выражение для проверки на буквы и пробелы

        if (!regex.test(inputValue)) {
            // Если введены символы, отличные от букв и пробелов, очистить поле ввода и вывести сообщение об ошибке
            input.value = inputValue.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
        } else {
            //document.getElementById("error-message").textContent = "";
        }
    };

    // Находим элемент поля ввода
    const cityInput = document.querySelector('.search input[name="city"]');

    // Добавляем обработчик события input для поля ввода
    cityInput.addEventListener('input', validateInput);

    // Настраиваем обработчик события submit для формы поиска
    const searchForm = document.querySelector('.search');
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(searchForm);
        const city = formData.get('city');

        try {
            const weather = await getWeatherData(city);
            const forecast = await getWeatherForecast(city);

            // Обновляем виджет погоды и другие элементы на странице с полученными данными
            updateWeatherWidget(weather);
            updateCurrentWeather(weather);
            updateCurrentWeatherList(weather);
            getWeatherDays(forecast);
            getWeatherForecastData(forecast);
            getWeatherDaily(forecast);
        } catch (error) {
            console.error();
        }
    });

    // Запрос погоды для города по умолчанию при загрузке страницы
    try {
        const defaultWeather = await getWeatherData(DEFAULT_CITY);
        const defaultWeatherForecast = await getWeatherForecast(DEFAULT_CITY);

        console.log(defaultWeather, 'defaul weather');
        console.log(defaultWeatherForecast, 'defaulForecast weather');
        // Обновляем виджет погоды и другие элементы на странице с полученными данными
        updateWeatherWidget(defaultWeather);
        updateCurrentWeather(defaultWeather);
        updateCurrentWeatherList(defaultWeather);
        getWeatherDays(defaultWeatherForecast);
        getWeatherForecastData(defaultWeatherForecast);
        getWeatherDaily(defaultWeatherForecast);
    } catch (error) {
        console.error();
    }
    // Устанавливаем интервал обновления данных о погоде (каждые 10 минут)
    setInterval(async () => {
        try {
            const defaultWeather = await getWeatherData(DEFAULT_CITY);
            const defaultWeatherForecast = await getWeatherForecast(DEFAULT_CITY);

            // Обновляем виджет погоды и другие элементы на странице с полученными данными
            updateWeatherWidget(defaultWeather);
            updateCurrentWeather(defaultWeather);
            updateCurrentWeatherList(defaultWeather);
            getWeatherDays(defaultWeatherForecast);
            getWeatherForecastData(defaultWeatherForecast);
            getWeatherDaily(defaultWeatherForecast);
        } catch (error) {
            console.error();
        }
    }, 10 * 60 * 1000); // 10 минут
};

window.addEventListener('load', app);

