# Azure Monitor Workspace query TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/21f5332f2dc7437d1446edf240e9a3d4c90c6431/specification/operationalinsights/data-plane/Microsoft.OperationalInsights/stable/2022-10-27/OperationalInsights.json
output-folder: ../src/generated/logquery
package-name: "monitor-log-query"
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
