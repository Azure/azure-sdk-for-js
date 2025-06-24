# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-identity"
override-client-name: IdentityRestClient
description: Communication identity client
package-version: 1.4.0-beta.1
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2025-03-02-preview
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/52a8a4477ea168f175bf73ba64a58543fb0f038b/specification/communication/data-plane/Identity/readme.md
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
