# Azure Maps Render Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/maps-render"
title: MapsRenderClient
description: Azure Maps Render Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Render/preview/2.1/render.json
add-credentials: false
override-client-name: GeneratedClient
package-version: 1.0.0-beta.1
disable-async-iterators: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
  "@autorest/modelerfour": "4.21.4"
  # "@autorest/typescript": "6.0.0-rc.1"
  # "@autorest/modelerfour": "4.23.7"
```

### Define Required Fields

```yaml
directive:
  - from: swagger-document
    where: $.definitions.MapTileset
    transform: >
      $["required"] = [
        "tilejson",
        "tiles",
      ]
  - from: swagger-document
    where: $.definitions.MapAttribution
    transform: >
      $["required"] = [
        "copyrights",
      ]
  - from: swagger-document
    where: $.definitions.RegionCopyrights
    transform: >
      $["required"] = [
        "copyrights",
        "country",
      ]
  - from: swagger-document
    where: $.definitions.RegionCopyrights.properties.country
    transform: >
      $["required"] = [
        "ISO3",
        "label",
      ]
  - from: swagger-document
    where: $.definitions.CopyrightCaption
    transform: >
      $["required"] = [
        "copyrightsCaption",
      ]
```

### Model Rename

```yaml
directive:
  - from: swagger-document
    where: $.parameters.TilesetId_rv2["x-ms-enum"]
    transform: >
      $["name"] = "TilesetId";
  - from: swagger-document
    where: $.definitions.MapTileset
    transform: >
      $["x-ms-client-name"] = "TileJson";
```
