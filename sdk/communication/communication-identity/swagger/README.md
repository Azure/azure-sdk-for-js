# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-identity"
override-client-name: IdentityRestClient
description: Communication identity client
package-version: 1.3.2
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2025-04-01-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/c7c2694ee53f22dfe56ee0d0fb9875ae5778d0f9/specification/communication/data-plane/Identity/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
v3: true
use-extension:
  "@autorest/typescript": "6.0.34"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"
typescript:
  generate-metadata: false
  azure-arm: false
module-kind: esm
```
