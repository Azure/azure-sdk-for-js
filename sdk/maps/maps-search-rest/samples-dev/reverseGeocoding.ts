// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary This sample demonstrates how to reverse a geocode to an address.
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

  /** Make the request. */
  const response = await client.path("/reverseGeocode").get({
    queryParameters: { coordinates: [-121.89, 37.337] },
  });

  /** Handle error response. */
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  if (!response.body.features || response.body.features.length === 0) {
    console.log("No results found.");
  } else {
    /** Log the response body. */
    for (const feature of response.body.features) {
      if (feature.properties?.address?.formattedAddress) {
        console.log(feature.properties.address.formattedAddress);
      } else {
        console.log("No address found.");
      }
    }
  }
}

main().catch(console.error);
