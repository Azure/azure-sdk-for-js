# Azure Maps Search Protocol Layer

> see https://aka.ms/autorest

## Configuration

The configuration is following the [RLC quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md).
For the configuration property, please refer to [Index of AutoRest Flag](https://github.com/Azure/autorest/blob/main/docs/generate/flags.md).

```yaml
package-name: "@azure-rest/maps-search"
title: MapsSearchClient
description: Azure Maps Search Client
# This flag generated files including all the config files, LICENSE, sample.env, and package.json.
# We switch this to false after the first generation because we have some manual changes in these files and don't want them get overwrite.
# Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-generate-rlc
generate-metadata: false
# This flag generated test files such as sampleTest.spec.ts and recordedClient.ts.
# Switch to false after the first generation due to the same reason above.
generate-test: false
# This flag generated the the sample files
# Switch to false after the first generation due to the same reason above.
generate-sample: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Search/preview/1.0/search.json
package-version: 1.0.0-beta.4
rest-level-client: true
# Although maps service supports key-credentials and AAD, maps service requires header "ms-x-client-id", which is different from the standard AAD, so we don't generate AAD code and implement ourselves.
# For auth configuration, please refer to: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-configure-authentication
security: AzureKey
security-header-name: subscription-key
use-extension:
  "@autorest/typescript": "6.0.0-rc.3"
```

## Customization for Track 2 Generator

To understand more about how Directives works, please refer to: https://github.com/Azure/autorest/blob/main/docs/generate/directives.md

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

### Change the schema of SharedKey

Replace `query` with `header` in the field `in` since [modelerfour](https://github.com/Azure/autorest/tree/main/packages/extensions/modelerfour) considers this is invalid.

```yaml
directive:
  - from: swagger-document
    where: $.securityDefinitions
    transform: |
      $["SharedKey"]["in"] = "header";
```
