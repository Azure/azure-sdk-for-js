// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import MapsWeather from "../src/mapsWeather";
import { isUnexpected } from "../src/generated";

/**
 * @summary Get a list of active tropical storms, including details like basin, year of origin, and storm name.
 */
async function main(): Promise<void> {
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
