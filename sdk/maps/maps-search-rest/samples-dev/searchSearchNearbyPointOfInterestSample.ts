// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchSearchNearbyPointOfInterestParameters
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Nearby Search**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

If you have a use case for only retrieving POI results around a specific location, the nearby search method may be the right choice. This endpoint will only return POI results, and does not take in a search query parameter.
 *
 * @summary **Nearby Search**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

If you have a use case for only retrieving POI results around a specific location, the nearby search method may be the right choice. This endpoint will only return POI results, and does not take in a search query parameter.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchNearby.json
 */
async function searchForAnyPointsOfInterestPoiWithin5MilesOfManhattanNyAndReturnTheTop10Results() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchNearbyPointOfInterestParameters = {
    queryParameters: { lat: 40.70627, lon: -74.011454, limit: 10, radius: 8046 }
  };
  const result = await client
    .path("/search/nearby/{format}", format)
    .get(options);
  console.log(result);
}

searchForAnyPointsOfInterestPoiWithin5MilesOfManhattanNyAndReturnTheTop10Results().catch(
  console.error
);
