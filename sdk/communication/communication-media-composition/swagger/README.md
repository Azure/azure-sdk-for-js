# Azure Communication Services Media Composition Module

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: azure-communication-media-composition
title: Media Composition Client
description: Media composition client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-preview-2021-11
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/e00ba9e22c4d70d005625f6798807a3ecc5b59a9/specification/communication/data-plane/MediaComposition/preview/2021-12-31-preview/CommunicationMediaComposition.json
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
disable-async-iterators: true
package-version: 1.0.0-beta.1
v3: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.14"
use-core-v2: true
```

## Customizations

### Disable extensible enums

```yaml
directive:
  - from: swagger-document
    where: $.definitions[*].properties[*]["x-ms-enum"]
    transform: >
      if ($.modelAsString) {
        $.modelAsString = false
      }
```
