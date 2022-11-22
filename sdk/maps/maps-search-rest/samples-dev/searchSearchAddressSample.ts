// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, { SearchSearchAddressParameters } from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Address Geocoding**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocode endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties, states etc.
 *
 * @summary **Address Geocoding**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocode endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties, states etc.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchAddress.json
 */
async function searchDetailAddress15127Ne24ThStreetRedmondWa98052() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchAddressParameters = {
    queryParameters: { query: "15127 NE 24th Street, Redmond, WA 98052" },
  };
  const result = await client.path("/search/address/{format}", format).get(options);
  console.log(result);
}

searchDetailAddress15127Ne24ThStreetRedmondWa98052().catch(console.error);
