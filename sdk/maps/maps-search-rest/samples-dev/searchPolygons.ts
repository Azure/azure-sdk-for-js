// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
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
async function main() {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Azure Active Directory (Azure AD) authentication
   *
   * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
   * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Shared Key authentication (subscription-key) */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = MapsSearch(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = MapsRoute(credential, mapsClientId);

  /** We use this API with the response field geometry.id from either a search address of search fuzzy call.*/
  /** Make a search fuzzy call and retrieve the geometry Ids */
  const searchFuzzyRes = await client.path("/search/fuzzy/{format}", "json").get({
    queryParameters: { query: "Seattle" },
  });
  if (isUnexpected(searchFuzzyRes)) {
    throw searchFuzzyRes.body.error;
  }
  const geometryIds = searchFuzzyRes.body.results
    .map((result) => result.dataSources?.geometry?.id)
    .filter(Boolean) as string[];

  /** Use the retrieved geometry Ids to request for more info. */
  const response = await client.path("/search/polygon/{format}", "json").get({
    queryParameters: {
      geometries: geometryIds,
    },
  });
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  if (!response.body.additionalData) {
    throw Error("Unexpected response: additionalData is missing");
  }
  response.body.additionalData.forEach(({ geometryData }) => {
    console.log(geometryData);
  });
}

main().catch(console.error);
