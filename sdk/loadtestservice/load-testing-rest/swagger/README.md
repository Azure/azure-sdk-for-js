# Azure Load Testing TypeScript Protocol Layer

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
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/loadtestservice/data-plane/Microsoft.LoadTestService/preview/2022-06-01-preview/loadtestservice.json
package-version: 1.0.0-beta.1
rest-level-client: true
security: AADToken
security-scopes: "https://cnt-prod.loadtesting.azure.com/.default"
use-extension:
  "@autorest/typescript": "6.0.0-rc.1"
directive:
  - from: swagger-document
    where: $["paths"]["/serverMetricsConfig/supportedResourceTypes"].get
    transform: $["operationId"] = "ServerMetrics_ListSupportedResourceTypes"
  - from: swagger-document
    where: $["paths"]["/testruns/sortAndFilter"].get
    transform: $["operationId"] = "TestRun_ListTestRuns"
  - from: swagger-document
    where: $["paths"]["/serverMetricsConfig"].get
    transform: $["operationId"] = "ServerMetrics_ListGetServerMetrics"
  - from: swagger-document
    where: $["paths"]["/appcomponents/{name}"].delete
    transform: $["operationId"] = "AppComponent_DeleteAppComponents"
  - from: swagger-document
    where: $["paths"]["/loadtests/{testId}/files"].get
    transform: $["operationId"] = "Test_ListTestFiles"
  - from: swagger-document
    where: $["paths"]["/testruns/sortAndFilter"].get
    transform: $["operationId"] = "TestRun_ListTestRuns"
  - from: swagger-document
    where: $["paths"]["/testruns/{testRunId}"].patch
    transform: $["operationId"] = "TestRun_CreateOrUpdateTestRun"
  - from: swagger-document
    where: $["paths"]["/serverMetricsConfig/{name}"].get
    transform: $["operationId"] = "ServerMetrics_GetServerMetricsConfigByName"
  - from: swagger-document
    where: $["paths"]["/serverMetricsConfig/{name}"].delete
    transform: $["operationId"] = "ServerMetrics_DeleteServerMetricsConfig"
  - from: swagger-document
    where: $["paths"]["/serverMetricsConfig"].get
    transform: $["operationId"] = "ServerMetrics_GetServerMetricsConfig"
  - from: swagger-document
    where: $["paths"]["/serverMetricsConfig/default"].get
    transform: $["operationId"] = "ServerMetrics_GetServerDefaultMetricsConfig"
```
