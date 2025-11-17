# Azure Communication Services SMS Protocol Layer

> see [https://aka.ms/autorest](https://aka.ms/autorest)

## Configuration

```yaml
package-name: "@azure/communication-sms"
title: SmsApiClient
description: SMS Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-sms-2026-01-23
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/ee1579c284a9d032eaa70b1a183b661813decd41/specification/communication/data-plane/Sms/readme.md
model-date-time-as-string: false
optional-response-headers: true
use-extension:
  "@autorest/typescript": "6.0.34"
azure-arm: false
add-credentials: false
package-version: 1.2.0
v3: true
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"
typescript:
  generate-metadata: false
  azure-arm: false
module-kind: esm
directive:
  # Remove error response mappers to maintain backward compatibility
  # This ensures HTTP errors bubble up as generic RestError instead of structured error objects
  - from: swagger-document
    where: $.paths..responses
    transform: >
      for (const [statusCode, response] of Object.entries($)) {
        if (statusCode >= "400") {
          delete $[statusCode];
        }
      }
```
