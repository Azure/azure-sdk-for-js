# Azure Maps Search Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/maps-search"
title: MapsSearchClient
description: Azure Maps Search Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Search/preview/1.0/search.json
add-credentials: false
override-client-name: GeneratedClient
package-version: 1.0.0-beta.2
disable-async-iterators: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
```

## Customization for Track 2 Generator

### SearchInsideGeometryRequestBody Transform

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SearchInsideGeometryRequest.properties.geometry
    transform: >
      $ = {
        "description": "A valid `GeoJSON` object. Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946#section-3) for details.",
        "type": "object"
      };
    reason: Autorest TS codegen does not deserialize array of base class objects as an operation parameter properly -> https://github.com/Azure/autorest.typescript/issues/1040
```

### Define Required Fields

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Polygon
    transform: >
      $["required"] = [
        "providerID",
      ]
  - from: swagger-document
    where: $.definitions.PointOfInterestCategory
    transform: >
      $["required"] = [
        "id",
        "name",
        "childCategoryIds",
        "synonyms",
      ]
  - from: swagger-document
    where: $.definitions.SearchAddressResult
    transform: >
      $["required"] = [
        "summary",
        "results",
      ]
  - from: swagger-document
    where: $.definitions.SearchSummary
    transform: >
      $["required"] = [
        "queryTime",
        "numResults",
      ]
  - from: swagger-document
    where: $.definitions.LatLongPairAbbreviated
    transform: >
      $["required"] = [
        "lat",
        "lon",
      ]
  - from: swagger-document
    where: $.definitions.SearchAddressResultItem
    transform: >
      $["required"] = [
        "type",
        "id",
        "score",
        "address",
        "position",
        "viewport",
      ]
  - from: swagger-document
    where: $.definitions.EntryPoint
    transform: >
      $["required"] = [
        "type",
        "position",
      ]

  - from: swagger-document
    where: $.definitions.PointOfInterest
    transform: >
      $["required"] = [
        "name",
      ]
  - from: swagger-document
    where: $.definitions.Geometry
    transform: >
      $["required"] = [
        "id",
      ]
  - from: swagger-document
    where: $.definitions.AddressRanges
    transform: >
      $["required"] = [
        "rangeLeft",
        "rangeRight",
        "from",
        "to",
      ]
  - from: swagger-document
    where: $.definitions.ReverseSearchAddressResult
    transform: >
      $["required"] = [
        "summary",
        "addresses",
      ]
  - from: swagger-document
    where: $.definitions.ReverseSearchAddressResultItem
    transform: >
      $["required"] = [
        "address",
        "position",
      ]
  - from: swagger-document
    where: $.definitions.ReverseSearchCrossStreetAddressResult
    transform: >
      $["required"] = [
        "summary",
        "addresses",
      ]
  - from: swagger-document
    where: $.definitions.PointOfInterestCategorySet
    transform: >
      $["required"] = [
        "id",
      ]
  - from: swagger-document
    where: $.definitions.Classification
    transform: >
      $["required"] = [
        "code",
        "names",
      ]
  - from: swagger-document
    where: $.definitions.ClassificationName
    transform: >
      $["required"] = [
        "nameLocale",
        "name",
      ]
  - from: swagger-document
    where: $.definitions.Brand
    transform: >
      $["required"] = [
        "name",
      ]
  - from: swagger-document
    where: $.definitions.OperatingHours
    transform: >
      $["required"] = [
        "mode",
        "timeRanges",
      ]
  - from: swagger-document
    where: $.definitions.OperatingHoursTimeRange
    transform: >
      $["required"] = [
        "startTime",
        "endTime",
      ]
  - from: swagger-document
    where: $.definitions.OperatingHoursTime
    transform: >
      $["required"] = [
        "date",
        "hour",
        "minute",
      ]
  - from: swagger-document
    where: $.definitions.BoundingBox
    transform: >
      $["required"] = [
        "topLeftPoint",
        "btmRightPoint",
      ]
  - from: swagger-document
    where: $.definitions.BoundingBoxCompassNotation
    transform: >
      $["required"] = [
        "northEast",
        "southWest",
      ]
  - from: swagger-document
    where: $.definitions.BatchResultItem
    transform: >
      $["required"] = [
        "statusCode",
      ]
  - from: swagger-document
    where: $.definitions.BatchResult
    transform: >
      $["required"] = [
        "summary",
      ]
  - from: swagger-document
    where: $.definitions.BatchResult.properties.summary
    transform: >
      $["required"] = [
        "successfulRequests",
        "totalRequests",
      ]
  - from: swagger-document
    where: $.definitions.SearchAddressBatchItem
    transform: >
      $["required"] = [
        "response",
      ]
  - from: swagger-document
    where: $.definitions.ReverseSearchAddressBatchItem
    transform: >
      $["required"] = [
        "response",
      ]
  - from: swagger-document
    where: $.definitions.SearchAddressBatchProcessResult
    transform: >
      $["required"] = [
        "batchItems",
      ]
  - from: swagger-document
    where: $.definitions.ReverseSearchAddressBatchProcessResult
    transform: >
      $["required"] = [
        "batchItems",
      ]
```

### Model Rename

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Polygon.properties.providerID
    transform: >
      $["x-ms-client-name"] = "providerId";
  - from: swagger-document
    where: $.definitions.BatchResult.properties.summary.properties.successfulRequests
    transform: >
      $["x-ms-client-name"] = "totalSuccessfulRequests";
  - from: swagger-document
    where: $.parameters.CountrySet
    transform: >
      $["x-ms-client-name"] = "CountryCodeFilter";
```

### Model Fixes

```yaml
directive:
  - from: swagger-document
    where-model: SearchSummary
    remove-property: limit
  - from: swagger-document
    where: $.definitions.ErrorDetail
    transform: >
      $ = {
        "type": "object",
        "description": "The error detail.",
        "properties": {
          "code": {
            "readOnly": true,
            "type": "string",
            "description": "The error code."
          },
          "message": {
            "readOnly": true,
            "type": "string",
            "description": "The error message."
          }
        }
      };
```

### Disable LRO

For data-plane sdk, we don't use the generated LRO so we can use the `processResult` to map the API result and hide the deprecated `cancelOperation`.

```yaml
directive:
  - from: swagger-document
    where: $["paths"][*]
    transform: >
      for (var op of Object.values($)) {
        if (op["x-ms-long-running-operation"]) {
          delete op["x-ms-long-running-operation"];
        }
      }
```
