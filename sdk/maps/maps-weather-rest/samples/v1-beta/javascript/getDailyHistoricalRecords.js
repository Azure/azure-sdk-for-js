// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("@azure-rest/maps-weather").default,
    { isUnexpected } = require("@azure-rest/maps-weather");

/**
 * @summary Get historical daily record weather data, including record temperatures, precipitation, and snowfall at a location.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/historical/records/daily/{format}", "json").get({
        queryParameters: {
            query: [47.641268, -122.125679],
            startDate: "2023-01-01",
            endDate: "2023-01-31"
        }
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }
    console.log(response.body);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
