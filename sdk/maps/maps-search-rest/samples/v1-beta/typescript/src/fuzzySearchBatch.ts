// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, {
  getLongRunningPoller,
  createBatchItems,
  SearchAddressBatchResultOutput,
  SearchSearchAddressBatch200Response,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary This sample demonstrates how to use the fuzzy search batch request with MapsSearchClient & getLongRunningPoller.
 */
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
  const client = MapsSearch(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  // const client = MapsSearch(credential, mapsClientId);

  /** Create batch items with an array of objects which accept the same properties as the fuzzy-search endpoint. */
  const batchItems = createBatchItems([
    {
      query: "atm",
      lat: 48.858561,
      lon: 2.294911,
      radius: 5000,
      limit: 5,
    },
    {
      query: "Statue Of Liberty",
      countrySet: ["us"],
      limit: 2,
    },
    {
      query: "Starbucks",
      lat: 47.621028,
      lon: -122.34817,
      radius: 5000,
    },
    // This is an invalid request. We will show how to handle the error later.
    {
      query: "atm",
      lat: 48.858561,
      lon: 200.294911,
    },
  ]);

  /** Create the long running poller with the initial response & MapsSearchClient */
  const initialResponse = await client
    .path("/search/fuzzy/batch/{format}", "json")
    .post({ body: { batchItems } });
  const poller = getLongRunningPoller(client, initialResponse);

  // You can simply wait for the operation is done
  const response = (await poller.pollUntilDone()) as SearchSearchAddressBatch200Response;
  logResponseBody(response.body);

  /** You may want to resume the long running operation in another function/process later.
   * We ca achieve this by serialize the poller's state with `toString` and rehydrate it using `resumeFrom` options
   */
  const serializedState = poller.toString();
  const rehydratedPoller = getLongRunningPoller(client, initialResponse, {
    resumeFrom: serializedState,
  });
  const resumeResponse = (await rehydratedPoller.pollUntilDone()) as SearchSearchAddressBatch200Response;
  logResponseBody(resumeResponse.body);
}

function logResponseBody(resBody: SearchAddressBatchResultOutput) {
  const { summary, batchItems } = resBody;

  const { totalRequests, successfulRequests } = summary;
  console.log(`${successfulRequests} out of ${totalRequests} requests were successful.\n`);

  batchItems.forEach((batchItem, idx) => {
    if (batchItem.response.error) {
      console.log(`Error in ${idx + 1} request: ${batchItem.response.error.message}`);
    } else {
      console.log(`Results in ${idx + 1} request:`);
      batchItem.response.results.forEach((result) => {
        console.log(`Address: ${result.address.freeformAddress}`);
        console.log(`Coordinate: (${result.position.lat}, ${result.position.lon})\n`);
      });
    }
    console.log("----------");
  });
}

main().catch(console.error);
