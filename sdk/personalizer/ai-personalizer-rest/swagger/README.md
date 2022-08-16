# Azure Personalizer Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/ai-personalizer"
title: PersonalizerClient
description: Personalizer Client
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/cognitiveservices/data-plane/Personalizer/preview/v1.1-preview.3/Personalizer.json
override-client-name: GeneratedClient
add-credentials: false
typescript: true
package-version: "1.0.0-beta.1"
generate-metadata: true
generate-test: true
rest-level-client: true
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.
