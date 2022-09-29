# Azure Communication Services Configuration Module

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/communication-identity"
override-client-name: IdentityRestClient
description: Communication identity client
package-version: 1.1.1
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
tag: package-2022-06
require: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/f0343961168af6b19ea86dd3aa2429e2ca453db4/specification/communication/data-plane/Identity/readme.md
model-date-time-as-string: false
optional-response-headers: true
payload-flattening-threshold: 10
add-credentials: false
v3: true

use-extension:
  "@autorest/typescript": "latest"
tracing-info:
  namespace: "Microsoft.Communication"
  packagePrefix: "Azure.Communication"

typescript:
  generate-metadata: false
  azure-arm: false
```
