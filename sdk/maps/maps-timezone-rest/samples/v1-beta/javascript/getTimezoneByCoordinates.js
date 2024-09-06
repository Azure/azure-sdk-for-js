// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const { MapsTimezone, isUnexpected } = require("@azure-rest/maps-timezone");

/**
 * @summary How to get the timezone by coordinates.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/byCoordinates/{format}", "json").get({
        queryParameters: {
            query: [40.7128, -74.0060]
        },
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    const timeZoneId = response.body.TimeZones?.[0]?.Id ?? "No time zone available";

    console.log("Extracted TimeZone Id:", timeZoneId);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
