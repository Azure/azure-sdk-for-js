// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the SearchIndexingBufferedSender with Autoflush based on size.
 */

const {
  SearchIndexingBufferedSender,
  AzureKeyCredential,
  SearchClient,
  GeographyPoint,
  SearchIndexClient,
} = require("@azure/search-documents");
const { createIndex, documentKeyRetriever, WAIT_TIME, delay } = require("./setup");

const dotenv = require("dotenv");
dotenv.config();

/**
 * This sample is to demonstrate the use of SearchIndexingBufferedSender.
 * In this sample, the autoFlush is set to true. i.e. the user does not
 * want to call the flush manually. The upload action happen automatically
 * when the size of the batch is greater than threshold (which is set to 1000)
 * by default.
 */
const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const TEST_INDEX_NAME = "example-index-sample-4";

function getDocumentsArray(size) {
  const array = [];
  for (let i = 1; i <= size; i++) {
    array.push({
      hotelId: `${i}`,
      description:
        "Best hotel in town if you like luxury hotels. They have an amazing infinity pool, a spa, " +
        "and a really helpful concierge. The location is perfect -- right downtown, close to all " +
        "the tourist attractions. We highly recommend this hotel.",
      descriptionFr:
        "Meilleur hôtel en ville si vous aimez les hôtels de luxe. Ils ont une magnifique piscine " +
        "à débordement, un spa et un concierge très utile. L'emplacement est parfait – en plein " +
        "centre, à proximité de toutes les attractions touristiques. Nous recommandons fortement " +
        "cet hôtel.",
      hotelName: "Fancy Stay",
      category: "Luxury",
      tags: ["pool", "view", "wifi", "concierge"],
      parkingIncluded: false,
      lastRenovationDate: new Date(2010, 5, 27),
      rating: 5,
      location: new GeographyPoint({
        longitude: -122.131577,
        latitude: 47.678581,
      }),
    });
  }
  return array;
}

async function main() {
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }

  console.log(`Running SearchIndexingBufferedSender-uploadDocuments-With Auto Flush Sizes Sample`);

  const credential = new AzureKeyCredential(apiKey);
  const searchClient = new SearchClient(endpoint, TEST_INDEX_NAME, credential);
  const indexClient = new SearchIndexClient(endpoint, credential);

  await createIndex(indexClient, TEST_INDEX_NAME);
  await delay(WAIT_TIME);

  const bufferedClient = new SearchIndexingBufferedSender(searchClient, documentKeyRetriever, {
    autoFlush: true,
  });

  bufferedClient.on("batchAdded", (response) => {
    console.log(`Batch Added Event has been receieved: ${response}`);
  });

  bufferedClient.on("beforeDocumentSent", (response) => {
    console.log(`Before Document Sent Event has been receieved: ${response}`);
  });

  bufferedClient.on("batchSucceeded", (response) => {
    console.log("Batch Succeeded Event has been receieved....");
    console.log(response);
  });

  bufferedClient.on("batchFailed", (response) => {
    console.log("Batch Failed Event has been receieved....");
    console.log(response);
  });

  const documents = getDocumentsArray(1001);
  bufferedClient.uploadDocuments(documents);

  await WAIT_TIME;

  let count = await searchClient.getDocumentsCount();
  while (count !== documents.length) {
    await delay(WAIT_TIME);
    count = await searchClient.getDocumentsCount();
  }

  // When the autoFlush is set to true, the user
  // has to call the dispose method to clear the
  // timer.
  bufferedClient.dispose();
  await indexClient.deleteIndex(TEST_INDEX_NAME);
  await delay(WAIT_TIME);
}

main();
