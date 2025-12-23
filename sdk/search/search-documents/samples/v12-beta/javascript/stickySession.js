// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates user sticky sessions, a way to reduce inconsistent behavior by targeting a
 * single replica.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { odata, SearchIndexClient } = require("@azure/search-documents");
require("dotenv/config");
const { createIndex, delay, WAIT_TIME } = require("./setup.js");

/**
 * If you're querying a replicated index, Azure AI Search may target any replica with your queries.
 * As these replicas may not be in a consistent state, the service may appear to have inconsistent
 * states between distinct queries. To avoid this, you can use a sticky session. A sticky session
 * is used to indicate to the Azure AI Search service that you'd like all requests with the same
 * `sessionId` to be directed to the same replica. The service will then make a best effort to do
 * so.
 *
 * Please see the
 * {@link https://learn.microsoft.com/azure/search/index-similarity-and-scoring#scoring-statistics-and-sticky-sessions | documentation}
 * for more information.
 */
const endpoint = process.env.ENDPOINT || "";
const TEST_INDEX_NAME = "example-index-sample-3";

async function main() {
  if (!endpoint) {
    console.error("Be sure to set a valid endpoint with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const indexClient = new SearchIndexClient(endpoint, credential);
  const searchClient = indexClient.getSearchClient(TEST_INDEX_NAME);

  // The session id is defined by the user.
  const sessionId = "session1";

  try {
    await createIndex(indexClient, TEST_INDEX_NAME);
    await delay(WAIT_TIME);

    // The service will make a best effort attempt to direct these queries to the same replica. As
    // this overrides load balancing, excessive use of the same `sessionId` may result in
    // performance degradation. Be sure to use a distinct `sessionId` for each sticky session.
    const ratingQueries = [2, 4];
    for (const rating of ratingQueries) {
      const response = await searchClient.search("*", {
        filter: odata`rating ge ${rating}`,
        sessionId,
      });

      const hotelNames = [];
      for await (const result of response.results) {
        const hotelName = result.document.hotelName;
        if (typeof hotelName === "string") {
          hotelNames.push(hotelName);
        }
      }

      if (hotelNames.length) {
        console.log(`Hotels with at least a rating of ${rating}:`);
        hotelNames.forEach(console.log);
      }
    }
  } finally {
    await indexClient.deleteIndex(TEST_INDEX_NAME);
  }
}

main();
