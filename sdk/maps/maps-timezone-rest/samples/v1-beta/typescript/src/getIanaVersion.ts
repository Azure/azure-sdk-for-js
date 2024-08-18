// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import MapsTimezone from "../src/mapsTimezone";

/**
 * @summary How to get the IANA version number.
 */
async function main(): Promise<void> {
    const credential = new DefaultAzureCredential();
    const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
    const client = MapsTimezone(credential, mapsClientId);

    const response = await client.path("/timezone/ianaVersion/{format}", "json").get();

    console.log(response.body.version);
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
