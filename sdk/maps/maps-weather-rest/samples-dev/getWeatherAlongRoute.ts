// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import MapsWeather, { isUnexpected } from "@azure-rest/maps-weather";


/**
 * @summary Get weather forecasts along a specified route, including potential weather hazards and assessments for safe driving.
 */
async function main(): Promise<void> {
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
