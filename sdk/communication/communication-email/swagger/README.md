# Azure Communication Services Email REST API Client

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: "@azure/communication-email"
title: EmailRestApiClient
description: Email REST API Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2021-10-01-preview
package-version: 1.0.0-beta.2
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/communication/data-plane/Email/readme.md
model-date-time-as-string: false
optional-response-headers: true
typescript: true
azure-arm: false
add-credentials: false
v3: true
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
```

## Customizations for Email Client Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Change the bCC property to bcc

```yaml
directive:
  - from: swagger-document
    where: $.definitions.EmailRecipients.properties.bCC
    transform: >
      $["x-ms-client-name"] = "bcc"
```
