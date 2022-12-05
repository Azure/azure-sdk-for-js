// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  PolygonResultOutput,
  ErrorResponseOutput,
  SearchAddressResultOutput,
  PointOfInterestCategoryTreeResultOutput,
  ReverseSearchAddressResultOutput,
  ReverseSearchCrossStreetAddressResultOutput,
  SearchAddressBatchResultOutput,
  ReverseSearchAddressBatchResultOutput
} from "./outputModels";

/**
 * **Get Polygon**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Get Polygon service allows you to request the geometry data such as a city or country  outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format. The geometry ID is returned in the sourceGeometry object under "geometry" and "id" in either a Search Address or Search Fuzzy call.
 *
 * Please note that any geometry ID retrieved from an Online Search endpoint has a limited lifetime. The client  should not store geometry IDs in persistent storage for later referral, as the stability of these identifiers is  not guaranteed for a long period of time. It is expected that a request to the Polygon method is made within a  few minutes of the request to the Online Search method that provided the ID. The service allows for batch  requests up to 20 identifiers.
 */
export interface SearchListPolygons200Response extends HttpResponse {
  status: "200";
  body: PolygonResultOutput;
}

/**
 * **Get Polygon**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Get Polygon service allows you to request the geometry data such as a city or country  outline for a set of entities, previously retrieved from an Online Search request in GeoJSON format. The geometry ID is returned in the sourceGeometry object under "geometry" and "id" in either a Search Address or Search Fuzzy call.
 *
 * Please note that any geometry ID retrieved from an Online Search endpoint has a limited lifetime. The client  should not store geometry IDs in persistent storage for later referral, as the stability of these identifiers is  not guaranteed for a long period of time. It is expected that a request to the Polygon method is made within a  few minutes of the request to the Online Search method that provided the ID. The service allows for batch  requests up to 20 identifiers.
 */
export interface SearchListPolygonsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Free Form Search**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The basic default API is Free Form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens. This search API is the canonical 'single line search'. The Free Form Search API is a seamless combination of POI search and geocoding. The API can also be weighted with a contextual position (lat./lon. pair), or fully constrained by a coordinate and radius, or it can be executed more generally without any geo biasing anchor point.<br><br>We strongly advise you to use the 'countrySet' parameter to specify only the countries for which your application needs coverage, as the default behavior will be to search the entire world, potentially returning unnecessary results.<br><br> E.g.: `countrySet`=US,FR <br><br>Please see [Search Coverage](https://docs.microsoft.com/azure/location-based-services/geocoding-coverage) for a complete list of all the supported countries.<br><br>Most Search queries default to `maxFuzzyLevel`=2 to gain performance and also reduce unusual results. This new default can be overridden as needed per request by passing in the query param `maxFuzzyLevel`=3 or 4.
 */
export interface SearchFuzzySearch200Response extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Free Form Search**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The basic default API is Free Form Search which handles the most fuzzy of inputs handling any combination of address or POI tokens. This search API is the canonical 'single line search'. The Free Form Search API is a seamless combination of POI search and geocoding. The API can also be weighted with a contextual position (lat./lon. pair), or fully constrained by a coordinate and radius, or it can be executed more generally without any geo biasing anchor point.<br><br>We strongly advise you to use the 'countrySet' parameter to specify only the countries for which your application needs coverage, as the default behavior will be to search the entire world, potentially returning unnecessary results.<br><br> E.g.: `countrySet`=US,FR <br><br>Please see [Search Coverage](https://docs.microsoft.com/azure/location-based-services/geocoding-coverage) for a complete list of all the supported countries.<br><br>Most Search queries default to `maxFuzzyLevel`=2 to gain performance and also reduce unusual results. This new default can be overridden as needed per request by passing in the query param `maxFuzzyLevel`=3 or 4.
 */
export interface SearchFuzzySearchDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Get POI by Name**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * Points of Interest (POI) Search allows you to request POI results by name.  Search supports additional query parameters such as language and filtering results by area of interest driven by country or bounding box.  Endpoint will return only POI results matching the query string. Response includes POI details such as address, coordinate location and category.
 */
export interface SearchSearchPointOfInterest200Response extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Get POI by Name**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * Points of Interest (POI) Search allows you to request POI results by name.  Search supports additional query parameters such as language and filtering results by area of interest driven by country or bounding box.  Endpoint will return only POI results matching the query string. Response includes POI details such as address, coordinate location and category.
 */
export interface SearchSearchPointOfInterestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Nearby Search**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * If you have a use case for only retrieving POI results around a specific location, the nearby search method may be the right choice. This endpoint will only return POI results, and does not take in a search query parameter.
 */
export interface SearchSearchNearbyPointOfInterest200Response
  extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Nearby Search**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * If you have a use case for only retrieving POI results around a specific location, the nearby search method may be the right choice. This endpoint will only return POI results, and does not take in a search query parameter.
 */
export interface SearchSearchNearbyPointOfInterestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Get POI by Category**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * Points of Interest (POI) Category Search allows you to request POI results from given category. Search allows to query POIs from one category at a time.  Endpoint will only return POI results which are categorized as specified.  Response includes POI details such as address, coordinate location and classification.
 */
export interface SearchSearchPointOfInterestCategory200Response
  extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Get POI by Category**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * Points of Interest (POI) Category Search allows you to request POI results from given category. Search allows to query POIs from one category at a time.  Endpoint will only return POI results which are categorized as specified.  Response includes POI details such as address, coordinate location and classification.
 */
export interface SearchSearchPointOfInterestCategoryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Get POI Category Tree**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * POI Category API provides a full list of supported Points of Interest (POI) categories and subcategories together with their translations and synonyms. The returned content can be used to provide more meaningful results through other Search Service APIs, like [Get Search POI](https://docs.microsoft.com/rest/api/maps/search/getsearchpoi).
 */
export interface SearchGetPointOfInterestCategoryTree200Response
  extends HttpResponse {
  status: "200";
  body: PointOfInterestCategoryTreeResultOutput;
}

/**
 * **Get POI Category Tree**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * POI Category API provides a full list of supported Points of Interest (POI) categories and subcategories together with their translations and synonyms. The returned content can be used to provide more meaningful results through other Search Service APIs, like [Get Search POI](https://docs.microsoft.com/rest/api/maps/search/getsearchpoi).
 */
export interface SearchGetPointOfInterestCategoryTreeDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Address Geocoding**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocode endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties, states etc.
 */
export interface SearchSearchAddress200Response extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Address Geocoding**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * In many cases, the complete search service might be too much, for instance if you are only interested in traditional geocoding. Search can also be accessed for address look up exclusively. The geocoding is performed by hitting the geocode endpoint with just the address or partial address in question. The geocoding search index will be queried for everything above the street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses. It will also handle everything from exact street addresses or street or intersections as well as higher level geographies such as city centers, counties, states etc.
 */
export interface SearchSearchAddressDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Reverse Geocode to an Address**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * There may be times when you need to translate a  coordinate (example: 37.786505, -122.3862) into a human understandable street address. Most often  this is needed in tracking applications where you  receive a GPS feed from the device or asset and  wish to know what address where the coordinate is  located. This endpoint will return address  information for a given coordinate.
 */
export interface SearchReverseSearchAddress200Response extends HttpResponse {
  status: "200";
  body: ReverseSearchAddressResultOutput;
}

/**
 * **Reverse Geocode to an Address**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * There may be times when you need to translate a  coordinate (example: 37.786505, -122.3862) into a human understandable street address. Most often  this is needed in tracking applications where you  receive a GPS feed from the device or asset and  wish to know what address where the coordinate is  located. This endpoint will return address  information for a given coordinate.
 */
export interface SearchReverseSearchAddressDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Reverse Geocode to a Cross Street**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * There may be times when you need to translate a  coordinate (example: 37.786505, -122.3862) into a human understandable cross street. Most often this  is needed in tracking applications where you  receive a GPS feed from the device or asset and wish to know what address where the coordinate is  located.
 * This endpoint will return cross street information  for a given coordinate.
 */
export interface SearchReverseSearchCrossStreetAddress200Response
  extends HttpResponse {
  status: "200";
  body: ReverseSearchCrossStreetAddressResultOutput;
}

/**
 * **Reverse Geocode to a Cross Street**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * There may be times when you need to translate a  coordinate (example: 37.786505, -122.3862) into a human understandable cross street. Most often this  is needed in tracking applications where you  receive a GPS feed from the device or asset and wish to know what address where the coordinate is  located.
 * This endpoint will return cross street information  for a given coordinate.
 */
export interface SearchReverseSearchCrossStreetAddressDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Structured Address Geocoding**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * Azure Address Geocoding can also be accessed for  structured address look up exclusively. The geocoding search index will be queried for everything above the  street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete  addresses. It will also handle everything from exact  street addresses or street or intersections as well as higher level geographies such as city centers,  counties, states etc.
 */
export interface SearchSearchStructuredAddress200Response extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Structured Address Geocoding**
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * Azure Address Geocoding can also be accessed for  structured address look up exclusively. The geocoding search index will be queried for everything above the  street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete  addresses. It will also handle everything from exact  street addresses or street or intersections as well as higher level geographies such as city centers,  counties, states etc.
 */
export interface SearchSearchStructuredAddressDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 */
export interface SearchSearchInsideGeometry200Response extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Geometry endpoint allows you to perform a free form search inside a single geometry or many of them. The search results that fall inside the geometry/geometries will be returned.<br><br>To send the geometry you will use a `POST` request where the request body will contain the `geometry` object represented as a `GeoJSON` type and the `Content-Type` header will be set to `application/json`. The geographical features to be searched can be modeled as Polygon and/or Circle geometries represented using any one of the following `GeoJSON` types:<ul><li>**GeoJSON FeatureCollection** <br>The `geometry` can be represented as a `GeoJSON FeatureCollection` object. This is the recommended option if the geometry contains both Polygons and Circles. The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects. Each `Feature` object should represent either a Polygon or a Circle with the following conditions:<ul style="list-style-type:none"><li>A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.</li><li>A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value (in meters) which must be specified in the object's properties along with the _subType_ property whose value should be 'Circle'.</li></ul><br> Please see the Examples section below for a sample `FeatureCollection` representation.<br><br></li><li>**GeoJSON GeometryCollection**<br>The `geometry` can be represented as a `GeoJSON GeometryCollection` object. This is the recommended option if the geometry contains a list of Polygons only. The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects. Each `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `GeometryCollection` representation.<br><br></li><li>**GeoJSON Polygon**<br>The `geometry` can be represented as a `GeoJSON Polygon` object. This is the recommended option if the geometry contains a single Polygon. The `Polygon` object can have a max of 50 coordinates. Please see the Examples section below for a sample `Polygon` representation.<br><br></li></ul>.<br><br>
 */
export interface SearchSearchInsideGeometryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Along Route endpoint allows you to perform a fuzzy search for POIs along a specified route. This search is constrained by specifying the `maxDetourTime` limiting measure.<br><br>To send the route-points you will use a `POST` request where the request body will contain the `route` object represented as a `GeoJSON LineString` type and the `Content-Type` header will be set to `application/json`. Each route-point in `route` is represented as a `GeoJSON Position` type i.e. an array where the _longitude_ value is followed by the _latitude_ value and the _altitude_ value is ignored. The `route` should contain at least 2 route-points.<br><br>It is possible that original route will be altered, some of it's points may be skipped. If the route that passes through the found point is faster than the original one, the `detourTime` value in the response is negative.
 */
export interface SearchSearchAlongRoute200Response extends HttpResponse {
  status: "200";
  body: SearchAddressResultOutput;
}

/**
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Along Route endpoint allows you to perform a fuzzy search for POIs along a specified route. This search is constrained by specifying the `maxDetourTime` limiting measure.<br><br>To send the route-points you will use a `POST` request where the request body will contain the `route` object represented as a `GeoJSON LineString` type and the `Content-Type` header will be set to `application/json`. Each route-point in `route` is represented as a `GeoJSON Position` type i.e. an array where the _longitude_ value is followed by the _latitude_ value and the _altitude_ value is ignored. The `route` should contain at least 2 route-points.<br><br>It is possible that original route will be altered, some of it's points may be skipped. If the route that passes through the found point is faster than the original one, the `detourTime` value in the response is negative.
 */
export interface SearchSearchAlongRouteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchFuzzySearchBatchSync200Response extends HttpResponse {
  status: "200";
  body: SearchAddressBatchResultOutput;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchFuzzySearchBatchSync408Response extends HttpResponse {
  status: "408";
  body: ErrorResponseOutput;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchFuzzySearchBatchSyncDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchFuzzySearchBatch200Response extends HttpResponse {
  status: "200";
  body: SearchAddressBatchResultOutput;
}

export interface SearchFuzzySearchBatch202Headers {
  /** New URL to check for the results of the long running process. */
  location?: string;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchFuzzySearchBatch202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & SearchFuzzySearchBatch202Headers;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchGetFuzzySearchBatch200Response extends HttpResponse {
  status: "200";
  body: SearchAddressBatchResultOutput;
}

export interface SearchGetFuzzySearchBatch202Headers {
  /** New URL to check for the results of the long running process. */
  location?: string;
}

/**
 * **Search Fuzzy Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
 *         {"query": "?query=Statue Of Liberty&limit=2"},
 *         {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
 *         {"query": "?query=Space Needle"},
 *         {"query": "?query=pizza&limit=10"}
 *     ]
 * }
 * ```
 *
 * A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "atm"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "ATM at Wells Fargo"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "statue of liberty"
 *                 },
 *                 "results": [
 *                     {
 *                         "type": "POI",
 *                         "poi": {
 *                             "name": "Statue of Liberty"
 *                         },
 *                         "address": {
 *                             "country": "United States Of America",
 *                             "freeformAddress": "New York, NY 10004"
 *                         }
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
export interface SearchGetFuzzySearchBatch202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & SearchGetFuzzySearchBatch202Headers;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchSearchAddressBatchSync200Response extends HttpResponse {
  status: "200";
  body: SearchAddressBatchResultOutput;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchSearchAddressBatchSync408Response extends HttpResponse {
  status: "408";
  body: ErrorResponseOutput;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchSearchAddressBatchSyncDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchSearchAddressBatch200Response extends HttpResponse {
  status: "200";
  body: SearchAddressBatchResultOutput;
}

export interface SearchSearchAddressBatch202Headers {
  /** New URL to check for the results of the long running process. */
  location?: string;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchSearchAddressBatch202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & SearchSearchAddressBatch202Headers;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchGetSearchAddressBatch200Response extends HttpResponse {
  status: "200";
  body: SearchAddressBatchResultOutput;
}

export interface SearchGetSearchAddressBatch202Headers {
  /** New URL to check for the results of the long running process. */
  location?: string;
}

/**
 * **Search Address Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress) using just a single API call. You can call Search Address Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=400 Broad St, Seattle, WA 98109&limit=3"},
 *         {"query": "?query=One, Microsoft Way, Redmond, WA 98052&limit=3"},
 *         {"query": "?query=350 5th Ave, New York, NY 10118&limit=1"},
 *         {"query": "?query=Pike Pl, Seattle, WA 98101&lat=47.610970&lon=-122.342469&radius=1000"},
 *         {"query": "?query=Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France&limit=1"}
 *     ]
 * }
 * ```
 *
 * A _search address_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#uri-parameters). The string values in the _search address_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddress#SearchAddressResponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "one microsoft way redmond wa 98052"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.63989,
 *                             "lon": -122.12509
 *                         }
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "query": "pike pl seattle wa 98101"
 *                 },
 *                 "results": [
 *                     {
 *                         "position": {
 *                             "lat": 47.60963,
 *                             "lon": -122.34215
 *                         }
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
export interface SearchGetSearchAddressBatch202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & SearchGetSearchAddressBatch202Headers;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchReverseSearchAddressBatchSync200Response
  extends HttpResponse {
  status: "200";
  body: ReverseSearchAddressBatchResultOutput;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchReverseSearchAddressBatchSync408Response
  extends HttpResponse {
  status: "408";
  body: ErrorResponseOutput;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchReverseSearchAddressBatchSyncDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchReverseSearchAddressBatch200Response
  extends HttpResponse {
  status: "200";
  body: ReverseSearchAddressBatchResultOutput;
}

export interface SearchReverseSearchAddressBatch202Headers {
  /** New URL to check for the results of the long running process. */
  location?: string;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchReverseSearchAddressBatch202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & SearchReverseSearchAddressBatch202Headers;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchGetReverseSearchAddressBatch200Response
  extends HttpResponse {
  status: "200";
  body: ReverseSearchAddressBatchResultOutput;
}

export interface SearchGetReverseSearchAddressBatch202Headers {
  /** New URL to check for the results of the long running process. */
  location?: string;
}

/**
 * **Search Address Reverse Batch API**
 *
 *
 * **Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).
 *
 * The Search Address Batch API sends batches of queries to [Search Address Reverse API](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse) using just a single API call. You can call Search Address Reverse Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
 * ### Submit Synchronous Batch Request
 * The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
 * ```
 * POST https://atlas.microsoft.com/search/address/reverse/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
 * ```
 * ### Submit Asynchronous Batch Request
 * The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
 * - It allows the retrieval of results in a separate call (multiple downloads are possible).
 * - The asynchronous API is optimized for reliability and is not expected to run into a timeout.
 * - The number of batch items is limited to **10,000** for this API.
 *
 * When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
 * The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.
 *
 * Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
 * 1. Client sends a Search Address Batch `POST` request to Azure Maps
 * 2. The server will respond with one of the following:
 *
 *     > HTTP `202 Accepted` - Batch request has been accepted.
 *
 *     > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.
 *
 * 3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
 *     This status URI looks like following:
 *
 * ```
 *     GET https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
 * ```
 * 4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.
 *
 * ### POST Body for Batch Request
 * To send the _search address reverse_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search address reverse_ queries:
 *
 *
 * ```json
 * {
 *     "batchItems": [
 *         {"query": "?query=48.858561,2.294911"},
 *         {"query": "?query=47.639765,-122.127896&radius=5000&limit=2"},
 *         {"query": "?query=47.621028,-122.348170"},
 *         {"query": "?query=43.722990,10.396695"},
 *         {"query": "?query=40.750958,-73.982336"}
 *     ]
 * }
 * ```
 *
 * A _search address reverse_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search address reverse_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#uri-parameters). The string values in the _search address reverse_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.
 *
 *
 * The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.
 *
 *
 * ### Download Asynchronous Batch Results
 * To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:
 *
 * ```
 * https://atlas.microsoft.com/search/address/reverse/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
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
 *   - [`SearchAddressReverseResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse#searchaddressreverseresponse) - If the query completed successfully.
 *
 *   - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.
 *
 *
 * Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:
 *
 *
 * ```json
 * {
 *     "summary": {
 *         "successfulRequests": 2,
 *         "totalRequests": 3
 *     },
 *     "batchItems": [
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 11
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "France",
 *                             "freeformAddress": "Avenue Anatole France, 75007 Paris"
 *                         },
 *                         "position": "48.858490,2.294820"
 *                     }
 *                 ]
 *             }
 *         },
 *         {
 *             "statusCode": 200,
 *             "response":
 *             {
 *                 "summary": {
 *                     "queryTime": 1
 *                 },
 *                 "addresses": [
 *                     {
 *                         "address": {
 *                             "country": "United States of America",
 *                             "freeformAddress": "157th Pl NE, Redmond WA 98052"
 *                         },
 *                         "position": "47.640470,-122.129430"
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
export interface SearchGetReverseSearchAddressBatch202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & SearchGetReverseSearchAddressBatch202Headers;
}
