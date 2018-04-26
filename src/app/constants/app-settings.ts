export class AppSettings {
    public static API = {
        HOST: "http://localhost",
        PORT: 3000,
        FILTER_QUERYS: {
            username: "?filter[where][Username]=",
            email: "?filter[where][Email]="
        },
        ENDPOINTS: {
            PEOPLE: "/api/People/"
        }
    };
    public static WEATHER_API = {
        HOST: "https://api.darksky.net",
        QUERY: "/forecast/7aad7f29601c00cbffb7910dd71d7327/",
        PARAMETERS: {
            UNITS: "?units=si"
        }
    };
    public static LOCATION_API_ENDPONT = "http://ipinfo.io";
    public static CORS_PROXY_ENDPOINT = "https://cors-anywhere.herokuapp.com/";
}