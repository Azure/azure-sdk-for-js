// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary How to get the timezone by IANA ID.
 */

import { DefaultAzureCredential } from "@azure/identity";
import MapsTimezone, { isUnexpected } from "@azure-rest/maps-timezone";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsTimezone(credential, mapsClientId);

  const response = await client.path("/timezone/byId/{format}", "json").get({
    queryParameters: {
      query: "America/New_York",
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
