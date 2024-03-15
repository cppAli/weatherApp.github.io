export const getWeatherData = async (city) => {
    try { 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0c26f917db7643c3772cc3465de6b764`);
        return await response.json();
    } catch (error) {
        console.error();
        throw new Error('Failed to fetch weather forecast'); // Возбуждаем новое исключение
    }
}
