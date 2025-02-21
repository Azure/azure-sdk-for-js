// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import MapsTimezone, { isUnexpected } from "@azure-rest/maps-timezone";

/**
 * @summary How to get the list of Windows Timezone IDs.
 */
async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsTimezone(credential, mapsClientId);

  const response = await client.path("/timezone/enumWindows/{format}", "json").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.length);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
