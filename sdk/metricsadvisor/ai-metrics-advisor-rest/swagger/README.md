# Azure Metrics Advisor Protocol Layer

> see https://aka.ms/autorest

## Run autorest to generate the SDK 

Now you can run this command in swagger folder you just created.

```shell
autorest --typescript ./swagger/README.md
```

> see https://aka.ms/autorest
## Configuration

```yaml
package-name: "@azure-rest/ai-metrics-advisor"
title: MetricsAdvisorRestClient
description: Metrics Advisor Rest Client
open-api: data-plane
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
rlc-shortcut: true
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/c8a9d7277a795543e2960ed58963769f95945096/specification/cognitiveservices/data-plane/MetricsAdvisor/stable/v1.0/MetricsAdvisor.json
package-version: 1.0.0-beta.2
rest-level-client: true
override-client-name: GeneratedClient
add-credentials: false
use-extension:
  "@autorest/typescript": "latest"
```

### Metric output type - add description

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Metric
    transform: >
      $.description = "Represents a metric of an ingested data feed"
```

### Dimension output type - add description

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Dimension
    transform: >
      $.description = "Represents a dimension of an ingested data feed"
```
### Make Sealed enums

```yaml
directive:
  - from: swagger-document
    where: $.definitions..properties
    transform: >
      if($) {
          let props = Object.keys($);
          for(let i = 0; i < props.length; i++) {
              
              if ($[props[i]] &&  $[props[i]]["x-ms-enum"]) {
                  $[props[i]]["x-ms-enum"].modelAsString = false;
              } else if ($[props[i]] && $[props[i]]["enum"]) {
                $[props[i]]["x-ms-enum"] = {modelAsString: false, name: props[i] }
              }
          }
      }
```

```yaml
directive:
  - from: swagger-document
    where: $.paths..get.parameters
    transform: >
      if($) {
          for(let i = 0; i < $.length; i++) {
              if ($[i] &&  $[i]["x-ms-enum"]) {
                  $[i]["x-ms-enum"].modelAsString = false;
              } else if ($[i] && $[i]["enum"]) {
                $[i]["x-ms-enum"] = {modelAsString: false, name: props[i] }
              }
          }
      }
```

### Add description for `SmartDetectionCondition`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.SmartDetectionCondition
    transform: >
      $.description = "Represents Smart Condition"
  - from: swagger-document
    where: $.definitions.SuppressCondition
    transform: >
      $.description = "Represents Suppress Condition"
  - from: swagger-document
    where: $.definitions.AlertSnoozeCondition
    transform: >
      $.description = "Represents Conditions to snooze Alerts"
  - from: swagger-document
    where: $.definitions.SeverityFilterCondition
    transform: >
      $.description = "Represents Conditions to filter severity"
  - from: swagger-document
    where: $.definitions.DataFeedIngestionProgress
    transform: >
      $.description = "Track the progress for Datafeed Ingestion"
  - from: swagger-document
    where: $.definitions.EmailHookParameter
    transform: >
      $.description = "Parameters for Email Hook"
  - from: swagger-document
    where: $.definitions.EmailHookParameter
    transform: >
      $.description = "Parameters for Email Hook"
  - from: swagger-document
    where: $.definitions.WebHookParameter
    transform: >
      $.description = "Parameters for Web Hook"
  - from: swagger-document
    where: $.definitions.IngestionStatus
    transform: >
      $.description = "Ingestion Status"
  - from: swagger-document
    where: $.definitions.SeverityCondition
    transform: >
      $.description = "Alert Severity Condition"
  - from: swagger-document
    where: $.definitions.TopNGroupScope
    transform: >
      $.description = "Group Scope for Top N values"
```
