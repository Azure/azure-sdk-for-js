# KeyVault Keys Swagger Configuration

> see https://aka.ms/autorest

```yaml
typescript:
  package-name: "@azure/digitaltwins"
  title: GeneratedClient
  description: Digitaltwins Client
use-extension:
  "@microsoft.azure/autorest.typescript": "~5.1.0"
azure-arm: true
generate-metadata: false
add-credentials: true
license-header: MICROSOFT_MIT_NO_VERSION
input-file: https://github.com/Azure/azure-rest-api-specs/blob/master/specification/digitaltwins/data-plane/Microsoft.DigitalTwins/preview/2020-05-31-preview/digitaltwins.json
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
