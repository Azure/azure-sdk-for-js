// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import MapsTimezone, {IanaIdOutput} from "../src";
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
        const ianaIds: string[] = response.body
            .map((ianaId: IanaIdOutput) => ianaId.Id)
            .filter((id: string | undefined): id is string => id !== undefined);
        console.log(ianaIds)
    } else {
        console.error("No data returned");
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
