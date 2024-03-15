const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '0c26f917db7643c3772cc3465de6b764'

const urlWeather = new URL (`${API_URL}weather`);
//console.log(urlWeather);
urlWeather.search = '?units=metric&appid=${API_KEY}&q=${city}'

export const getWeatherForecast = async (city) => {
    try { 
        const response = await fetch(`${API_URL}forecast?units=metric&appid=${API_KEY}&q=${city}`);
        if (!response.ok) throw new Error(await response.text("Ошибка запроса"));
        return await response.json();
        //return {success: true, data: await response.json()};
    } catch (error) {
        console.error();
        throw new Error('Failed to fetch weather forecast');
    }
}
