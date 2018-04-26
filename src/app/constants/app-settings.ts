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
    public static GOOGLE_MAPS_GEOCODE_API = {
        ENDPOINT: "https://maps.googleapis.com/maps/api/geocode/json",
        FILTERS: {
            ADDRESS: "?address="
        },
        KEY: "&key=AIzaSyD1bKNNRENJc0XcYxUPTeK8k4Zh2DUm5T0"
    } 
}