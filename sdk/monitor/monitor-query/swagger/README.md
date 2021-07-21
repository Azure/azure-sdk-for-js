## Configuration file for autorest for JavaScript

<!-- 
(TODO)
https://github.com/Azure/azure-rest-api-specs/blob/master/specification/monitor/resource-manager/Microsoft.Insights/preview/2017-12-01-preview/metricNamespaces_API.json
-->

## Log Query

```yaml $(tag) == 'logquery'
input-file: "https://github.com/Azure/azure-rest-api-specs/blob/86408a8777e623f5f41e260472ed831309b85086/specification/operationalinsights/data-plane/Microsoft.OperationalInsights/preview/2021-05-19_Preview/OperationalInsights.json"
output-folder: ../src/generated/logquery
package-name: "monitor-log-query"
clear-output-folder: true
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210111.1"
disable-async-iterators: true
api-version-parameter: choice
hide-clients: true
```

```yaml $(tag) == 'metrics'
input-file: "https://github.com/Azure/azure-rest-api-specs/blob/86408a8777e623f5f41e260472ed831309b85086/specification/monitor/resource-manager/Microsoft.Insights/stable/2018-01-01/metrics_API.json"
output-folder: ../src/generated/metrics
package-name: "monitor-metrics"
clear-output-folder: true
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210111.1"
disable-async-iterators: true
api-version-parameter: choice
hide-clients: true
```

```yaml $(tag) == 'metrics-definitions'
input-file: "https://github.com/Azure/azure-rest-api-specs/blob/86408a8777e623f5f41e260472ed831309b85086/specification/monitor/resource-manager/Microsoft.Insights/stable/2018-01-01/metricDefinitions_API.json"
output-folder: ../src/generated/metricsdefinitions
package-name: "monitor-metrics-definitions"
clear-output-folder: true
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210111.1"
disable-async-iterators: true
api-version-parameter: choice
hide-clients: true
```

```yaml $(tag) == 'metrics-namespaces'
input-file: "https://github.com/Azure/azure-rest-api-specs/blob/86408a8777e623f5f41e260472ed831309b85086/specification/monitor/resource-manager/Microsoft.Insights/preview/2017-12-01-preview/metricNamespaces_API.json"
output-folder: ../src/generated/metricsnamespaces
package-name: "monitor-metrics-namespaces"
clear-output-folder: true
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20210111.1"
disable-async-iterators: true
api-version-parameter: choice
hide-clients: true
```
