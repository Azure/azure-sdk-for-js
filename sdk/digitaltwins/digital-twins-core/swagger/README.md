# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/digital-twins-core"
  title: GeneratedClient
  description: Digitaltwins Client
use-extension:
  "@autorest/typescript": "6.0.0-rc.6.20221226.1"
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://github.com/Azure/azure-rest-api-specs/blob/main/specification/digitaltwins/data-plane/Microsoft.DigitalTwins/stable/2020-10-31/digitaltwins.json
output-folder: ../
source-code-folder-path: ./src/generated
package-version: 2.0.0
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Replace eTag with etag

```yaml
directive:
  - from: swagger-document
    where: $.paths.*.*.responses.*.headers
    transform: >
      if ($["ETag"]) { $["etag"] = $["ETag"]; delete $["ETag"]; }
```

### Replace dtTimestamp with timestamp

```yaml
directive:
  - from: swagger-document
    where: $.paths..parameters[*]
    transform: >
      if ($.name === "dt-timestamp") {
        $["x-ms-client-name"] = "timestamp";
      }
```

### Expose If-None_Match header

```yaml
directive:
  - from: swagger-document
    where: $..[?(@.name=='If-None-Match')]
    transform: delete $.enum;
```

### Remove grouping

```yaml
directive:
  - from: swagger-document
    where: $.parameters[*]
    transform: delete $["x-ms-parameter-grouping"];
```

### Remove traceparent / tracestate (handled by OpenTelemetry)

```yaml
directive:
  - from: swagger-document
    where: $.paths..parameters
    transform: >
      if($[0]["$ref"] === "#/parameters/traceparent") {
        $.shift()
      }
  - from: swagger-document
    where: $.paths..parameters
    transform: >
      if($[0]["$ref"] === "#/parameters/tracestate") {
        $.shift()
      }
```

### Rename maxItemsPerPage to resultsPerPage

```yaml
directive:
  - from: swagger-document
    where: $.parameters[*]
    transform: >
      if ($.name === "max-items-per-page") {
        $["x-ms-client-name"] = "resultsPerPage";
      }
```
