// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsSearchClient, {
  SearchFuzzySearchBatchSyncParameters,
} from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to **Search Fuzzy Batch API**


**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
### Submit Synchronous Batch Request
The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
```
POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
```
### Submit Asynchronous Batch Request
The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
- It allows the retrieval of results in a separate call (multiple downloads are possible).
- The asynchronous API is optimized for reliability and is not expected to run into a timeout.
- The number of batch items is limited to **10,000** for this API.

When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.

Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
1. Client sends a Search Address Batch `POST` request to Azure Maps
2. The server will respond with one of the following:

    > HTTP `202 Accepted` - Batch request has been accepted.

    > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.

3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
    This status URI looks like following:

```
    GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
```
4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.

### POST Body for Batch Request
To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:


```json
{
    "batchItems": [
        {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
        {"query": "?query=Statue Of Liberty&limit=2"},
        {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
        {"query": "?query=Space Needle"},
        {"query": "?query=pizza&limit=10"}
    ]
}
```

A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.


The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.


### Download Asynchronous Batch Results
To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:

```
https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
```
Here's the typical sequence of operations for downloading the batch results:
1. Client sends a `GET` request using the _download URL_.
2. The server will respond with one of the following:

    > HTTP `202 Accepted` - Batch request was accepted but is still being processed. Please try again in some time.

    > HTTP `200 OK` - Batch request successfully processed. The response body contains all the batch results.



### Batch Response Model
The returned data content is similar for async and sync requests. When downloading the results of an async batch request, if the batch has finished processing, the response body contains the batch response. This batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests`i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item in `batchItems` contains `statusCode` and `response` fields. Each `response` in `batchItems` is of one of the following types:

  - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.

  - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.


Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:


```json
{
    "summary": {
        "successfulRequests": 2,
        "totalRequests": 3
    },
    "batchItems": [
        {
            "statusCode": 200,
            "response":
            {
                "summary": {
                    "query": "atm"
                },
                "results": [
                    {
                        "type": "POI",
                        "poi": {
                            "name": "ATM at Wells Fargo"
                        },
                        "address": {
                            "country": "United States Of America",
                            "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
                        }
                    }
                ]
            }
        },
        {
            "statusCode": 200,
            "response":
            {
                "summary": {
                    "query": "statue of liberty"
                },
                "results": [
                    {
                        "type": "POI",
                        "poi": {
                            "name": "Statue of Liberty"
                        },
                        "address": {
                            "country": "United States Of America",
                            "freeformAddress": "New York, NY 10004"
                        }
                    }
                ]
            }
        },
        {
            "statusCode": 400,
            "response":
            {
                "error":
                {
                    "code": "400 BadRequest",
                    "message": "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
                }
            }
        }
    ]
}
```
 *
 * @summary **Search Fuzzy Batch API**


**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).

The Search Address Batch API sends batches of queries to [Search Fuzzy API](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy) using just a single API call. You can call Search Address Fuzzy Batch API to run either asynchronously (async) or synchronously (sync). The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries.
### Submit Synchronous Batch Request
The Synchronous API is recommended for lightweight batch requests. When the service receives a request, it will respond as soon as the batch items are calculated and there will be no possibility to retrieve the results later. The Synchronous API will return a timeout error (a 408 response) if the request takes longer than 60 seconds. The number of batch items is limited to **100** for this API.
```
POST https://atlas.microsoft.com/search/fuzzy/batch/sync/json?api-version=1.0&subscription-key={subscription-key}
```
### Submit Asynchronous Batch Request
The Asynchronous API is appropriate for processing big volumes of relatively complex search requests
- It allows the retrieval of results in a separate call (multiple downloads are possible).
- The asynchronous API is optimized for reliability and is not expected to run into a timeout.
- The number of batch items is limited to **10,000** for this API.

When you make a request by using async request, by default the service returns a 202 response code along a redirect URL in the Location field of the response header. This URL should be checked periodically until the response data or error information is available.
The asynchronous responses are stored for **14** days. The redirect URL returns a 404 response if used after the expiration period.

Please note that asynchronous batch request is a long-running request. Here's a typical sequence of operations:
1. Client sends a Search Address Batch `POST` request to Azure Maps
2. The server will respond with one of the following:

    > HTTP `202 Accepted` - Batch request has been accepted.

    > HTTP `Error` - There was an error processing your Batch request. This could either be a `400 Bad Request` or any other `Error` status code.

3. If the batch request was accepted successfully, the `Location` header in the response contains the URL to download the results of the batch request.
    This status URI looks like following:

```
    GET https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
```
4. Client issues a `GET` request on the _download URL_ obtained in Step 3 to download the batch results.

### POST Body for Batch Request
To send the _search fuzzy_ queries you will use a `POST` request where the request body will contain the `batchItems` array in `json` format and the `Content-Type` header will be set to `application/json`. Here's a sample request body containing 5 _search fuzzy_ queries:


```json
{
    "batchItems": [
        {"query": "?query=atm&lat=47.639769&lon=-122.128362&radius=5000&limit=5"},
        {"query": "?query=Statue Of Liberty&limit=2"},
        {"query": "?query=Starbucks&lat=47.639769&lon=-122.128362&radius=5000"},
        {"query": "?query=Space Needle"},
        {"query": "?query=pizza&limit=10"}
    ]
}
```

A _search fuzzy_ query in a batch is just a partial URL _without_ the protocol, base URL, path, api-version and subscription-key. It can accept any of the supported _search fuzzy_ [URI parameters](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#uri-parameters). The string values in the _search fuzzy_ query must be properly escaped (e.g. " character should be escaped with \\ ) and it should also be properly URL-encoded.


The async API allows caller to batch up to **10,000** queries and sync API up to **100** queries, and the batch should contain at least **1** query.


### Download Asynchronous Batch Results
To download the async batch results you will issue a `GET` request to the batch download endpoint. This _download URL_ can be obtained from the `Location` header of a successful `POST` batch request and looks like the following:

```
https://atlas.microsoft.com/search/fuzzy/batch/{batch-id}?api-version=1.0&subscription-key={subscription-key}
```
Here's the typical sequence of operations for downloading the batch results:
1. Client sends a `GET` request using the _download URL_.
2. The server will respond with one of the following:

    > HTTP `202 Accepted` - Batch request was accepted but is still being processed. Please try again in some time.

    > HTTP `200 OK` - Batch request successfully processed. The response body contains all the batch results.



### Batch Response Model
The returned data content is similar for async and sync requests. When downloading the results of an async batch request, if the batch has finished processing, the response body contains the batch response. This batch response contains a `summary` component that indicates the `totalRequests` that were part of the original batch request and `successfulRequests`i.e. queries which were executed successfully. The batch response also includes a `batchItems` array which contains a response for each and every query in the batch request. The `batchItems` will contain the results in the exact same order the original queries were sent in the batch request. Each item in `batchItems` contains `statusCode` and `response` fields. Each `response` in `batchItems` is of one of the following types:

  - [`SearchAddressResponse`](https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy#SearchAddressResponse) - If the query completed successfully.

  - `Error` - If the query failed. The response will contain a `code` and a `message` in this case.


Here's a sample Batch Response with 2 _successful_ and 1 _failed_ result:


```json
{
    "summary": {
        "successfulRequests": 2,
        "totalRequests": 3
    },
    "batchItems": [
        {
            "statusCode": 200,
            "response":
            {
                "summary": {
                    "query": "atm"
                },
                "results": [
                    {
                        "type": "POI",
                        "poi": {
                            "name": "ATM at Wells Fargo"
                        },
                        "address": {
                            "country": "United States Of America",
                            "freeformAddress": "3240 157th Ave NE, Redmond, WA 98052"
                        }
                    }
                ]
            }
        },
        {
            "statusCode": 200,
            "response":
            {
                "summary": {
                    "query": "statue of liberty"
                },
                "results": [
                    {
                        "type": "POI",
                        "poi": {
                            "name": "Statue of Liberty"
                        },
                        "address": {
                            "country": "United States Of America",
                            "freeformAddress": "New York, NY 10004"
                        }
                    }
                ]
            }
        },
        {
            "statusCode": 400,
            "response":
            {
                "error":
                {
                    "code": "400 BadRequest",
                    "message": "Bad request: one or more parameters were incorrectly specified or are mutually exclusive."
                }
            }
        }
    ]
}
```
 * x-ms-original-file: specification/maps/data-plane/Search/preview/1.0/examples/PostSearchFuzzyBatchSync.json
 */
async function aSyncSearchFuzzyBatchApiCallContaining5SearchFuzzyApiQueries() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsSearchClient(credential);
  const format = "json";
  const options: SearchFuzzySearchBatchSyncParameters = {};
  const result = await client.path("/search/fuzzy/batch/sync/{format}", format).post(options);
  console.log(result);
}

aSyncSearchFuzzyBatchApiCallContaining5SearchFuzzyApiQueries().catch(console.error);
