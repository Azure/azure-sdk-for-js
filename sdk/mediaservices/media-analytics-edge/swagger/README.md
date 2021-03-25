# Azure Example TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/media-analytics-edge"
title: GeneratedClient
description: Example Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file:
- C:\Azure-Media-LiveVideoAnalytics\src\Edge\Client\AzureVideoAnalyzer.Edge\preview\1.0\AzureVideoAnalyzer.json
- C:\Azure-Media-LiveVideoAnalytics\src\Edge\Client\AzureVideoAnalyzer.Edge\preview\1.0\AzureVideoAnalyzerSdkDefinitions.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210223.1"
modelerfour:
  naming:
    override:
      "@type": $DO_NOT_NORMALIZE$@type
```

<!-- modelerfour:
  naming:
    override:
      type: \@type  -->
