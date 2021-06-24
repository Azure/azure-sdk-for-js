## Configuration file for autorest for JavaScript

## Log Query

```yaml $(tag) == 'logquery'
input-file: "https://raw.githubusercontent.com/srnagar/azure-rest-api-specs/azmon-query-swagger/specification/operationalinsights/data-plane/Microsoft.OperationalInsights/preview/2021-05-19/OperationalInsights.json"
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
input-file: "https://raw.githubusercontent.com/srnagar/azure-rest-api-specs/azmon-query-swagger/specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/metrics_API.json"
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
input-file: "https://raw.githubusercontent.com/srnagar/azure-rest-api-specs/azmon-query-swagger/specification/monitor/resource-manager/Microsoft.Insights/preview/2017-05-01-preview/metricDefinitions_API.json"
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
input-file: "https://raw.githubusercontent.com/srnagar/azure-rest-api-specs/azmon-query-swagger/specification/monitor/resource-manager/Microsoft.Insights/preview/2017-12-01-preview/metricNamespaces_API.json"
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
