// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SearchGetGeocodingParameters,
  SearchGetGeocodingBatchParameters,
  SearchGetPolygonParameters,
  SearchGetReverseGeocodingParameters,
  SearchGetReverseGeocodingBatchParameters
} from "./parameters";
import {
  SearchGetGeocoding200Response,
  SearchGetGeocodingDefaultResponse,
  SearchGetGeocodingBatch200Response,
  SearchGetGeocodingBatchDefaultResponse,
  SearchGetPolygon200Response,
  SearchGetPolygonDefaultResponse,
  SearchGetReverseGeocoding200Response,
  SearchGetReverseGeocodingDefaultResponse,
  SearchGetReverseGeocodingBatch200Response,
  SearchGetReverseGeocodingBatchDefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetGeocoding {
  /**
   * **Geocoding**
   *
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocoding endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No Point of Interest (POIs) will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties, states etc.
   */
  get(
    options?: SearchGetGeocodingParameters
  ): StreamableMethod<
    SearchGetGeocoding200Response | SearchGetGeocodingDefaultResponse
  >;
}

export interface GetGeocodingBatch {
  /**
   * **Geocoding Batch API**
   *
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   *
   * The Geocoding Batch API sends batches of queries to [Geocoding API](https://docs.microsoft.com/rest/api/maps/search-v2/get-geocoding) using just a single API call. The API allows caller to batch up to **100** queries.
   *
   * ### Submit Synchronous Batch Request
   * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
   * ```
   * POST https://atlas.microsoft.com/geocode:batch?api-version=2023-06-01
   * ```
   * ### POST Body for Batch Request
   * To send the _geocoding_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 2 _geocoding_ queries:
   *
   *
   * ```
   * {
   *   "batchItems": [
   *     {
   *       "addressLine": "One, Microsoft Way, Redmond, WA 98052",
   *       "top": 2
   *     },
   *     {
   *       "addressLine": "Pike Pl",
   *       "adminDistrict": "WA",
   *       "locality": "Seattle",
   *       "top": 3
   *     }
   *   ]
   * }
   * ```
   *
   * A _geocoding_ batchItem object can accept any of the supported _geocoding_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search-v2/get-geocoding#uri-parameters).
   *
   *
   * The batch should contain at least **1** query.
   *
   *
   * ### Batch Response Model
   * The batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests` i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item is of one of the following types:
   *
   *   - [`GeocodingResponse`](https://docs.microsoft.com/rest/api/maps/search-v2/get-geocoding#geocodingresponse) - If the query completed successfully.
   *
   *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
   *
   *
   *
   */
  post(
    options: SearchGetGeocodingBatchParameters
  ): StreamableMethod<
    SearchGetGeocodingBatch200Response | SearchGetGeocodingBatchDefaultResponse
  >;
}

export interface GetPolygon {
  /**
   * **Get Polygon**
   *
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Supplies polygon data of a geographical area outline such as a city or a country region.
   */
  get(
    options: SearchGetPolygonParameters
  ): StreamableMethod<
    SearchGetPolygon200Response | SearchGetPolygonDefaultResponse
  >;
}

export interface GetReverseGeocoding {
  /**
   * **Reverse Geocoding**
   *
   * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * Translate a coordinate (example: 37.786505, -122.3862) into a human understandable street address. Most often this is needed in tracking applications where you receive a GPS feed from the device or asset and wish to know what address where the coordinate is located. This endpoint will return address information for a given coordinate.
   */
  get(
    options: SearchGetReverseGeocodingParameters
  ): StreamableMethod<
    | SearchGetReverseGeocoding200Response
    | SearchGetReverseGeocodingDefaultResponse
  >;
}

export interface GetReverseGeocodingBatch {
  /**
   * **Reverse Geocoding Batch API**
   *
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   *
   * The Reverse Geocoding Batch API sends batches of queries to [Reverse Geocoding API](https://docs.microsoft.com/rest/api/maps/search-v2/get-reverse-geocoding) using just a single API call. The API allows caller to batch up to **100** queries.
   *
   * ### Submit Synchronous Batch Request
   * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
   * ```
   * POST https://atlas.microsoft.com/reverseGeocode:batch?api-version=2023-06-01
   * ```
   * ### POST Body for Batch Request
   * To send the _reverse geocoding_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 2 _reverse geocoding_ queries:
   *
   *
   * ```
   * {
   *   "batchItems": [
   *     {
   *       "coordinates": [-122.128275, 47.639429],
   *       "resultTypes": ["Address", "PopulatedPlace"]
   *     },
   *     {
   *       "coordinates": [-122.341979399674, 47.6095253501216]
   *     }
   *   ]
   * }
   * ```
   *
   * A _reverse geocoding_ batchItem object can accept any of the supported _reverse geocoding_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search-v2/get-reverse-geocoding#uri-parameters).
   *
   *
   * The batch should contain at least **1** query.
   *
   *
   * ### Batch Response Model
   * The batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests` i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item is of one of the following types:
   *
   *   - [`GeocodingResponse`](https://docs.microsoft.com/rest/api/maps/search-v2/get-reverse-geocoding#geocodingresponse) - If the query completed successfully.
   *
   *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
   *
   *
   *
   */
  post(
    options: SearchGetReverseGeocodingBatchParameters
  ): StreamableMethod<
    | SearchGetReverseGeocodingBatch200Response
    | SearchGetReverseGeocodingBatchDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/geocode' has methods for the following verbs: get */
  (path: "/geocode"): GetGeocoding;
  /** Resource for '/geocode:batch' has methods for the following verbs: post */
  (path: "/geocode:batch"): GetGeocodingBatch;
  /** Resource for '/search/polygon' has methods for the following verbs: get */
  (path: "/search/polygon"): GetPolygon;
  /** Resource for '/reverseGeocode' has methods for the following verbs: get */
  (path: "/reverseGeocode"): GetReverseGeocoding;
  /** Resource for '/reverseGeocode:batch' has methods for the following verbs: post */
  (path: "/reverseGeocode:batch"): GetReverseGeocodingBatch;
}

export type MapsSearchClient = Client & {
  path: Routes;
};
