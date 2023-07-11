// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates vector search
 */

import {
  AzureKeyCredential,
  SearchClient,
  GeographyPoint,
  SearchIndexClient,
} from "@azure/search-documents";
import { createIndex, WAIT_TIME, delay } from "./setup";
import { Hotel } from "./interfaces";

import * as dotenv from "dotenv";
import { fancyStayVector, luxuryQueryVector } from "./vectors";
dotenv.config();

/**
 * This sample is to demonstrate the use of SearchClient's vector search feature.
 */
const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";
const TEST_INDEX_NAME = "example-index-sample-7";

async function main() {
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }

  const credential = new AzureKeyCredential(apiKey);

  const searchClient: SearchClient<Hotel> = new SearchClient<Hotel>(
    endpoint,
    TEST_INDEX_NAME,
    credential
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
        descriptionVector: fancyStayVector,
      },
    ]);

    const uploadsSucceeded = uploadResult.results.every((result) => result.succeeded);

    if (!uploadsSucceeded) {
      console.log("Some documents failed to be indexed.");
    }

    await delay(WAIT_TIME);

    const searchResults = await searchClient.search("*", {
      vector: {
        fields: ["descriptionVector"],
        kNearestNeighborsCount: 3,
        value: luxuryQueryVector,
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
