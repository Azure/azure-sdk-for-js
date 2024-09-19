// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import MapsWeather from "../src/mapsWeather";
import { isUnexpected } from "../src/generated";

/**
 * @summary Get the location of tropical storms including wind details and geometry for individual government-issued storms.
 */
async function main(): Promise<void> {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsWeather(credential, mapsClientId);

    const response = await client.path("/weather/tropical/storms/locations/{format}", "json").get({
        queryParameters: {
            year: 2022,
            basinId: "NP",
            govId: 2
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