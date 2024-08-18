// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsTimezone = require("../src/mapsTimezone").default;

/**
 * @summary How to get the timezone by coordinates.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/byCoordinates/{format}", "json").get({
        queryParameters: { lat: 40.7128, lon: -74.0060 },
    });

    console.log(response.body);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
