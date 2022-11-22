// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, { SearchSearchAlongRouteParameters } from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Along Route endpoint allows you to perform a fuzzy search for POIs along a specified route. This search is constrained by specifying the `maxDetourTime` limiting measure.<br><br>To send the route-points you will use a `POST` request where the request body will contain the `route` object represented as a `GeoJSON LineString` type and the `Content-Type` header will be set to `application/json`. Each route-point in `route` is represented as a `GeoJSON Position` type i.e. an array where the _longitude_ value is followed by the _latitude_ value and the _altitude_ value is ignored. The `route` should contain at least 2 route-points.<br><br>It is possible that original route will be altered, some of it's points may be skipped. If the route that passes through the found point is faster than the original one, the `detourTime` value in the response is negative.
 *
 * @summary **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Along Route endpoint allows you to perform a fuzzy search for POIs along a specified route. This search is constrained by specifying the `maxDetourTime` limiting measure.<br><br>To send the route-points you will use a `POST` request where the request body will contain the `route` object represented as a `GeoJSON LineString` type and the `Content-Type` header will be set to `application/json`. Each route-point in `route` is represented as a `GeoJSON Position` type i.e. an array where the _longitude_ value is followed by the _latitude_ value and the _altitude_ value is ignored. The `route` should contain at least 2 route-points.<br><br>It is possible that original route will be altered, some of it's points may be skipped. If the route that passes through the found point is faster than the original one, the `detourTime` value in the response is negative.
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/PostSearchAlongRoute.json
 */
async function searchForBurgerJointsAlongARoute() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchSearchAlongRouteParameters = {
    queryParameters: { query: "burger", maxDetourTime: 1000, limit: 2 },
  };
  const result = await client.path("/search/alongRoute/{format}", format).post(options);
  console.log(result);
}

searchForBurgerJointsAlongARoute().catch(console.error);
