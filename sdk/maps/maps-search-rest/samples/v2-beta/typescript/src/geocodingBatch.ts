// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, { GeocodingBatchResponseOutput, isUnexpected } from "@azure-rest/maps-search";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary This sample demonstrates how to make a batched search address request.
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
  
  const response = await client.path("/geocode:batch").post({
    body: {
      batchItems: [
        { query: "400 Broad St, Seattle, WA 98109" },
        { query: "One, Microsoft Way, Redmond, WA 98052" },
        { query: "350 5th Ave, New York, NY 10118" },
        // This is an invalid query
        { query: "" },
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
  const { successfulRequests, totalRequests } = summary;
  console.log(`${successfulRequests} out of ${totalRequests} requests are successful.`);
  for (const [idx, response] of batchItems.entries()) {
    if (response.error) {
      console.error(`Error in ${idx + 1}: ${response.error.message}`);
    } else {
      if (!response.features) {
        console.error(`Unexpected error: No features in ${idx + 1}`);
        return;
      }
      console.log(`Result in ${idx + 1}:`);
      for (const result of response.features) {
        const [lat, lon] = result.geometry.coordinates;
        console.log(`(${lat}, ${lon})`);
      }
    }
  }
}

main().catch(console.error);
