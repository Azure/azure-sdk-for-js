// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a MapsRoute to retrieve a route range.
 */

import { AzureKeyCredential } from "@azure/core-auth";
// import { DefaultAzureCredential } from "@azure/identity";
import MapsRoute, { isUnexpected } from "@azure-rest/maps-route";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Azure Active Directory (Azure AD) authentication
   *
   * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
   * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Shared Key authentication (subscription-key) */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = MapsRoute(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = MapsRoute(credential, mapsClientId);

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
