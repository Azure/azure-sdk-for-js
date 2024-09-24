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
tag: package-2023-03-31
package-version: 1.0.0
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ac29c822ecd5f6054cd17c46839e7c04a1114c6d/specification/communication/data-plane/Email/readme.md
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

See the [AutoRest samples](https://github.com/Azure/autorest/tree/main/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Remove "To" from the required properties

```yaml
directive:
  - from: swagger-document
    where: $.definitions.EmailRecipients
    transform: >
      $["required"] = []
```

### Rename the "userEngagementTrackingDisabled" property to "disableUserEngagementTracking"

```yaml
directive:
  - from: swagger-document
    where: $.definitions.EmailMessage.properties
    transform: >
      $["userEngagementTrackingDisabled"]["x-ms-client-name"] = "disableUserEngagementTracking"
```
