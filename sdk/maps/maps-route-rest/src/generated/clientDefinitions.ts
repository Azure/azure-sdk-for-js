// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RouteRequestRouteMatrixParameters,
  RouteGetRouteMatrixParameters,
  RouteRequestRouteMatrixSyncParameters,
  RouteGetRouteDirectionsParameters,
  RouteGetRouteDirectionsWithAdditionalParametersParameters,
  RouteGetRouteRangeParameters,
  RouteRequestRouteDirectionsBatchParameters,
  RouteGetRouteDirectionsBatchParameters,
  RouteRequestRouteDirectionsBatchSyncParameters
} from "./parameters";
import {
  RouteRequestRouteMatrix200Response,
  RouteRequestRouteMatrix202Response,
  RouteGetRouteMatrix200Response,
  RouteGetRouteMatrix202Response,
  RouteRequestRouteMatrixSync200Response,
  RouteRequestRouteMatrixSync408Response,
  RouteRequestRouteMatrixSyncDefaultResponse,
  RouteGetRouteDirections200Response,
  RouteGetRouteDirectionsDefaultResponse,
  RouteGetRouteDirectionsWithAdditionalParameters200Response,
  RouteGetRouteDirectionsWithAdditionalParametersDefaultResponse,
  RouteGetRouteRange200Response,
  RouteGetRouteRangeDefaultResponse,
  RouteRequestRouteDirectionsBatch200Response,
  RouteRequestRouteDirectionsBatch202Response,
  RouteGetRouteDirectionsBatch200Response,
  RouteGetRouteDirectionsBatch202Response,
  RouteRequestRouteDirectionsBatchSync200Response,
  RouteRequestRouteDirectionsBatchSync408Response,
  RouteRequestRouteDirectionsBatchSyncDefaultResponse
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface RequestRouteMatrix {
  /**
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Matrix Routing service allows calculation of a matrix of route summaries for a set of routes defined by origin and destination locations by using an asynchronous (async) or synchronous (sync) POST request. For every given origin, the service calculates the cost of routing from that origin to every given destination. The set of origins and the set of destinations can be thought of as the column and row headers of a table and each cell in the table contains the costs of routing from the origin to the destination for that cell. As an example, let's say a food delivery company has 20 drivers and they need to find the closest driver to pick up the delivery from the restaurant. To solve this use case, they can call Matrix Route API.
   *
   *
   * For each route, the travel times and distances are returned. You can use the computed costs to determine which detailed routes to calculate using the Route Directions API.
   *
   *
   * The maximum size of a matrix for async request is **700** and for sync request it's **100** (the number of origins multiplied by the number of destinations).
   *
   *
   *
   * ### Submit Synchronous Route Matrix Request
   * If your scenario requires synchronous requests and the maximum size of the matrix is less than or equal to 100, you might want to make synchronous request. The maximum size of a matrix for this API is **100** (the number of origins multiplied by the number of destinations). With that constraint in mind, examples of possible matrix dimensions are: 10x10, 6x8, 9x8 (it does not need to be square).
   *
   * ```
   * POST https://atlas.microsoft.com/route/matrix/sync/json?api-version=1.0&subscription-key={subscription-key}
   * ```
   *
   * ### Submit Asynchronous Route Matrix Request
   * The Asynchronous API is appropriate for processing big volumes of relatively complex routing requests. When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available. If `waitForResults` parameter in the request is set to true, user will get a 200 response if the request is finished under 120 seconds.
   *
   *
   * The maximum size of a matrix for this API is **700** (the number of origins multiplied by the number of destinations). With that constraint in mind, examples of possible matrix dimensions are: 50x10, 10x10, 28x25. 10x70 (it does not need to be square).
   *
   *
   * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
   *
   *
   *
   *
   * ```
   * POST https://atlas.microsoft.com/route/matrix/json?api-version=1.0&subscription-key={subscription-key}
   * ```
   *
   * Here's a typical sequence of asynchronous operations:
   * 1. Client sends a Route Matrix POST request to Azure Maps
   *
   * 2. The server will respond with one of the following:
   *
   *     > HTTP `202 Accepted` -  Route Matrix request has been accepted.
   *
   *     > HTTP `Error` - There was an error processing your Route Matrix request. This could either be a 400 Bad Request or any other Error status code.
   *
   *
   * 3. If the Matrix Route request was accepted successfully, the Location header in the response contains the URL to download the results of the request. This status URI looks like the following:
   *
   *   ```
   *     GET https://atlas.microsoft.com/route/matrix/{matrixId}?api-version=1.0?subscription-key={subscription-key}
   *   ```
   *
   *
   * 4. Client issues a GET request on the download URL obtained in Step 3 to download the results
   *
   * ### Download Sync Results
   * When you make a POST request for Route Matrix Sync API, the service returns 200 response code for successful request and a response array. The response body will contain the data and there will be no possibility to retrieve the results later.
   *
   * ### Download Async Results
   * When a request issues a `202 Accepted` response, the request is being processed using our async pipeline. You will be given a URL to check the progress of your  async request in the location header of the response. This status URI looks like the following:
   * ```
   *   GET https://atlas.microsoft.com/route/matrix/{matrixId}?api-version=1.0?subscription-key={subscription-key}
   * ```
   *
   * The URL provided by the location header will return the following responses when a `GET` request is issued.
   *
   *   > HTTP `202 Accepted` - Matrix request was accepted but is still being processed. Please try again in some time.
   *
   *   > HTTP `200 OK` - Matrix request successfully processed. The response body contains all of the results.
   */
  post(
    options: RouteRequestRouteMatrixParameters
  ): StreamableMethod<
    RouteRequestRouteMatrix200Response | RouteRequestRouteMatrix202Response
  >;
  /**
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * If the Matrix Route request was accepted successfully, the Location header in the response contains the URL to download the results of the request. This status URI looks like the following:
   *
   *   ```
   *     GET https://atlas.microsoft.com/route/matrix/{matrixId}?api-version=1.0?subscription-key={subscription-key}
   *   ```
   *
   *
   * 4. Client issues a GET request on the download URL obtained in Step 3 to download the results
   *
   * ### Download Sync Results
   * When you make a POST request for Route Matrix Sync API, the service returns 200 response code for successful request and a response array. The response body will contain the data and there will be no possibility to retrieve the results later.
   *
   * ### Download Async Results
   * When a request issues a `202 Accepted` response, the request is being processed using our async pipeline. You will be given a URL to check the progress of your  async request in the location header of the response. This status URI looks like the following:
   * ```
   *   GET https://atlas.microsoft.com/route/matrix/{matrixId}?api-version=1.0?subscription-key={subscription-key}
   * ```
   *
   * The URL provided by the location header will return the following responses when a `GET` request is issued.
   *
   *   > HTTP `202 Accepted` - Matrix request was accepted but is still being processed. Please try again in some time.
   *
   *   > HTTP `200 OK` - Matrix request successfully processed. The response body contains all of the results.
   */
  get(
    options?: RouteGetRouteMatrixParameters
  ): StreamableMethod<
    RouteGetRouteMatrix200Response | RouteGetRouteMatrix202Response
  >;
}

export interface RequestRouteMatrixSync {
  /**
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * The Matrix Routing service allows calculation of a matrix of route summaries for a set of routes defined by origin and destination locations by using an asynchronous (async) or synchronous (sync) POST request. For every given origin, the service calculates the cost of routing from that origin to every given destination. The set of origins and the set of destinations can be thought of as the column and row headers of a table and each cell in the table contains the costs of routing from the origin to the destination for that cell. As an example, let's say a food delivery company has 20 drivers and they need to find the closest driver to pick up the delivery from the restaurant. To solve this use case, they can call Matrix Route API.
   *
   *
   * For each route, the travel times and distances are returned. You can use the computed costs to determine which detailed routes to calculate using the Route Directions API.
   *
   *
   * The maximum size of a matrix for async request is **700** and for sync request it's **100** (the number of origins multiplied by the number of destinations).
   *
   *
   *
   * ### Submit Synchronous Route Matrix Request
   * If your scenario requires synchronous requests and the maximum size of the matrix is less than or equal to 100, you might want to make synchronous request. The maximum size of a matrix for this API is **100** (the number of origins multiplied by the number of destinations). With that constraint in mind, examples of possible matrix dimensions are: 10x10, 6x8, 9x8 (it does not need to be square).
   *
   * ```
   * POST https://atlas.microsoft.com/route/matrix/sync/json?api-version=1.0&subscription-key={subscription-key}
   * ```
   *
   * ### Submit Asynchronous Route Matrix Request
   * The Asynchronous API is appropriate for processing big volumes of relatively complex routing requests. When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available. If `waitForResults` parameter in the request is set to true, user will get a 200 response if the request is finished under 120 seconds.
   *
   *
   * The maximum size of a matrix for this API is **700** (the number of origins multiplied by the number of destinations). With that constraint in mind, examples of possible matrix dimensions are: 50x10, 10x10, 28x25. 10x70 (it does not need to be square).
   *
   *
   * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
   *
   *
   *
   *
   * ```
   * POST https://atlas.microsoft.com/route/matrix/json?api-version=1.0&subscription-key={subscription-key}
   * ```
   *
   * Here's a typical sequence of asynchronous operations:
   * 1. Client sends a Route Matrix POST request to Azure Maps
   *
   * 2. The server will respond with one of the following:
   *
   *     > HTTP `202 Accepted` -  Route Matrix request has been accepted.
   *
   *     > HTTP `Error` - There was an error processing your Route Matrix request. This could either be a 400 Bad Request or any other Error status code.
   *
   *
   * 3. If the Matrix Route request was accepted successfully, the Location header in the response contains the URL to download the results of the request. This status URI looks like the following:
   *
   *   ```
   *     GET https://atlas.microsoft.com/route/matrix/{matrixId}?api-version=1.0?subscription-key={subscription-key}
   *   ```
   *
   *
   * 4. Client issues a GET request on the download URL obtained in Step 3 to download the results
   *
   * ### Download Sync Results
   * When you make a POST request for Route Matrix Sync API, the service returns 200 response code for successful request and a response array. The response body will contain the data and there will be no possibility to retrieve the results later.
   *
   * ### Download Async Results
   * When a request issues a `202 Accepted` response, the request is being processed using our async pipeline. You will be given a URL to check the progress of your  async request in the location header of the response. This status URI looks like the following:
   * ```
   *   GET https://atlas.microsoft.com/route/matrix/{matrixId}?api-version=1.0?subscription-key={subscription-key}
   * ```
   *
   * The URL provided by the location header will return the following responses when a `GET` request is issued.
   *
   *   > HTTP `202 Accepted` - Matrix request was accepted but is still being processed. Please try again in some time.
   *
   *   > HTTP `200 OK` - Matrix request successfully processed. The response body contains all of the results.
   */
  post(
    options: RouteRequestRouteMatrixSyncParameters
  ): StreamableMethod<
    | RouteRequestRouteMatrixSync200Response
    | RouteRequestRouteMatrixSync408Response
    | RouteRequestRouteMatrixSyncDefaultResponse
  >;
}

export interface GetRouteDirections {
  /**
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   * Returns  a route between an origin and a destination, passing through waypoints if they are specified. The route will take into account factors such as current traffic and the typical road speeds on the requested day of the week and time of day.
   *
   * Information returned includes the distance, estimated travel time, and a representation of the route geometry. Additional routing information such as optimized waypoint order or turn by turn instructions is also available, depending on the options selected.
   *
   * Routing service provides a set of parameters for a detailed description of vehicle-specific Consumption Model. Please check [Consumption Model](https://docs.microsoft.com/azure/azure-maps/consumption-model) for detailed explanation of the concepts and parameters involved.
   */
  get(
    options: RouteGetRouteDirectionsParameters
  ): StreamableMethod<
    RouteGetRouteDirections200Response | RouteGetRouteDirectionsDefaultResponse
  >;
  /**
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   * Returns  a route between an origin and a destination, passing through waypoints if they are specified. The route will take into account factors such as current traffic and the typical road speeds on the requested day of the week and time of day.
   *
   * Information returned includes the distance, estimated travel time, and a representation of the route geometry. Additional routing information such as optimized waypoint order or turn by turn instructions is also available, depending on the options selected.
   *
   * Routing service provides a set of parameters for a detailed description of a vehicle-specific Consumption Model. Please check [Consumption Model](https://docs.microsoft.com/azure/azure-maps/consumption-model) for detailed explanation of the concepts and parameters involved.
   */
  post(
    options: RouteGetRouteDirectionsWithAdditionalParametersParameters
  ): StreamableMethod<
    | RouteGetRouteDirectionsWithAdditionalParameters200Response
    | RouteGetRouteDirectionsWithAdditionalParametersDefaultResponse
  >;
}

export interface GetRouteRange {
  /**
   * __Route Range (Isochrone) API__
   *
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * This service will calculate a set of locations that can be reached from the origin point based on fuel, energy,  time or distance budget that is specified. A polygon boundary (or Isochrone) is returned in a counterclockwise  orientation as well as the precise polygon center which was the result of the origin point.
   *
   * The returned polygon can be used for further processing such as  [Search Inside Geometry](https://docs.microsoft.com/rest/api/maps/search/postsearchinsidegeometry) to  search for POIs within the provided Isochrone.
   */
  get(
    options: RouteGetRouteRangeParameters
  ): StreamableMethod<
    RouteGetRouteRange200Response | RouteGetRouteRangeDefaultResponse
  >;
}

export interface RequestRouteDirectionsBatch {
  /**
   * **Route Directions Batch API**
   *
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   *
   * The Route Directions Batch API sends batches of queries to [Route Directions API](https://docs.microsoft.com/rest/api/maps/route/getroutedirections) using just a single API call. You can call Route Directions Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **700** queries and sync API up to **100** queries.
   * ### Submit Asynchronous Batch Request
   * The Asynchronous API is appropriate for processing big volumes of relatively complex route requests
   * - It allows the retrieval of results in a separate call (multiple downloads are possible).
   * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
   * - The number of batch items is limited to **700** for this API.
   *
   * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
   * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
   *
   * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
   * 1. Client sends a Route Directions Batch `POST` request to Azure Maps
   * 2. The server will respond with one of the following:
   *
   *     > HTTP `202 Accepted` - Batch request has been accepted.
   *
   *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
   *
   * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
   *     This status URI looks like following:
   *
   * ``` GET https://atlas.microsoft.com/route/directions/batch/{batch-id}?api-version=1.0 ```
   * Note:- Please remember to add AUTH information (subscription-key/azure_auth - See [Security](#security)) to the _status URI_ before running it. <br>
   * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
   *
   * ### POST Body for Batch Request
   * To send the _route directions_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 3 _route directions_ queries:
   *
   *
   * ```json
   * {
   *     "batchItems": [
   *         { "query": "?query=47.620659,-122.348934:47.610101,-122.342015&travelMode=bicycle&routeType=eco&traffic=false" },
   *         { "query": "?query=40.759856,-73.985108:40.771136,-73.973506&travelMode=pedestrian&routeType=shortest" },
   *         { "query": "?query=48.923159,-122.557362:32.621279,-116.840362" }
   *     ]
   * }
   * ```
   *
   * A _route directions_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _route directions_ [URI parameters](https://docs.microsoft.com/rest/api/maps/route/getroutedirections#uri-parameters). The string values in the _route directions_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
   *
   *
   * The async API allows caller to batch up to **700** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
   *
   *
   * ### Download Asynchronous Batch Results
   * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
   *
   * ```
   * https://atlas.microsoft.com/route/directions/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
   * ```
   * Here's the typical sequence of operations for downloading the batch results:
   * 1. Client sends a `GET` request using the _download URL_.
   * 2. The server will respond with one of the following:
   *
   *     > HTTP `202 Accepted` - Batch request was accepted but is still being processed. Please try again in some time.
   *
   *     > HTTP `200 OK` - Batch request successfully processed. The response body contains all the batch results.
   *
   *
   *
   * ### Batch Response Model
   * The returned data content is similar for async and sync requests. When downloading the results of an async batch request, if the batch has finished processing, the response body contains the batch response. This batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests`i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item in `batchItems` contains `statusCode` and `response` fields. Each `response` in `batchItems` is of one of the following types:
   *
   *   - [`RouteDirections`](https://docs.microsoft.com/rest/api/maps/route/getroutedirections#routedirections) - If the query completed successfully.
   *
   *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
   *
   *
   * Here's a sample Batch Response with 1 _successful_ and 1 _failed_ result:
   *
   *
   * ```json
   * {
   *     "summary": {
   *         "successfulRequests": 1,
   *         "totalRequests": 2
   *     },
   *     "batchItems": [
   *         {
   *             "statusCode": 200,
   *             "response": {
   *                 "routes": [
   *                     {
   *                         "summary": {
   *                             "lengthInMeters": 1758,
   *                             "travelTimeInSeconds": 387,
   *                             "trafficDelayInSeconds": 0,
   *                             "departureTime": "2018-07-17T00:49:56+00:00",
   *                             "arrivalTime": "2018-07-17T00:56:22+00:00"
   *                         },
   *                         "legs": [
   *                             {
   *                                 "summary": {
   *                                     "lengthInMeters": 1758,
   *                                     "travelTimeInSeconds": 387,
   *                                     "trafficDelayInSeconds": 0,
   *                                     "departureTime": "2018-07-17T00:49:56+00:00",
   *                                     "arrivalTime": "2018-07-17T00:56:22+00:00"
   *                                 },
   *                                 "points": [
   *                                     {
   *                                         "latitude": 47.62094,
   *                                         "longitude": -122.34892
   *                                     },
   *                                     {
   *                                         "latitude": 47.62094,
   *                                         "longitude": -122.3485
   *                                     },
   *                                     {
   *                                         "latitude": 47.62095,
   *                                         "longitude": -122.3476
   *                                     }
   *                                 ]
   *                             }
   *                         ],
   *                         "sections": [
   *                             {
   *                                 "startPointIndex": 0,
   *                                 "endPointIndex": 40,
   *                                 "sectionType": "TRAVEL_MODE",
   *                                 "travelMode": "bicycle"
   *                             }
   *                         ]
   *                     }
   *                 ]
   *             }
   *         },
   *         {
   *             "statusCode": 400,
   *             "response":
   *             {
   *                 "error":
   *                 {
   *                     "code": "400 BadRequest",
   *                     "message": "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
   *                 }
   *             }
   *         }
   *     ]
   * }
   * ```
   */
  post(
    options: RouteRequestRouteDirectionsBatchParameters
  ): StreamableMethod<
    | RouteRequestRouteDirectionsBatch200Response
    | RouteRequestRouteDirectionsBatch202Response
  >;
  /**
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   * ### Download Asynchronous Batch Results
   * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
   *
   * ```
   * https://atlas.microsoft.com/route/directions/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
   * ```
   * Here's the typical sequence of operations for downloading the batch results:
   * 1. Client sends a `GET` request using the _download URL_.
   * 2. The server will respond with one of the following:
   *
   *     > HTTP `202 Accepted` - Batch request was accepted but is still being processed. Please try again in some time.
   *
   *     > HTTP `200 OK` - Batch request successfully processed. The response body contains all the batch results.
   *
   *
   *
   * ### Batch Response Model
   * The returned data content is similar for async and sync requests. When downloading the results of an async batch request, if the batch has finished processing, the response body contains the batch response. This batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests`i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item in `batchItems` contains `statusCode` and `response` fields. Each `response` in `batchItems` is of one of the following types:
   *
   *   - [`RouteDirections`](https://docs.microsoft.com/rest/api/maps/route/getroutedirections#routedirections) - If the query completed successfully.
   *
   *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
   *
   *
   * Here's a sample Batch Response with 1 _successful_ and 1 _failed_ result:
   *
   *
   * ```json
   * {
   *     "summary": {
   *         "successfulRequests": 1,
   *         "totalRequests": 2
   *     },
   *     "batchItems": [
   *         {
   *             "statusCode": 200,
   *             "response": {
   *                 "routes": [
   *                     {
   *                         "summary": {
   *                             "lengthInMeters": 1758,
   *                             "travelTimeInSeconds": 387,
   *                             "trafficDelayInSeconds": 0,
   *                             "departureTime": "2018-07-17T00:49:56+00:00",
   *                             "arrivalTime": "2018-07-17T00:56:22+00:00"
   *                         },
   *                         "legs": [
   *                             {
   *                                 "summary": {
   *                                     "lengthInMeters": 1758,
   *                                     "travelTimeInSeconds": 387,
   *                                     "trafficDelayInSeconds": 0,
   *                                     "departureTime": "2018-07-17T00:49:56+00:00",
   *                                     "arrivalTime": "2018-07-17T00:56:22+00:00"
   *                                 },
   *                                 "points": [
   *                                     {
   *                                         "latitude": 47.62094,
   *                                         "longitude": -122.34892
   *                                     },
   *                                     {
   *                                         "latitude": 47.62094,
   *                                         "longitude": -122.3485
   *                                     },
   *                                     {
   *                                         "latitude": 47.62095,
   *                                         "longitude": -122.3476
   *                                     }
   *                                 ]
   *                             }
   *                         ],
   *                         "sections": [
   *                             {
   *                                 "startPointIndex": 0,
   *                                 "endPointIndex": 40,
   *                                 "sectionType": "TRAVEL_MODE",
   *                                 "travelMode": "bicycle"
   *                             }
   *                         ]
   *                     }
   *                 ]
   *             }
   *         },
   *         {
   *             "statusCode": 400,
   *             "response":
   *             {
   *                 "error":
   *                 {
   *                     "code": "400 BadRequest",
   *                     "message": "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
   *                 }
   *             }
   *         }
   *     ]
   * }
   * ```
   */
  get(
    options?: RouteGetRouteDirectionsBatchParameters
  ): StreamableMethod<
    | RouteGetRouteDirectionsBatch200Response
    | RouteGetRouteDirectionsBatch202Response
  >;
}

export interface RequestRouteDirectionsBatchSync {
  /**
   * **Route Directions Batch API**
   *
   *
   * **Applies to**: see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
   *
   *
   *
   * The Route Directions Batch API sends batches of queries to [Route Directions API](https://docs.microsoft.com/rest/api/maps/route/getroutedirections) using just a single API call. You can call Route Directions Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **700** queries and sync API up to **100** queries.
   * ### Submit Synchronous Batch Request
   * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
   * ```
   * POST https://atlas.microsoft.com/route/directions/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
   * ```
   * ### Batch Response Model
   * The returned data content is similar for async and sync requests. When downloading the results of an async batch request, if the batch has finished processing, the response body contains the batch response. This batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests`i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item in `batchItems` contains `statusCode` and `response` fields. Each `response` in `batchItems` is of one of the following types:
   *
   *   - [`RouteDirections`](https://docs.microsoft.com/rest/api/maps/route/getroutedirections#routedirections) - If the query completed successfully.
   *
   *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
   *
   *
   * Here's a sample Batch Response with 1 _successful_ and 1 _failed_ result:
   *
   *
   * ```json
   * {
   *     "summary": {
   *         "successfulRequests": 1,
   *         "totalRequests": 2
   *     },
   *     "batchItems": [
   *         {
   *             "statusCode": 200,
   *             "response": {
   *                 "routes": [
   *                     {
   *                         "summary": {
   *                             "lengthInMeters": 1758,
   *                             "travelTimeInSeconds": 387,
   *                             "trafficDelayInSeconds": 0,
   *                             "departureTime": "2018-07-17T00:49:56+00:00",
   *                             "arrivalTime": "2018-07-17T00:56:22+00:00"
   *                         },
   *                         "legs": [
   *                             {
   *                                 "summary": {
   *                                     "lengthInMeters": 1758,
   *                                     "travelTimeInSeconds": 387,
   *                                     "trafficDelayInSeconds": 0,
   *                                     "departureTime": "2018-07-17T00:49:56+00:00",
   *                                     "arrivalTime": "2018-07-17T00:56:22+00:00"
   *                                 },
   *                                 "points": [
   *                                     {
   *                                         "latitude": 47.62094,
   *                                         "longitude": -122.34892
   *                                     },
   *                                     {
   *                                         "latitude": 47.62094,
   *                                         "longitude": -122.3485
   *                                     },
   *                                     {
   *                                         "latitude": 47.62095,
   *                                         "longitude": -122.3476
   *                                     }
   *                                 ]
   *                             }
   *                         ],
   *                         "sections": [
   *                             {
   *                                 "startPointIndex": 0,
   *                                 "endPointIndex": 40,
   *                                 "sectionType": "TRAVEL_MODE",
   *                                 "travelMode": "bicycle"
   *                             }
   *                         ]
   *                     }
   *                 ]
   *             }
   *         },
   *         {
   *             "statusCode": 400,
   *             "response":
   *             {
   *                 "error":
   *                 {
   *                     "code": "400 BadRequest",
   *                     "message": "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
   *                 }
   *             }
   *         }
   *     ]
   * }
   * ```
   */
  post(
    options: RouteRequestRouteDirectionsBatchSyncParameters
  ): StreamableMethod<
    | RouteRequestRouteDirectionsBatchSync200Response
    | RouteRequestRouteDirectionsBatchSync408Response
    | RouteRequestRouteDirectionsBatchSyncDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/route/matrix/\{format\}' has methods for the following verbs: post, get */
  (path: "/route/matrix/{format}", format: "json"): RequestRouteMatrix;
  /** Resource for '/route/matrix/sync/\{format\}' has methods for the following verbs: post */
  (path: "/route/matrix/sync/{format}", format: "json"): RequestRouteMatrixSync;
  /** Resource for '/route/directions/\{format\}' has methods for the following verbs: get, post */
  (
    path: "/route/directions/{format}",
    format: "json" | "xml"
  ): GetRouteDirections;
  /** Resource for '/route/range/\{format\}' has methods for the following verbs: get */
  (path: "/route/range/{format}", format: "json" | "xml"): GetRouteRange;
  /** Resource for '/route/directions/batch/\{format\}' has methods for the following verbs: post, get */
  (
    path: "/route/directions/batch/{format}",
    format: "json"
  ): RequestRouteDirectionsBatch;
  /** Resource for '/route/directions/batch/sync/\{format\}' has methods for the following verbs: post */
  (
    path: "/route/directions/batch/sync/{format}",
    format: "json"
  ): RequestRouteDirectionsBatchSync;
}

export type MapsRouteClient = Client & {
  path: Routes;
};
