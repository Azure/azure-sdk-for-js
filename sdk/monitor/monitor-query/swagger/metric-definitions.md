# Azure Monitor Workspace query TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/0b64ca7cbe3af8cd13228dfb783a16b8272b8be2/specification/monitor/resource-manager/Microsoft.Insights/stable/2024-02-01/metricDefinitions_API.json
service-name: MetricsDefinitions
output-folder: ../src/generated/metricsdefinitions
package-name: "monitor-metrics-definitions"
package-version: "1.2.0"
clear-output-folder: true
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
disable-async-iterators: true
api-version-parameter: choice
hide-clients: true
v3: true
typescript: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.15"
```

### Add missing x-ms-parameter-location for SubscriptionIdParameter

```yaml
directive:
  - from: swagger-document
    where: $.parameters.SubscriptionIdParameter
    transform: >
      $["x-ms-parameter-location"] = "method";
```

### Rename title

```yaml
directive:
  - from: swagger-document
    where: $.info
    transform: >
      $["title"] = "MonitorManagementClient";
```
