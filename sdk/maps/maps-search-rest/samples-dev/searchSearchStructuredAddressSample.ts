// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchSearchStructuredAddressParameters,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Structured Address Geocoding**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

Azure Address Geocoding can also be accessed for  structured address look up exclusively. The geocoding search index will be queried for everything above the  street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete  addresses. It will also handle everything from exact  street addresses or street or intersections as well as higher level geographies such as city centers,  counties, states etc.
 *
 * @summary **Structured Address Geocoding**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

Azure Address Geocoding can also be accessed for  structured address look up exclusively. The geocoding search index will be queried for everything above the  street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete  addresses. It will also handle everything from exact  street addresses or street or intersections as well as higher level geographies such as city centers,  counties, states etc.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchAddressStructured.json
 */
async function searchAddressInRedmondWaInStructuredForm() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchStructuredAddressParameters = {
    queryParameters: {
      countryCode: "US",
      streetNumber: "15127",
      streetName: "NE%2024th%20Street",
      municipality: "Redmond",
      countrySubdivision: "WA",
      postalCode: "98052",
    },
  };
  const result = await client.path("/search/address/structured/{format}", format).get(options);
  console.log(result);
}

searchAddressInRedmondWaInStructuredForm().catch(console.error);
