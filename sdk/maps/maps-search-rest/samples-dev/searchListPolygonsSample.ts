// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchListPolygonsParameters
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Get Polygon**


**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Get Polygon service allows you to request the geometry data such as a city or country  outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format. The geometry ID is returned in the sourceGeometry object under "geometry" and "id" in either a Search Address or Search Fuzzy call.

Please note that any geometry ID retrieved from an Online Search endpoint has a limited lifetime. The client  should not store geometry IDs in persistent storage for later referral, as the stability of these identifiers is  not guaranteed for a long period of time. It is expected that a request to the Polygon method is made within a  few minutes of the request to the Online Search method that provided the ID. The service allows for batch  requests up to 20 identifiers.
 *
 * @summary **Get Polygon**


**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Get Polygon service allows you to request the geometry data such as a city or country  outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format. The geometry ID is returned in the sourceGeometry object under "geometry" and "id" in either a Search Address or Search Fuzzy call.

Please note that any geometry ID retrieved from an Online Search endpoint has a limited lifetime. The client  should not store geometry IDs in persistent storage for later referral, as the stability of these identifiers is  not guaranteed for a long period of time. It is expected that a request to the Polygon method is made within a  few minutes of the request to the Online Search method that provided the ID. The service allows for batch  requests up to 20 identifiers.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/GetSearchPolygon.json
 */
async function getTheGeometryUsingTheGeometryIdReturnedByThePreviousSearch() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchListPolygonsParameters = {
    queryParameters: {
      geometries: [
        "8bceafe8-3d98-4445-b29b-fd81d3e9adf5",
        "00005858-5800-1200-0000-0000773694ca"
      ]
    }
  };
  const result = await client
    .path("/search/polygon/{format}", format)
    .get(options);
  console.log(result);
}

getTheGeometryUsingTheGeometryIdReturnedByThePreviousSearch().catch(
  console.error
);
