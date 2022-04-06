# Azure Metrics Advisor Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/ai-metrics-advisor"
title: AnomalyDectectorClient
description: AnomalyDectector Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
# openapi v2 in PR
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/08f5e391f2153a99580b458cc71ef88e45dd0531/specification/cognitiveservices/data-plane/MetricsAdvisor/preview/v1.0/MetricsAdvisor.json
add-credentials: false
override-client-name: GeneratedClient
use-extension:
  "@autorest/typescript": "6.0.0-beta.16"
disable-async-iterators: true
hide-clients: true
package-version: 1.0.1
typescript: true
core-http-compat-mode: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Metric output type - remvoing `metric` prefix from property names and add description

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Metric
    transform: >
      $.properties.metricId["x-ms-client-name"] = "id";
      $.properties.metricName["x-ms-client-name"] = "name";
      $.properties.metricDisplayName["x-ms-client-name"] = "displayName";
      $.properties.metricDescription["x-ms-client-name"] = "description";
      $.description = "Represents a metric of an ingested data feed"
```

### Dimension output type - remvoing `dimension` prefix from property names and add description

```yaml
directive:
  - from: swagger-document
    where: $.definitions.Dimension
    transform: >
      $.properties.dimensionName["x-ms-client-name"] = "name";
      $.properties.dimensionDisplayName["x-ms-client-name"] = "displayName";
      $.description = "Represents a dimension of an ingested data feed"
```

### Hook output type - remvoing `hook` prefix from property names

```yaml
directive:
  - from: swagger-document
    where: $.definitions.HookInfo
    transform: >
      $.properties.hookId["x-ms-client-name"] = "id";
      $.properties.hookName["x-ms-client-name"] = "name";
```

### Add x-ms-paths section if not exists

```yaml
directive:
  - from: swagger-document
    where: $
    transform: >
      if (!$["x-ms-paths"]) {
        $["x-ms-paths"] = {}
      }
```

### Enable Post based pagination for AlertsByAnomalyAlertingConfiguration.

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/alert/anomaly/configurations/{configurationId}/alerts/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getAlertsByAnomalyAlertingConfigurationNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getAlertsByAnomalyAlertingConfigurationNext"] = {
        "post": {
          "tags": [
            "AnomalyAlerting"
          ],
          "summary": "Query alerts under anomaly alerting configuration",
          "operationId": "getAlertsByAnomalyAlertingConfigurationNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "query alerting result request",
              "required": true,
              "schema": {
                "$ref": "#/definitions/AlertingResultQuery"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/AlertResultList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination for AnomaliesByAnomalyDetectionConfiguration

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/enrichment/anomalyDetection/configurations/{configurationId}/anomalies/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getAnomaliesByAnomalyDetectionConfigurationNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getAnomaliesByAnomalyDetectionConfigurationNext"] = {
        "post": {
          "tags": [
            "AnomalyDetection"
          ],
          "summary": "Query anomalies under anomaly detection configuration",
          "operationId": "getAnomaliesByAnomalyDetectionConfigurationNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "query detection anomaly result request",
              "required": true,
              "schema": {
                "$ref": "#/definitions/DetectionAnomalyResultQuery"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/AnomalyResultList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination DimensionOfAnomaliesByAnomalyDetectionConfiguration

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/enrichment/anomalyDetection/configurations/{configurationId}/anomalies/dimension/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getDimensionOfAnomaliesByAnomalyDetectionConfigurationNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getDimensionOfAnomaliesByAnomalyDetectionConfigurationNext"] = {
        "post": {
          "tags": [
            "AnomalyDetection"
          ],
          "summary": "Query dimension values of anomalies",
          "operationId": "getDimensionOfAnomaliesByAnomalyDetectionConfigurationNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "query dimension values request",
              "required": true,
              "schema": {
                "$ref": "#/definitions/AnomalyDimensionQuery"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/AnomalyDimensionList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination for MetricFeedbacks

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/feedback/metric/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "listMetricFeedbacksNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?listMetricFeedbacksNext"] = {
        "post": {
          "tags": [
            "Feedback"
          ],
          "summary": "List feedback on the given metric",
          "operationId": "listMetricFeedbacksNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "metric feedback filter",
              "required": true,
              "schema": {
                "$ref": "#/definitions/MetricFeedbackFilter"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/MetricFeedbackList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination for DataFeedIngestionStatus

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/dataFeeds/{dataFeedId}/ingestionStatus/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getDataFeedIngestionStatusNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getDataFeedIngestionStatusNext"] = {
        "post": {
          "tags": [
            "IngestionStatus"
          ],
          "summary": "Get data ingestion status by data feed",
          "operationId": "getDataFeedIngestionStatusNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "The query time range",
              "required": true,
              "schema": {
                "$ref": "#/definitions/IngestionStatusQueryOptions"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/IngestionStatusList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination for MetricSeries

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/metrics/{metricId}/series/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getMetricSeriesNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getMetricSeriesNext"] = {
        "post": {
          "tags": [
            "Metric"
          ],
          "summary": "List series (dimension combinations) from metric",
          "operationId": "getMetricSeriesNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "filter to query series",
              "required": true,
              "schema": {
                "$ref": "#/definitions/MetricSeriesQueryOptions"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/MetricSeriesList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination for MetricDimension

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/metrics/{metricId}/dimension/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getMetricDimensionNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getMetricDimensionNext"] = {
        "post": {
          "tags": [
            "Metric"
          ],
          "summary": "List dimension from certain metric",
          "operationId": "getMetricDimensionNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "query dimension option",
              "required": true,
              "schema": {
                "$ref": "#/definitions/MetricDimensionQueryOptions"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/MetricDimensionList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
```

### Enable Post based pagination for EnrichmentStatusByMetric

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/metrics/{metricId}/status/enrichment/anomalyDetection/query"]
    transform: >
      let pageExt = $.post["x-ms-pageable"];
      if (!pageExt) {
        pageExt["operationName"] = "getEnrichmentStatusByMetricNext"
        $.post["x-ms-pageable"] = pageExt
      }
```

```yaml
directive:
  - from: swagger-document
    where: $["x-ms-paths"]
    transform: >
      $["/{nextLink}?getEnrichmentStatusByMetricNext"] = {
        "post": {
          "tags": [
            "Metric"
          ],
          "summary": "Query anomaly detection status",
          "operationId": "getEnrichmentStatusByMetricNext",
          "consumes": [
            "application/json"
          ],
          "produces": [
            "application/json"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "nextLink",
              "description": "the next link",
              "required": true,
              "type": "string",
              "x-ms-skip-url-encoding": true
            },
            {
              "in": "body",
              "name": "body",
              "description": "query options",
              "required": true,
              "schema": {
                "$ref": "#/definitions/EnrichmentStatusQueryOption"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Success",
              "schema": {
                "$ref": "#/definitions/EnrichmentStatusList"
              }
            },
            "default": {
              "description": "Client error or server error (4xx or 5xx)",
              "schema": {
                "$ref": "#/definitions/ErrorCode"
              }
            }
          },
          "x-ms-pageable": {
            "nextLinkName": null
          }
        }
      }
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
