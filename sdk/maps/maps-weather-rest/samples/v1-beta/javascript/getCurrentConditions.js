const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("../src/mapsWeather").default;

async function getCurrentConditions() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/currentConditions/{format}", "json").get({
        queryParameters: {
            query: [47.641268, -122.125679],
            details: "true",
        },
    });

    console.log(response.body);
}

getCurrentConditions().catch(console.error);
