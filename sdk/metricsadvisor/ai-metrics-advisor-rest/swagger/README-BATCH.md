# Azure Metrics Advisor Protocol Layer

> see https://aka.ms/autorest

## Run autorest to generate the SDK 

Now you can run this command in swagger folder you just created.

```shell
autorest --typescript ./swagger/README-BATCH.md --multi-client
```

> see https://aka.ms/autorest
## Configuration

```yaml $(metrics-advisor) == true
title: MetricsAdvisorClient
description: Metrics Advisor Client
output-folder: ../src/generated/batch
source-code-folder-path: ./client
```

```yaml $(metrics-advisor-admin) == true
title: MetricsAdvisorAdministrationClient
description: Metrics Advisor Admin Client
output-folder: ../src/generated/batch
source-code-folder-path: ./admin
```

```yaml $(multi-client)
package-name: "@azure-rest/ai-metrics-advisor-rest"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
package-version: 1.0.0-beta.2
input-file: ./metricsadvisor.json
rest-level-client: true
openapi-type: data-plane
credential-scopes: https://cognitiveservices.azure.com/.default
add-credentials: true
generate-test: false
rlc-shortcut: true
use-extension:
  "@autorest/typescript": "file:../../../../autorest.typescript/"
batch:
  - metrics-advisor: true
  - metrics-advisor-admin: true
```

```yaml $(metrics-advisor) == true
directive:
  - from: swagger-document
    where: $.paths.*[?(@.operationId != undefined)]
    transform: >
      if ($.operationId == "getDataFeedById" ||
      $.operationId == "listDataFeeds" ||
      $.operationId == "createDataFeed" ||
      $.operationId == "updateDataFeed" ||
      $.operationId == "deleteDataFeed" ||
      $.operationId == "getIngestionProgress" ||
      $.operationId == "resetDataFeedIngestionStatus" ||
      $.operationId == "getDataFeedIngestionStatus" ||

      $.operationId == "createAnomalyDetectionConfiguration" ||
      $.operationId == "getAnomalyDetectionConfiguration" ||
      $.operationId == "updateAnomalyDetectionConfiguration" ||
      $.operationId == "getAnomalyDetectionConfigurationsByMetric" ||
      $.operationId == "deleteAnomalyDetectionConfiguration" ||

      $.operationId == "createAnomalyAlertingConfiguration" ||
      $.operationId == "updateAnomalyAlertingConfiguration" ||
      $.operationId == "getAnomalyAlertingConfiguration" ||
      $.operationId == "getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration" ||
      $.operationId == "deleteAnomalyAlertingConfiguration" ||

      $.operationId == "createHook" ||
      $.operationId == "updateHook" ||
      $.operationId == "getHook" ||
      $.operationId == "deleteHook" ||
      $.operationId == "listHooks" ||

      $.operationId == "createCredential" ||
      $.operationId == "updateCredential" ||
      $.operationId == "getCredential" ||
      $.operationId == "listCredentials" ||
      $.operationId == "deleteCredential") {
          $ = undefined;
      }
```

```yaml $(metrics-advisor-admin) == true
directive:
  - from: swagger-document
    where: $.paths.*[?(@.operationId != undefined)]
    transform: >
      if ($.operationId != "getDataFeedById" &&
      $.operationId != "listDataFeeds" &&
      $.operationId != "createDataFeed" &&
      $.operationId != "updateDataFeed" &&
      $.operationId != "deleteDataFeed" &&
      $.operationId != "getIngestionProgress" &&
      $.operationId != "resetDataFeedIngestionStatus" &&
      $.operationId != "getDataFeedIngestionStatus" &&

      $.operationId != "createAnomalyDetectionConfiguration" &&
      $.operationId != "getAnomalyDetectionConfiguration" &&
      $.operationId != "updateAnomalyDetectionConfiguration" &&
      $.operationId != "getAnomalyDetectionConfigurationsByMetric" &&
      $.operationId != "deleteAnomalyDetectionConfiguration" &&

      $.operationId != "createAnomalyAlertingConfiguration" &&
      $.operationId != "updateAnomalyAlertingConfiguration" &&
      $.operationId != "getAnomalyAlertingConfiguration" &&
      $.operationId != "getAnomalyAlertingConfigurationsByAnomalyDetectionConfiguration" &&
      $.operationId != "deleteAnomalyAlertingConfiguration" &&

      $.operationId != "createHook" &&
      $.operationId != "updateHook" &&
      $.operationId != "getHook" &&
      $.operationId != "deleteHook" &&
      $.operationId != "listHooks" &&

      $.operationId != "createCredential" &&
      $.operationId != "updateCredential" &&
      $.operationId != "getCredential" &&
      $.operationId != "listCredentials" &&
      $.operationId != "deleteCredential") {
          $ = undefined;
      }
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
