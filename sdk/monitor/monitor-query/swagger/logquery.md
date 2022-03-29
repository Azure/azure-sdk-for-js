# Azure Monitor Workspace query TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/blob/dba6ed1f03bda88ac6884c0a883246446cc72495/specification/operationalinsights/data-plane/Microsoft.OperationalInsights/preview/2021-05-19_Preview/OperationalInsights.json
output-folder: ../src/generated/logquery
package-name: "monitor-log-query"
package-version: "1.0.1"
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
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### ErrorInfo - renaming `errorinfo` property name to `errorInfo`

```yaml
directive:
  - from: swagger-document
    where: $.definitions.errorInfo
    transform: >
      $.properties.innererror["x-ms-client-name"] = "innerError";
```
