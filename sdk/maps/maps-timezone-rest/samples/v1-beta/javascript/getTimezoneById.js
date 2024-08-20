// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { DefaultAzureCredential } = require("@azure/identity");
const MapsTimezone = require("../src");
const { isUnexpected } = require("../src");

/**
 * @summary How to get the timezone by IANA ID.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/byId/{format}", "json").get({
        queryParameters: {
            query: "America/New_York"
        },
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    console.log(response.body);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
