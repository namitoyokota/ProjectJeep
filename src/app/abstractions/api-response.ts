export interface ApiResponse {
    lat: string;
    lon: string;
    data: ForecastData[];
}

export interface ForecastData {
    weather: WeatherData;
}

export interface WeatherData {
    code: number;
}
