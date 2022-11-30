// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to manipulate batch requests.
 */

const { AzureKeyCredential } = require("@azure/core-auth");
// import { DefaultAzureCredential } from "@azure/identity";
const { MapsSearchClient } = require("@azure/maps-search");
require("dotenv").config();

/**
 * We use beginFuzzySearchBatch/resumeFuzzySearchBatch in this example.
 * But the same approach can be used in:
 *  - beginSearchAddressBatch/resumeSearchAddressBatch
 *  - beginReverseSearchAddressBatch/resumeReverseSearchAddressBatch
 */
async function main() {
  /** Use subscription key authentication */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = new MapsSearchClient(credential);

  /** Or use Azure AD authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = new MapsSearchClient(credential, mapsClientId);

  const fuzzySearchRequests = [
    {
      searchQuery: { query: "atm", coordinates: [48.858561, 2.294911] },
      options: { radiusInMeters: 5000, top: 5 },
    },
    {
      searchQuery: {
        query: "Statue Of Liberty",
        countryCodeFilter: ["us"],
      },
      options: { top: 2 },
    },
    {
      searchQuery: {
        query: "Starbucks",
        coordinates: [47.621028, -122.34817],
      },
      options: { radiusInMeters: 5000 },
    },
  ];

  /** Batch request is a long running operation. We cannot get the result immediately. Thus return a poller for getting result later. */
  let fuzzySearchPoller = await client.beginFuzzySearchBatch(fuzzySearchRequests);
  /** We can get a partial of the results first */
  console.log(await fuzzySearchPoller.getResult());
  /** Or simply wait until the total request is done */
  console.log(await fuzzySearchPoller.pollUntilDone());

  /** We can also start it, then serialize it, and start with another poller */
  fuzzySearchPoller = await client.beginFuzzySearchBatch(fuzzySearchRequests);
  console.log(await fuzzySearchPoller.getResult());
  /** Serialized the current operation for future poller */
  const serializedState = fuzzySearchPoller.toString();
  /** Use resume*Batch method to rehydrate the previous operation */
  const rehydratedFuzzySearchPoller = await client.resumeFuzzySearchBatch(serializedState);
  console.log(await rehydratedFuzzySearchPoller.pollUntilDone());
}

main().catch((e) => console.error(e));
