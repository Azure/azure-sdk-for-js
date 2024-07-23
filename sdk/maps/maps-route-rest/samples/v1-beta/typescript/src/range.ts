// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the use of a MapsRoute to retrieve a route range.
 */

import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, { isUnexpected } from "@azure-rest/maps-route";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main():Promise<void> {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Microsoft Entra ID authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth,
   * Or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Microsoft Entra ID authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsRoute(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsRoute(credential);

  const routeRangeResult = await client
    .path("/route/range/{format}", "json")
    .get({ queryParameters: { query: [50.97452, 5.86605], timeBudgetInSec: 6000 } });

  if (isUnexpected(routeRangeResult)) {
    throw routeRangeResult.body.error;
  }

  const {
    reachableRange: { center, boundary },
  } = routeRangeResult.body;
  console.log(`For the center (${center.latitude}, ${center.longitude}), the reachable range is:`);
  console.table(boundary);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
