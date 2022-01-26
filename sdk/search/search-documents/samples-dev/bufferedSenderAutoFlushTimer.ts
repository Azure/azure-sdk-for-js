// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates the SearchIndexingBufferedSender with Autoflush based on timer.
 */

import {
  SearchIndexingBufferedSender,
  AzureKeyCredential,
  SearchClient,
  GeographyPoint,
  SearchIndexClient,
  DEFAULT_FLUSH_WINDOW,
} from "@azure/search-documents";
import { createIndex, documentKeyRetriever, WAIT_TIME, delay } from "./setup";
import { Hotel } from "./interfaces";

import * as dotenv from "dotenv";
dotenv.config();

/**
 * This sample is to demonstrate the use of SearchIndexingBufferedSender.
 * In this sample, the autoFlush is set to true. i.e. the user does not
 * want to call the flush manually. The upload action happen automatically
 * when the time interval is met. The time interval is set to 60000ms
 * by default.
 */
const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const TEST_INDEX_NAME = "example-index-sample-5";

export async function main() {
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }

  console.log(`Running SearchIndexingBufferedSender-uploadDocuments-With Auto Flush Timer Sample`);

  const credential = new AzureKeyCredential(apiKey);
  const searchClient: SearchClient<Hotel> = new SearchClient<Hotel>(
    endpoint,
    TEST_INDEX_NAME,
    credential
  );
  const indexClient: SearchIndexClient = new SearchIndexClient(endpoint, credential);

  await createIndex(indexClient, TEST_INDEX_NAME);
  await delay(WAIT_TIME);

  const bufferedClient: SearchIndexingBufferedSender<Hotel> = new SearchIndexingBufferedSender(
    searchClient,
    documentKeyRetriever,
    {
      autoFlush: true,
    }
  );

  bufferedClient.on("batchAdded", (response: any) => {
    console.log(`Batch Added Event has been receieved: ${response}`);
  });

  bufferedClient.on("beforeDocumentSent", (response: any) => {
    console.log(`Before Document Sent Event has been receieved: ${response}`);
  });

  bufferedClient.on("batchSucceeded", (response: any) => {
    console.log("Batch Succeeded Event has been receieved....");
    console.log(response);
  });

  bufferedClient.on("batchFailed", (response: any) => {
    console.log("Batch Failed Event has been receieved....");
    console.log(response);
  });

  bufferedClient.uploadDocuments([
    {
      hotelId: "1",
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
    },
  ]);

  const wait_time = DEFAULT_FLUSH_WINDOW + 5000;
  console.log(`Waiting for ${wait_time} ms to meet the flush window interval....`);
  await delay(wait_time);

  // When the autoFlush is set to true, the user
  // has to call the dispose method to clear the
  // timer.
  bufferedClient.dispose();
  await indexClient.deleteIndex(TEST_INDEX_NAME);
  await delay(WAIT_TIME);
}

main();
