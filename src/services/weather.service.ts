import axios from "axios";

export class WeatherService {
  async searchWeatherByLocation(location: string) {
    const { data } = await axios.get(
      `https://wttr.in/${location}?format=weather_start+%C+weather_end+%l:+emoji_start+%c+emoji_end+%t&lang=en`
    );

    const matchIcon = data.match(/emoji_start([\s\S]*?)emoji_end/);
    const icon = matchIcon[1].trim();

    const words = data.split(" ");
    const temperature = words[words.length - 1];

    return {
      icon,
      temperature,
    };
  }
}
