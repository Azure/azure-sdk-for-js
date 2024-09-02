const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("../src/mapsWeather").default;

async function getQuarterDayForecast() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/forecast/quarterDay/{format}", "json").get({
        queryParameters: {
            query: [47.641268, -122.125679],
            duration: 5,
        },
    });

    console.log(response.body);
}

getQuarterDayForecast().catch(console.error);
