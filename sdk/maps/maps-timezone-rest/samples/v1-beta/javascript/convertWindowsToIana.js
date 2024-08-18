// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsTimezone = require("../src/mapsTimezone").default;

/**
 * @summary How to convert a Windows Timezone ID to IANA Timezone IDs.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/windowsToIana/{format}", "json").get({
        queryParameters: { windowsTimezoneId: "Eastern Standard Time" },
    });

    console.log(response.body.ianaTimezoneIds);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
