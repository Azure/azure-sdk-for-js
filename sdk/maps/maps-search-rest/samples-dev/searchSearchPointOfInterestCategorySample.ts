// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchSearchPointOfInterestCategoryParameters,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Get POI by Category**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

Points of Interest (POI) Category Search allows you to request POI results from given category. Search allows to query POIs from one category at a time.  Endpoint will only return POI results which are categorized as specified.  Response includes POI details such as address, coordinate location and classification.
 *
 * @summary **Get POI by Category**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

Points of Interest (POI) Category Search allows you to request POI results from given category. Search allows to query POIs from one category at a time.  Endpoint will only return POI results which are categorized as specified.  Response includes POI details such as address, coordinate location and classification.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchPOICategory.json
 */
async function searchForAtmWithin2MilesOfTimesSquareNyAndReturnTheTop3Results() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchPointOfInterestCategoryParameters = {
    queryParameters: {
      query: "atm",
      limit: 3,
      lat: 40.758953,
      lon: -73.985263,
      radius: 3200,
    },
  };
  const result = await client.path("/search/poi/category/{format}", format).get(options);
  console.log(result);
}

searchForAtmWithin2MilesOfTimesSquareNyAndReturnTheTop3Results().catch(console.error);
