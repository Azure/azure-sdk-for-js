// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchSearchPointOfInterestParameters,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Get POI by Name**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

Points of Interest (POI) Search allows you to request POI results by name.  Search supports additional query parameters such as language and filtering results by area of interest driven by country or bounding box.  Endpoint will return only POI results matching the query string. Response includes POI details such as address, coordinate location and category.
 *
 * @summary **Get POI by Name**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

Points of Interest (POI) Search allows you to request POI results by name.  Search supports additional query parameters such as language and filtering results by area of interest driven by country or bounding box.  Endpoint will return only POI results matching the query string. Response includes POI details such as address, coordinate location and category.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchPOI.json
 */
async function searchForJuiceBarsWithin5MilesOfSeattleDowntownAndLimitTheResponseTo5Results() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchPointOfInterestParameters = {
    queryParameters: {
      query: "juice bars",
      limit: 5,
      lat: 47.606038,
      lon: -122.333345,
      radius: 8046,
    },
  };
  const result = await client.path("/search/poi/{format}", format).get(options);
  console.log(result);
}

searchForJuiceBarsWithin5MilesOfSeattleDowntownAndLimitTheResponseTo5Results().catch(console.error);
