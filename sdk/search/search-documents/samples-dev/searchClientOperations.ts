// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the SearchClient.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { GeographyPoint, SearchClient, SearchIndexClient } from "@azure/search-documents";
import "dotenv/config";
import type { Hotel } from "./interfaces.js";
import { createIndex, delay, WAIT_TIME } from "./setup.js";

/**
 * This sample is to demonstrate the use of SearchClient.
 */
const endpoint = process.env.ENDPOINT || "";
const TEST_INDEX_NAME = "example-index-sample-2";

async function main(): Promise<void> {
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();

  // The client can optionally be instantiated with a model type for a more rich typing experience.
  // For the best experience, ensure that every property of the model type can be assigned `null`
  // except for the document key. All properties should be optional, but you may mark properties as
  // non-optional when your queries always select them.
  const searchClient: SearchClient<Hotel> = new SearchClient<Hotel>(
    endpoint,
    TEST_INDEX_NAME,
    credential,
  );

  const indexClient: SearchIndexClient = new SearchIndexClient(endpoint, credential);
  try {
    await createIndex(indexClient, TEST_INDEX_NAME);
    await delay(WAIT_TIME);

    const uploadResult = await searchClient.mergeOrUploadDocuments([
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

    const uploadsSucceeded = uploadResult.results.every((result) => result.succeeded);

    if (!uploadsSucceeded) {
      console.log("Some documents failed to be indexed.");
    }

    await delay(WAIT_TIME);

    // These fields will be searched against.
    const searchFields: string[] = ["description", "rooms/description"];

    // You can specify selected fields to limit the properties returned on the documents.
    const select = ["hotelName"];

    const searchResults = await searchClient.search("luxury", {
      select,
      searchFields,
      includeTotalCount: true,
    });

    console.log(`Result count: ${searchResults.count}`);

    for await (const result of searchResults.results) {
      const name = result.document.hotelName;
      console.log(name);
    }
  } finally {
    await indexClient.deleteIndex(TEST_INDEX_NAME);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
