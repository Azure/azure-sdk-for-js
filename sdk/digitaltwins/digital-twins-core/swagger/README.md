# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/digital-twins-core"
  title: GeneratedClient
  description: Digitaltwins Client
use-extension:
  "@autorest/typescript": "6.0.0-dev.20200727.1"
generate-metadata: false
add-credentials: false
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://github.com/Azure/azure-rest-api-specs/blob/master/specification/digitaltwins/data-plane/Microsoft.DigitalTwins/stable/2020-10-31/digitaltwins.json
output-folder: ../
source-code-folder-path: ./src/generated
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
