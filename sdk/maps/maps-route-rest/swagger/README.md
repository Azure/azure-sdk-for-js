# Azure Maps Route Protocol Layer

> see https://aka.ms/autorest

## Configuration

The configuration is following the [RLC quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md).
For the configuration property, please refer to [Index of AutoRestFlag](https://github.com/Azure/autorest/blob/main/docs/generate/flags.md).

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/maps-route"
title: MapsRouteClient
description: Azure Maps Route Client
# This flag generated files including all the config files, LICENSE, sample.env, and package.json.
# We switch this to false after the first generation because we have some manual changes in these files and don't want them get overwrite.
# Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-generate-rlc
generate-metadata: false
# This flag generated test files such as sampleTest.spec.ts and recordedClient.ts.
# Switch to false after the first generation due to the same reason above.
generate-test: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Route/preview/1.0/route.json
package-version: 1.0.0-beta.7
rest-level-client: true
# Although maps-route supports key-credentials and Microsoft Entra ID, maps-route requires header "ms-x-client-id", which is different from the standard Microsoft Entra ID, so we don't generate Microsoft Entra ID code and implement ourselves.
# For auth configuration, please refer to: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-configure-authentication
security: AzureKey
security-header-name: subscription-key
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

## Customization for Track 2 Generator

To understand more about how Directives works, please refer to: https://github.com/Azure/autorest/blob/main/docs/generate/directives.md

### RouteDirectionParameters Transform

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RouteDirectionParameters.properties.supportingPoints
    transform: >
      $ = {
        "description": "A GeoJSON Geometry collection representing sequence of coordinates used as input for route reconstruction and for calculating zero or more alternative routes to this reference route.\n  - The provided sequence of supporting points is used as input for route reconstruction.\n  - The alternative routes are calculated between the origin and destination points specified in the base path parameter locations.\n  - If both _minDeviationDistance_ and _minDeviationTime_ are set to zero, then these origin and destination points are\n  expected to be at (or very near) the beginning and end of the reference route, respectively.\n  - Intermediate locations (_waypoints_) are not supported when using <_supportingPoints_>.\n  - The reference route may contain traffic incidents of type _ROAD_CLOSURE_, which are\n  ignored for the calculation of the reference route's travel time and traffic delay.",
        "type": "object"
      };
    reason: Autorest TS codegen does not deserialize array of base class objects as an operation parameter properly -> https://github.com/Azure/autorest.typescript/issues/1040
```

### Define Required Fields

```yaml
directive:
  # Route Matrix
  - from: swagger-document
    where: $.definitions.RouteMatrixQuery
    transform: >
      $["required"] = [
        "origins",
        "destinations",
      ]
  - from: swagger-document
    where: $.definitions.RouteMatrixResult
    transform: >
      $["required"] = [
        "matrix",
        "summary",
      ]
  - from: swagger-document
    where: $.definitions.RouteMatrixSummary
    transform: >
      $["required"] = [
        "successfulRoutes",
        "totalRoutes",
      ]
  - from: swagger-document
    where: $.definitions.RouteMatrix
    transform: >
      $["required"] = [
        "statusCode",
      ]
  - from: swagger-document
    where: $.definitions.RouteSummary
    transform: >
      $["required"] = [
        "lengthInMeters",
        "travelTimeInSeconds",
        "trafficDelayInSeconds",
        "departureTime",
        "arrivalTime",
      ]
  # Route Range
  - from: swagger-document
    where: $.definitions.RouteRangeResult
    transform: >
      $["required"] = [
        "reachableRange",
      ]
  - from: swagger-document
    where: $.definitions.RouteRange
    transform: >
      $["required"] = [
        "center",
        "boundary",
      ]
  - from: swagger-document
    where: $.definitions.RouteReport
    transform: >
      $["required"] = [
        "effectiveSettings",
      ]
  - from: swagger-document
    where: $.definitions.EffectiveSetting
    transform: >
      $["required"] = [
        "key",
        "value",
      ]
  # Route Directions
  - from: swagger-document
    where: $.definitions.RouteDirections
    transform: >
      $["required"] = [
        "routes",
      ]
  - from: swagger-document
    where: $.definitions.RouteOptimizedWaypoint
    transform: >
      $["required"] = [
        "providedIndex",
        "optimizedIndex",
      ]
  - from: swagger-document
    where: $.definitions.Route
    transform: >
      $["required"] = [
        "legs",
        "summary"
      ]
  - from: swagger-document
    where: $.definitions.RouteLeg
    transform: >
      $["required"] = [
        "points",
        "summary"
      ]
  - from: swagger-document
    where: $.definitions.LatLongPair
    transform: >
      $["required"] = [
        "latitude",
        "longitude"
      ]
  - from: swagger-document
    where: $.definitions.RouteSection
    transform: >
      $["required"] = [
        "startPointIndex",
        "endPointIndex",
        "sectionType",
      ]
  - from: swagger-document
    where: $.definitions.RouteGuidance
    transform: >
      $["required"] = [
        "instructions",
        "instructionGroups"
      ]
  # Batch
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
    where: $.definitions.RouteDirectionsBatchItem
    transform: >
      $["required"] = [
        "response",
      ]
  - from: swagger-document
    where: $.definitions.RouteDirectionsBatchResult
    transform: >
      $["required"] = [
        "batchItems",
      ]
```

### Flattening of RouteMatrixResult Properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RouteMatrix.properties.response
    transform: >
      $["x-ms-client-flatten"] = true;
```

### Model Fixes

```yaml
directive:
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
  - from: swagger-document
    where: $.definitions.RouteMatrixResultResponse
    transform: >
      $ = {     
        "description": "Response object of the current cell in the input matrix.",
        "type": "object",
        "readOnly": true,
        "properties": {
          "routeSummary": {
            "$ref": "#/definitions/RouteSummary"
          }
        }
      };
  - from: swagger-document
    where: $.definitions.RouteLeg.properties.summary
    transform: >
      $ = { "$ref": "#/definitions/RouteSummary" };
  - remove-model: RouteLegSummary
  - from: swagger-document
    where: $.definitions.RouteInstruction.properties.drivingSide
    transform: >
      $["x-ms-enum"] = {
        "name": "DrivingSide",
        "modelAsString": false,
        "values": [
          {
            "value": "LEFT",
            "description": "Left side."
          },
          {
            "value": "RIGHT",
            "description": "Right side."
          }
        ]
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
