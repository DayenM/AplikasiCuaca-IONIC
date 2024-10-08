class WeatherService {
  async getData(kota: string, lang: string = 'en') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=cd7f5710c36d0d782c5f2bcf59a256a9&units=metric&lang=${lang}`);
    return await response.json();
  }
  async getDataByCoordinates(lat: number, lon: number, lang: string = 'en') {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cd7f5710c36d0d782c5f2bcf59a256a9&units=metric&lang=${lang}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data by coordinates');
    }
    return await response.json();
  }
}

export default WeatherService;
