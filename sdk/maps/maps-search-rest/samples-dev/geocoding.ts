// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary Demonstrate how to search the coordinates of an address (a.k.a. Geocoding).
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
  /** Microsoft Entra ID authentication (Recommended) */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsSearch(credential, mapsClientId);

  /** Shared Key authentication (subscription-key) */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsSearch(credential);

  /** Make the request. */
  const response = await client
    .path("/geocode")
    .get({ queryParameters: { query: "15127 NE 24th Street, Redmond, WA 98052" } });

  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  /** Log the response body. */
  if (!response.body.features) {
    console.log(`No coordinates found for the address.`);
  } else {
    console.log(`The followings are the possible coordinates of the address:`);
    for (const result of response.body.features) {
      const [lon, lat] = result.geometry.coordinates;
      console.log(`(${lat}, ${lon})`);
    }
  }
}

main().catch(console.error);
