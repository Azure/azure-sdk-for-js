## C

```yaml
package-name: "@azure-rest/developer-devcenter"
title: "Azure DevCenter"
description: "Azure DevCenter Client"
generate-metadata: false
openapi-type: data-plane
tag: v2022-03-01-preview
generate-test: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
package-version: 1.0.0
rest-level-client: true
security: AADToken
security-scopes: https://devcenter.azure.com/.default
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"

input-file:
  - https://github.com/Azure/azure-rest-api-specs/blob/5a024c0e76424caaca36166ba41cee6f3f1f8add/specification/devcenter/data-plane/Microsoft.DevCenter/preview/2022-03-01-preview/devcenter.json
  - https://github.com/Azure/azure-rest-api-specs/blob/5a024c0e76424caaca36166ba41cee6f3f1f8add/specification/devcenter/data-plane/Microsoft.DevCenter/preview/2022-03-01-preview/devbox.json
  - https://github.com/Azure/azure-rest-api-specs/blob/5a024c0e76424caaca36166ba41cee6f3f1f8add/specification/devcenter/data-plane/Microsoft.DevCenter/preview/2022-03-01-preview/environments.json

public-clients: true
```

