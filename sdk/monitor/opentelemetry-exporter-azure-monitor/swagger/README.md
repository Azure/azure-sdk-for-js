# Azure Monitor Generated OpenTelemetry Exporter Client

> see https://aka.ms/autorest

## Instructions

From `swagger/`:

```zsh
rm -rf ../src/generated
autorest --typescript --v3
```

## Configuration

```yaml
package-name: "@azure/opentelemetry-exporter-azure-monitor"
title: ApplicationInsightsClient
description: Application Insights Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/e47988f3ccaa90681f11cce59c25c638ff305692/specification/applicationinsights/data-plane/Monitor.Exporters/preview/2020-09-15_Preview/swagger.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200826.1"
```
