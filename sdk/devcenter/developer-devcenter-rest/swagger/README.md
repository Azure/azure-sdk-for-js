## C

```yaml
package-name: "@azure-rest/developer-devcenter"
title: "Azure DevCenter"
description: "Azure DevCenter Client"
generate-metadata: false
openapi-type: data-plane
tag: v2022-11-11-preview
generate-test: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
package-version: 1.0.0-beta.3
rest-level-client: true
security: AADToken
security-scopes: https://devcenter.azure.com/.default
use-extension:
  "@autorest/typescript": "6.0.0-rc.2"

input-file:
  - https://github.com/Azure/azure-rest-api-specs/blob/dcf548aea9f776d166e8c53f8ecb8eff9beef2a5/specification/devcenter/data-plane/Microsoft.DevCenter/preview/2023-01-01-preview/devcenter.json
  - https://github.com/Azure/azure-rest-api-specs/blob/dcf548aea9f776d166e8c53f8ecb8eff9beef2a5/specification/devcenter/data-plane/Microsoft.DevCenter/preview/2023-01-01-preview/devbox.json
  - https://github.com/Azure/azure-rest-api-specs/blob/dcf548aea9f776d166e8c53f8ecb8eff9beef2a5/specification/devcenter/data-plane/Microsoft.DevCenter/preview/2023-01-01-preview/environments.json

public-clients: true
```
