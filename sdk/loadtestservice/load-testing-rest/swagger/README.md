# Azure Load Testing Typescript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure-rest/load-testing"
title: Azure Load Testing
description: Azure Load Testing Client
generate-metadata: true
generate-test: true
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/loadtestservice/data-plane/Microsoft.LoadTestService/stable/2022-11-01/loadtestservice.json
package-version: 1.0.0-beta.3
rest-level-client: true
security: AADToken
security-scopes: "https://cnt-prod.loadtesting.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.0-rc.3"
service-versions:
- '2022-11-01'
```
