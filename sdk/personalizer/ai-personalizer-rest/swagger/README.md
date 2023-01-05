# Azure Personalizer Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/ai-personalizer"
title: PersonalizerClient
description: Personalizer Client
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/0f3093e589c010a5f238c0bd89ef2118696ba8a8/specification/cognitiveservices/data-plane/Personalizer/preview/v1.1-preview.3/Personalizer.json
override-client-name: PersonalizerClient
security:
  - AADToken
  - AzureKey
security-header-name: Ocp-Apim-Subscription-Key
security-scopes: https://cognitiveservices.azure.com/.default
add-credentials: true
typescript: true
package-version: "1.0.0-beta.2"
generate-metadata: true
generate-test: true
rest-level-client: true
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.
