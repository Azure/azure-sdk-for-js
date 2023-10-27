// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, {
  createBatchItems,
  getLongRunningPoller,
  SearchAddressBatchResultOutput,
  SearchSearchAddressBatch200Response,
  SearchSearchAddressQueryParamProperties,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary This sample demonstrates how to make a batched search address request.
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

  /** Create batch items with an array of objects which accept the same properties as the search-address endpoint. */
  const batchItems = createBatchItems<SearchSearchAddressQueryParamProperties>([
    { query: "400 Broad St, Seattle, WA 98109" },
    { query: "One, Microsoft Way, Redmond, WA 98052" },
    { query: "350 5th Ave, New York, NY 10118" },
    { query: "1 Main Street", countrySet: ["GB", "US", "AU"] },
  ]);
  /** Create the long running poller with the initial response & MapsSearchClient */
  const initialResponse = await client
    .path("/search/address/batch/{format}", "json")
    .post({ body: { batchItems } });
  const poller = getLongRunningPoller(client, initialResponse);

  /** You can simply wait for the operation is done */
  const response = (await poller.pollUntilDone()) as SearchSearchAddressBatch200Response;
  logResponseBody(response.body);

  /** You may want to resume the long running operation in another function/process later.
   * We ca achieve this by serialize the poller's state with `toString` and rehydrate it using `resumeFrom` options
   */
  const serializedState = poller.toString();
  const rehydratedPoller = getLongRunningPoller(client, initialResponse, {
    resumeFrom: serializedState,
  });
  const resumeResponse =
    (await rehydratedPoller.pollUntilDone()) as SearchSearchAddressBatch200Response;
  logResponseBody(resumeResponse.body);
}

function logResponseBody(resBody: SearchAddressBatchResultOutput) {
  const { summary, batchItems } = resBody;
  const { successfulRequests, totalRequests } = summary;
  console.log(`${successfulRequests} out of ${totalRequests} requests are successful.`);
  batchItems.forEach(({ response }, idx) => {
    if (response.error) {
      console.error(`Error in ${idx + 1}: ${response.error.message}`);
    } else {
      console.log(`Result in ${idx + 1}:`);
      response.results.forEach((result) => {
        const { lat, lon } = result.position;
        console.log(`(${lat}, ${lon})`);
      });
    }
  });
}

main().catch(console.error);
