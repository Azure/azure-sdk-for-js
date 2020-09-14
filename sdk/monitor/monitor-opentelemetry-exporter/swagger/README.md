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
package-name: "@azure/monitor-opentelemetry-exporter"
title: ApplicationInsightsClient
description: Application Insights Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://github.com/srnagar/swagger/blob/master/application-insights.json
add-credentials: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200826.1"
```
