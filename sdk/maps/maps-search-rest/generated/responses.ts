// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  GeocodingResponseOutput,
  ErrorResponseOutput,
  GeocodingBatchResponseOutput,
  BoundaryOutput,
} from "./outputModels";

export interface SearchGetGeocoding200Headers {
  /** request id. */
  "x-ms-request-id"?: string;
}

/**
 *
 * The `Get Geocoding` API is an HTTP `GET` request that returns the longitude and latitude coordinates of the location being searched.
 *
 * In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocoding endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No Point of Interest (POIs) will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties and states. The response also returns detailed address properties such as street, postal code, municipality, and country/region information.
 */
export interface SearchGetGeocoding200Response extends HttpResponse {
  status: "200";
  body: GeocodingResponseOutput;
  headers: RawHttpHeaders & SearchGetGeocoding200Headers;
}

/**
 *
 * The `Get Geocoding` API is an HTTP `GET` request that returns the longitude and latitude coordinates of the location being searched.
 *
 * In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocoding endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No Point of Interest (POIs) will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties and states. The response also returns detailed address properties such as street, postal code, municipality, and country/region information.
 */
export interface SearchGetGeocodingDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Geocoding Batch` API is an HTTP `POST` request that sends batches of up to **100** queries to the [Geocoding](/rest/api/maps/search/get-geocoding) API in a single request.
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
 * A _geocoding_ batchItem object can accept any of the supported _geocoding_ [URI parameters](/rest/api/maps/search/get-geocoding#uri-parameters).
 *
 *
 * The batch should contain at least **1** query.
 *
 *
 * ### Batch Response Model
 * The batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests` i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item is of one of the following types:
 *
 *   - [`GeocodingResponse`](/rest/api/maps/search/get-geocoding#geocodingresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 *
 */
export interface SearchGetGeocodingBatch200Response extends HttpResponse {
  status: "200";
  body: GeocodingBatchResponseOutput;
}

/**
 *
 * The `Get Geocoding Batch` API is an HTTP `POST` request that sends batches of up to **100** queries to the [Geocoding](/rest/api/maps/search/get-geocoding) API in a single request.
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
 * A _geocoding_ batchItem object can accept any of the supported _geocoding_ [URI parameters](/rest/api/maps/search/get-geocoding#uri-parameters).
 *
 *
 * The batch should contain at least **1** query.
 *
 *
 * ### Batch Response Model
 * The batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests` i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item is of one of the following types:
 *
 *   - [`GeocodingResponse`](/rest/api/maps/search/get-geocoding#geocodingresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 *
 */
export interface SearchGetGeocodingBatchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Polygon` API is an HTTP `GET` request that supplies polygon data of a geographical area outline such as a city or a country region.
 */
export interface SearchGetPolygon200Response extends HttpResponse {
  status: "200";
  body: BoundaryOutput;
}

/**
 *
 * The `Get Polygon` API is an HTTP `GET` request that supplies polygon data of a geographical area outline such as a city or a country region.
 */
export interface SearchGetPolygonDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Reverse Geocoding` API is an HTTP `GET` request used to translate a coordinate (example: 37.786505, -122.3862) into a human understandable street address. Useful in tracking applications where you receive a GPS feed from the device or asset and wish to know the address associated with the coordinates. This endpoint will return address information for a given coordinate.
 */
export interface SearchGetReverseGeocoding200Response extends HttpResponse {
  status: "200";
  body: GeocodingResponseOutput;
}

/**
 *
 * The `Get Reverse Geocoding` API is an HTTP `GET` request used to translate a coordinate (example: 37.786505, -122.3862) into a human understandable street address. Useful in tracking applications where you receive a GPS feed from the device or asset and wish to know the address associated with the coordinates. This endpoint will return address information for a given coordinate.
 */
export interface SearchGetReverseGeocodingDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 *
 * The `Get Reverse Geocoding Batch` API is an HTTP `POST` request that sends batches of up to **100** queries to [Reverse Geocoding](/rest/api/maps/search/get-reverse-geocoding) API using a single request.
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
 * A _reverse geocoding_ batchItem object can accept any of the supported _reverse geocoding_ [URI parameters](/rest/api/maps/search/get-reverse-geocoding#uri-parameters).
 *
 *
 * The batch should contain at least **1** query.
 *
 *
 * ### Batch Response Model
 * The batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests` i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item is of one of the following types:
 *
 *   - [`GeocodingResponse`](/rest/api/maps/search/get-reverse-geocoding#geocodingresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 *
 */
export interface SearchGetReverseGeocodingBatch200Response
  extends HttpResponse {
  status: "200";
  body: GeocodingBatchResponseOutput;
}

/**
 *
 * The `Get Reverse Geocoding Batch` API is an HTTP `POST` request that sends batches of up to **100** queries to [Reverse Geocoding](/rest/api/maps/search/get-reverse-geocoding) API using a single request.
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
 * A _reverse geocoding_ batchItem object can accept any of the supported _reverse geocoding_ [URI parameters](/rest/api/maps/search/get-reverse-geocoding#uri-parameters).
 *
 *
 * The batch should contain at least **1** query.
 *
 *
 * ### Batch Response Model
 * The batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests` i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item is of one of the following types:
 *
 *   - [`GeocodingResponse`](/rest/api/maps/search/get-reverse-geocoding#geocodingresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 *
 */
export interface SearchGetReverseGeocodingBatchDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
