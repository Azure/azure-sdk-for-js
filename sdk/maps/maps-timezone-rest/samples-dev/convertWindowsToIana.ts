// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import MapsTimezone from "../src";
import { isUnexpected } from "../src";

/**
 * @summary How to convert a Windows Timezone ID to IANA Timezone IDs.
 */
async function main(): Promise<void> {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/windowsToIana/{format}", "json").get({
        queryParameters: { query: "Eastern Standard Time" },
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    } else if (response.body) {
        console.log(response.body.map((ianaId) => ianaId).join(", "));
    } else {
        console.error("No data returned");
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
