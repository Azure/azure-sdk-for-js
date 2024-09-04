// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import MapsWeather from "../src/mapsWeather";
import { isUnexpected } from "../src/generated";

/**
 * @summary Get current weather conditions including temperature, wind, and precipitation for a given location, with options for past 6 or 24 hours.
 */
async function main(): Promise<void> {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/currentConditions/{format}", "json").get({
        queryParameters: {
            query: [47.641268, -122.125679]
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
