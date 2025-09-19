# Azure Maps Timezone Protocol Layer

> see https://aka.ms/autorest

## Configuration

The configuration is following the [RLC quick start guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md).
For the configuration property, please refer to [Index of AutoRestFlag](https://github.com/Azure/autorest/blob/main/docs/generate/flags.md).

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/maps-timezone"
title: MapsTimeZoneClient
description: Azure Maps Timezone Client
# This flag generated files including all the config files, LICENSE, sample.env, and package.json.
# We switch this to false after the first generation because we have some manual changes in these files and don't want them get overwrite.
# Reference: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-generate-rlc
generate-metadata: false
# This flag generated test files such as sampleTest.spec.ts and recordedClient.ts.
# Switch to false after the first generation due to the same reason above.
generate-test: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/maps/data-plane/Timezone/preview/1.0/timezone.json
package-version: 1.0.0-beta.3
rest-level-client: true
# Although maps-timezone supports key-credentials and Microsoft Entra ID, maps-timezone requires header "ms-x-client-id", which is different from the standard Microsoft Entra ID, so we don't generate Microsoft Entra ID code and implement ourselves.
# For auth configuration, please refer to: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/RLC-quickstart.md#how-to-configure-authentication
security: AzureKey
security-header-name: subscription-key
use-extension:
  "@autorest/typescript": "6.0.34"
module-kind: esm
```

## Customization for Track 2 Generator

To understand more about how Directives works, please refer to: https://github.com/Azure/autorest/blob/main/docs/generate/directives.md

Replace `query` with `header` in the field `in` since [modelerfour](https://github.com/Azure/autorest/tree/main/packages/extensions/modelerfour) considers this is invalid.

```yaml
directive:
- from: swagger-document
  where: $.securityDefinitions
  transform: |
    $["SharedKey"]["in"] = "header";
  
# Rename all definitions
- from: swagger-document
  where: $.definitions.TimezoneResult
  transform: |
    $["x-ms-client-name"] = "TimeZoneResult"

- from: swagger-document
  where: $.definitions.TimezoneEnumWindowsResult
  transform: |
    $["x-ms-client-name"] = "TimeZoneEnumWindowsResult"

- from: swagger-document
  where: $.definitions.TimezoneWindows
  transform: |
    $["x-ms-client-name"] = "WindowsTimeZone"

- from: swagger-document
  where: $.definitions.TimezoneEnumIanaResult
  transform: |
    $["x-ms-client-name"] = "TimeZoneEnumIanaResult"

- from: swagger-document
  where: $.definitions.TimezoneIanaVersionResult
  transform: |
    $["x-ms-client-name"] = "TimeZoneIanaVersionResult"

- from: swagger-document
  where: $.definitions.TimezoneWindowsToIanaResult
  transform: |
    $["x-ms-client-name"] = "WindowsTimeZoneToIanaResult"

- from: swagger-document
  where: $.definitions.TimezoneIds
  transform: |
    $["x-ms-client-name"] = "TimeZoneIds"

- from: swagger-document
  where: $.definitions.TimezoneId
  transform: |
    $["x-ms-client-name"] = "TimeZoneId"

- from: swagger-document
  where: $.definitions.TimezoneNames
  transform: |
    $["x-ms-client-name"] = "TimeZoneNames"

# Rename all operation IDs
- from: swagger-document
  where: $.paths["/timezone/byId/{format}"].get
  transform: |
    $.operationId = "TimeZone_GetTimeZoneByID";

- from: swagger-document
  where: $.paths["/timezone/byCoordinates/{format}"].get
  transform: |
    $.operationId = "TimeZone_GetTimeZoneByCoordinates";

- from: swagger-document
  where: $.paths["/timezone/enumWindows/{format}"].get
  transform: |
    $.operationId = "TimeZone_GetTimeZoneEnumWindows";

- from: swagger-document
  where: $.paths["/timezone/enumIana/{format}"].get
  transform: |
    $.operationId = "TimeZone_GetTimeZoneEnumIANA";

- from: swagger-document
  where: $.paths["/timezone/ianaVersion/{format}"].get
  transform: |
    $.operationId = "TimeZone_GetIANAVersion";

- from: swagger-document
  where: $.paths["/timezone/windowsToIana/{format}"].get
  transform: |
    $.operationId = "TimeZone_ConvertWindowsTimeZoneToIANA";

```
