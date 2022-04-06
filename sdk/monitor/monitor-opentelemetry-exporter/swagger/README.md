# Azure Monitor Generated OpenTelemetry Exporter Client

> see <https://aka.ms/autorest>

## Instructions

From `swagger/`:

```zsh
rm -rf ../src/generated
autorest swagger/README.md
```

## Configuration

```yaml
package-name: "@azure/monitor-opentelemetry-exporter"
title: ApplicationInsightsClient
description: Application Insights Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/applicationinsights/data-plane/Monitor.Exporters/preview/v2.1/swagger.json
add-credentials: false
use-extension:
  "@autorest/typescript": "latest"
package-version: 1.0.0-beta.8
typescript: true
v3: true
```
