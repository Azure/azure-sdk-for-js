// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchFuzzySearchParameters
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to 
**Free Form Search**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The basic default API is Free Form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens. This search API is the canonical 'single line search'. The Free Form Search API is a seamless combination of POI search and geocoding. The API can also be weighted with a contextual position (lat./lon. pair), or fully constrained by a coordinate and radius, or it can be executed more generally without any geo biasing anchor point.<br><br>We strongly advise you to use the 'countrySet' parameter to specify only the countries for which your application needs coverage, as the default behavior will be to search the entire world, potentially returning unnecessary results.<br><br> E.g.: `countrySet`=US,FR <br><br>Please see [Search Coverage](https://docs.microsoft.com/azure/location-based-services/geocoding-coverage) for a complete list of all the supported countries.<br><br>Most Search queries default to `maxFuzzyLevel`=2 to gain performance and also reduce unusual results. This new default can be overridden as needed per request by passing in the query param `maxFuzzyLevel`=3 or 4.
 *
 * @summary 
**Free Form Search**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The basic default API is Free Form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens. This search API is the canonical 'single line search'. The Free Form Search API is a seamless combination of POI search and geocoding. The API can also be weighted with a contextual position (lat./lon. pair), or fully constrained by a coordinate and radius, or it can be executed more generally without any geo biasing anchor point.<br><br>We strongly advise you to use the 'countrySet' parameter to specify only the countries for which your application needs coverage, as the default behavior will be to search the entire world, potentially returning unnecessary results.<br><br> E.g.: `countrySet`=US,FR <br><br>Please see [Search Coverage](https://docs.microsoft.com/azure/location-based-services/geocoding-coverage) for a complete list of all the supported countries.<br><br>Most Search queries default to `maxFuzzyLevel`=2 to gain performance and also reduce unusual results. This new default can be overridden as needed per request by passing in the query param `maxFuzzyLevel`=3 or 4.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchFuzzy.json
 */
async function searchCitySeattle() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchFuzzySearchParameters = {
    queryParameters: { query: "seattle" }
  };
  const result = await client
    .path("/search/fuzzy/{format}", format)
    .get(options);
  console.log(result);
}

searchCitySeattle().catch(console.error);
