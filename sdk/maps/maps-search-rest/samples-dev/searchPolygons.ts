// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary Demonstrate how to  request the geometry data such as a city or country outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format.
 */
async function main(): Promise<void> {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Microsoft Entra ID authentication
   *
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth,
   * or put MAPS_SUBSCRIPTION_KEY into .env file to use the shared key authentication.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Microsoft Entra ID authentication */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsSearch(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsSearch(credential);

  const response = await client.path("/search/polygon").get({
    queryParameters: {
      coordinates: [-122.204141, 47.61256],
      resultType: "locality",
      resolution: "small",
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.geometry);
}

main().catch(console.error);
