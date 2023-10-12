# Azure Monitor Batch TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/b669d69de7368fafac9ee193f205de2d9d88743e/specification/monitor/data-plane/Microsoft.Insights/stable/2023-10-01/metricBatch.json
output-folder: ../src/generated/metricBatch
package-name: "monitor-metric-batch"
package-version: "1.2.0-beta.2"
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

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Make Subscription Id a method level parameter

```yaml
directive:
  - from: swagger-document
    where: $.parameters.SubscriptionIdParameter
    transform: >
      $["x-ms-parameter-location"] = "method";
```
