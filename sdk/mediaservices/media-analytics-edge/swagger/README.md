# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/api-learn"
title: GeneratedClient
description: Example Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/a57e89f8c3e1215201694cc0d6e9a51842573df0/specification/mediaservices/data-plane/LiveVideoAnalytics.Edge/preview/2.0.0/LiveVideoAnalyticsSdkDefinitions.json
add-credentials: false
use-extension:
  "@autorest/typescript": "https://bit.ly/3qzsfXs"
modelerfour:
  naming:
    override:
      '@type': $DO_NOT_NORMALIZE$@type
```

<!-- modelerfour:
  naming:
    override:
      type: \@type  -->
