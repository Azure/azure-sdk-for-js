// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsTimezone = require("../src/mapsTimezone").default;

/**
 * @summary How to get the list of IANA Timezone IDs.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/enumIana/{format}", "json").get();

    console.log(response.body);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
