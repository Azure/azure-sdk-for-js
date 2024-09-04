// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DefaultAzureCredential } = require("@azure/identity");
const { isUnexpected } = require("../src/generated");
const MapsWeather = require("../src/mapsWeather").default;

/**
 * @summary Get a list of active tropical storms, including details like basin, year of origin, and storm name.
 */
async function main() {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/tropical/storms/active/{format}", "json").get();

    if (isUnexpected(response)) {
        throw response.body.error;
    }
    console.log(response.body);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
