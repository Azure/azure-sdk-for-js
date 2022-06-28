# Azure Maps Route Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/maps-route"
title: MapsRouteClient
description: Azure Maps Route Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Route/preview/1.0/route.json
add-credentials: false
override-client-name: GeneratedClient
package-version: 1.0.0-beta.1
disable-async-iterators: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
```

## Customization for Track 2 Generator

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
  - from: swagger-document
    where: $.definitions.Route
    transform: >
      $["required"] = [
        "legs",
        "sections",
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
    where: $.definitions.RouteGuidance
    transform: >
      $["required"] = [
        "instructions",
        "instructionGroups"
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

### Model Rename

```yaml
directive:
  - from: swagger-document
    where: $.definitions.RouteMatrixResultResponse.properties.routeSummary
    transform: >
      $["x-ms-client-name"] = "routeLegSummary";
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
```
