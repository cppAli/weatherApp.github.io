const addZero = (n) => n < 10 ? `0${n}` : n;
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weewdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
/*
export const getCurrentDateTime = () => {
    const date = new Date();

    const dayofMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfeek = weekdays[date.getDay()];

    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());

    return { dayofMonth, month, year, hours, minutes, dayOfeek };
};

export const getWeatherForecastData = (forecast) => {
    const forecast_data = forecast.list.filter(
        (item) =>
            new Date(item.dt_txt).getHours() === 12 &&
            new Date(item.dt_txt).getDate() > new Date().getDate() &&
            new Date(item.dt_txt).getDate() < new Date().getDate() + 6
    );

    const forecastData = forecast_data.map((item) => {
        const forecast_date = new Date(item.dt_txt);
        const weekdaysShort = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];

        const dayOfWeek = weekdaysShort[forecast_date.getDay()];
        const weatherIcon = item.weather[0].icon;

        let minTemp = Infinity;
        let maxTemp = -Infinity;

        for (let i = 0; i < forecast_data.length; i++) {
            const temp = forecast_data[i].main.temp;
            const tempDate = new Date(forecast_data[i].dt_txt);

            if (tempDate.getDate() === forecast_date.getDate()) {
                if (temp < minTemp) {
                    minTemp = temp;
                }
                if (temp > maxTemp) {
                    maxTemp = temp;
                }
            }
        };
        return { dayOfWeek, weatherIcon, minTemp, maxTemp };
    });

    console.log(forecast_data); // Проверяем массив forecast_data
    console.log(forecastData); // Проверяем массив forecastData, который возвращается из функции

    return forecastData;
};
*/
export const getWeatherForecastData = (forecast) => {
    const forecast_data = forecast.list.filter(
        (item) =>
            new Date(item.dt_txt).getHours() === 12 &&
            new Date(item.dt_txt).getDate() > new Date().getDate() &&
            new Date(item.dt_txt).getDate() < new Date().getDate() + 6
    );

    const forecastData = forecast_data.reduce((acc, item) => {
        const forecast_date = new Date(item.dt_txt);
        const weekdaysShort = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];

        const dayOfWeek = weekdaysShort[forecast_date.getDay()];
        const weatherIcon = item.weather[0].icon;
        const temp = item.main.temp;
        const windSpeed = item.wind.speed;

        if (!acc[dayOfWeek]) {
            acc[dayOfWeek] = {
                dayOfWeek,
                weatherIcon,
                minTemp: temp,
                minWindSpeed: windSpeed,
            };
        } else {
            if (temp < acc[dayOfWeek].minTemp) {
                acc[dayOfWeek].minTemp = temp;
            }
            if (windSpeed < acc[dayOfWeek].minWindSpeed) {
                acc[dayOfWeek].minWindSpeed = windSpeed;
            }
        }

        return acc;
    }, {});

    console.log(forecast_data); // Проверяем массив forecast_data
    console.log(forecastData); // Проверяем массив forecastData, который возвращается из функции

    return Object.values(forecastData); // Преобразуем объект в массив значений
};
