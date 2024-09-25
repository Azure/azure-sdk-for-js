// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsWeather = require("@azure-rest/maps-weather").default,
    { isUnexpected } = require("@azure-rest/maps-weather");

/**
 * @summary Search for tropical storms by year, basin, or government ID, returning relevant data such as name, status, and origin year.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/route/{format}", "json").get({
        queryParameters: {
            query: "47.641268,-122.125679,0:47.641268,-122.125679,2",
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
