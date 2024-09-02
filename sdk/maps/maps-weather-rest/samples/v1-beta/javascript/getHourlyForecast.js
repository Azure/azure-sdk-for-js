const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("../src/mapsWeather").default;

async function getHourlyForecast() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/forecast/hourly/{format}", "json").get({
        queryParameters: {
            query: [47.641268, -122.125679],
            duration: 24,
        },
    });

    console.log(response.body);
}

getHourlyForecast().catch(console.error);
