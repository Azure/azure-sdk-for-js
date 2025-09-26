# Azure Maps Geolocation Protocol Layer

> see https://aka.ms/autorest

## Configuration

The configuration is following the [RLC quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md).
For the configuration property, please refer to [Index of AutoRestFlag](https://github.com/Azure/autorest/blob/main/docs/generate/flags.md).

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/maps-geolocation"
title: MapsGeolocationClient
description: Azure Maps Geolocation Client
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
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Geolocation/preview/1.0/geolocation.json
package-version: 1.0.0-beta.7
rest-level-client: true
# Although maps service supports key-credentials and Microsoft Entra ID, maps service requires header "ms-x-client-id", which is different from the standard Microsoft Entra ID, so we don't generate Microsoft Entra ID code and implement ourselves.
# For auth configuration, please refer to: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-configure-authentication
security: AzureKey
security-header-name: subscription-key
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

## Customization for Track 2 Generator

To understand more about how Directives works, please refer to: https://github.com/Azure/autorest/blob/main/docs/generate/directives.md

### Change the schema of SharedKey

Replace `query` with `header` in the field `in` since [modelerfour](https://github.com/Azure/autorest/tree/main/packages/extensions/modelerfour) considers this is invalid.

```yaml
directive:
  - from: swagger-document
    where: $.securityDefinitions
    transform: |
      $["SharedKey"]["in"] = "header";
```
