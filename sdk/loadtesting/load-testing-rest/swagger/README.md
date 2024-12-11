# Azure Load Testing Typescript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/load-testing"
title: Azure Load Testing
description: Azure Load Testing Client
generate-metadata: false
generate-test: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://github.com/Azure/azure-rest-api-specs/blob/3e27c70e7c02c07b458bc0e94716c3d82d3fdd19/specification/loadtestservice/data-plane/Microsoft.LoadTestService/stable/2022-11-01/loadtestservice.json
package-version: 1.0.1
rest-level-client: true
security: AADToken
security-scopes: "https://cnt-prod.loadtesting.azure.com/.default"
use-extension:
  "@autorest/typescript": "latest"
service-versions:
- '2022-11-01'
```
