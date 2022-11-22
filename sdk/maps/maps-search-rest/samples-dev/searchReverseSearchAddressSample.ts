// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchReverseSearchAddressParameters
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Reverse Geocode to an Address**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

There may be times when you need to translate a  coordinate (example: 37.786505, -122.3862) into a human understandable street address. Most often  this is needed in tracking applications where you  receive a GPS feed from the device or asset and  wish to know what address where the coordinate is  located. This endpoint will return address  information for a given coordinate.
 *
 * @summary **Reverse Geocode to an Address**

**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

There may be times when you need to translate a  coordinate (example: 37.786505, -122.3862) into a human understandable street address. Most often  this is needed in tracking applications where you  receive a GPS feed from the device or asset and  wish to know what address where the coordinate is  located. This endpoint will return address  information for a given coordinate.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchAddressReverse.json
 */
async function searchesAddressesForCoordinates3733712189() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchReverseSearchAddressParameters = {
    queryParameters: { query: [37.337, -121.89] }
  };
  const result = await client
    .path("/search/address/reverse/{format}", format)
    .get(options);
  console.log(result);
}

searchesAddressesForCoordinates3733712189().catch(console.error);
