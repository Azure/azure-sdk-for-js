## Configuration file for autorest for JavaScript

## Log Query

```yaml $(tag) == 'logquery'
input-file: "log_query_swagger.json"
output-folder: ../src/generated/logquery
package-name: "monitor-log-query"
clear-output-folder: true
generate-metadata: false
add-credentials: true
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
input-file: "metrics_swagger.json"
output-folder: ../src/generated/metrics
package-name: "monitor-metrics"
clear-output-folder: true
generate-metadata: false
add-credentials: true
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
input-file: "metrics_definitions.json"
output-folder: ../src/generated/metricsdefinitions
package-name: "monitor-metrics-definitions"
clear-output-folder: true
generate-metadata: false
add-credentials: true
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
input-file: "metrics_namespaces.json"
output-folder: ../src/generated/metricsnamespaces
package-name: "monitor-metrics-namespaces"
clear-output-folder: true
generate-metadata: false
add-credentials: true
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
