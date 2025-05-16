// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates vector search
 */

import { DefaultAzureCredential } from "@azure/identity";
import { GeographyPoint, SearchClient, SearchIndexClient } from "@azure/search-documents";
import "dotenv/config";
import type { Hotel } from "./interfaces.js";
import { createIndex, delay, WAIT_TIME } from "./setup.js";
import { fancyStayEnVector, fancyStayFrVector, luxuryQueryVector } from "./vectors.js";

/**
 * This sample is to demonstrate the use of SearchClient's vector search feature.
 */
const endpoint = process.env.ENDPOINT || "";
const TEST_INDEX_NAME = "example-index-sample-7";

async function main(): Promise<void> {
  if (!endpoint) {
    console.log("Be sure to set a valid endpoint with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();

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
        // Embeddings of the description text above
        descriptionVectorEn: fancyStayEnVector,
        descriptionVectorFr: fancyStayFrVector,
      },
    ]);

    const uploadsSucceeded = uploadResult.results.every((result) => result.succeeded);

    if (!uploadsSucceeded) {
      console.log("Some documents failed to be indexed.");
    }

    await delay(WAIT_TIME);

    const searchResults = await searchClient.search("*", {
      vectorSearchOptions: {
        queries: [
          {
            kind: "vector",
            fields: ["descriptionVectorEn"],
            kNearestNeighborsCount: 3,
            // An embedding of the query "What are the most luxurious hotels?"
            vector: luxuryQueryVector,
          },
          // Multi-vector search is supported
          {
            kind: "vector",
            fields: ["descriptionVectorFr"],
            kNearestNeighborsCount: 3,
            vector: luxuryQueryVector,
          },
          // The index can be configured with a vectorizer to generate text embeddings
          // from a text query
          {
            kind: "text",
            fields: ["descriptionVectorFr"],
            kNearestNeighborsCount: 3,
            text: "What are the most luxurious hotels?",
          },
        ],
      },
    });

    for await (const result of searchResults.results) {
      const name = result.document.hotelName;
      console.log(name);
    }
  } finally {
    await indexClient.deleteIndex(TEST_INDEX_NAME);
  }
}

main();
