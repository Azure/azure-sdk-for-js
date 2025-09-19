# Azure Maps Render Protocol Layer

> see https://aka.ms/autorest

## Configuration

The configuration is following the [RLC quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md).
For the configuration property, please refer to [Index of AutoRestFlag](https://github.com/Azure/autorest/blob/main/docs/generate/flags.md).

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/maps-render"
title: MapsRenderClient
description: Azure Maps Render Client
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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Render/stable/2024-04-01/render.json
package-version: 2.0.0-beta.4
rest-level-client: true
# Although maps-render supports key-credentials and Microsoft Entra ID, maps-route requires header "ms-x-client-id", which is different from the standard Microsoft Entra ID, so we don't generate Microsoft Entra ID code and implement ourselves.
# For auth configuration, please refer to: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-configure-authentication
security: AzureKey
security-header-name: subscription-key
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

## Customization for Track 2 Generator

To understand more about how Directives works, please refer to: https://github.com/Azure/autorest/blob/main/docs/generate/directives.md

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

### Change the MultiCollection Type to Array | String

`@azure-rest/core-client` doesn't support `collectionFormat: multi`. We transform the entities of this format to accept string so we can composed the query string in the `multi` format by ourselves.

```yaml
directive:
  - from: swagger-document
    where: $.paths["/map/static"].get.parameters[11]
    transform: >
      $.type = "string";
  - from: swagger-document
    where: $.paths["/map/static"].get.parameters[12]
    transform: >
      $.type = "string";
```
