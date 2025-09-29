# Azure Purview Scanning TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
generate-test: true
package-name: "@azure-rest/purview-scanning"
title: PurviewScanningRestClient
description: Purview Scanning Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/purview/data-plane/Azure.Analytics.Purview.Scanning/stable/2023-09-01/scanningService.json
package-version: 1.0.0-beta.5
rest-level-client: true
add-credentials: true
credential-scopes: "https://purview.azure.net/.default"
use-extension:
  "@autorest/typescript": "6.0.34"
modelerfour:
  lenient-model-deduplication: true
module-kind: esm
```
