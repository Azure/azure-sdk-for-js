// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, { GeocodingBatchResponseOutput, isUnexpected } from "@azure-rest/maps-search";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary Demonstrate how to request a batch of reverse geocoding.
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

  const response = await client.path("/reverseGeocode:batch").post({
    body: {
      batchItems: [
        // This is an invalid query
        { coordinates: [2.294911, 148.858561] },
        {
          coordinates: [-122.34255, 47.6101],
        },
        { coordinates: [-122.33817, 47.6155] },
      ],
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  logResponseBody(response.body);
}

function logResponseBody(resBody: GeocodingBatchResponseOutput): void {
  const { summary, batchItems } = resBody;

  if (!summary || !batchItems || batchItems.length === 0) {
    return;
  }
  const { totalRequests, successfulRequests } = summary;
  console.log(`${successfulRequests} out of ${totalRequests} requests are successful.`);

  for (const [idx, response] of batchItems.entries()) {
    if (response.error) {
      console.log(`Error in ${idx + 1} request: ${response.error.message}`);
    } else {
      if (response.features) {
        console.log(`Results in ${idx + 1} request:`);
        for (const feature of response.features) {
          if (feature.properties?.address?.formattedAddress) {
            console.log(`  ${feature.properties.address.formattedAddress}`);
          } else {
            console.log(`  No address found.`);
          }
        }
      }
    }
  }
}

main().catch(console.error);
