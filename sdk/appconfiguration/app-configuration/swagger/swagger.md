# Azure AppConfiguration TypeScript Protocol Layer

> see https://aka.ms/autorest

```yaml
package-name: app-configuration
title: AppConfiguration
description: App Configuration client
enable-xml: true
add-credentials: true
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/appconfiguration/data-plane/Microsoft.AppConfiguration/stable/1.0/appconfiguration.json
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
use-extension:
  "@autorest/typescript": "6.0.0-dev.20201210.1"
disable-async-iterators: true
api-version-parameter: choice
v3: true
```

### Patch endpoints for exception handling
``` yaml
directive:
- from: swagger-document
  where: $["paths"]
  transform: >
    ["get", "put", "head", "delete"].forEach(verb => {
        delete $["/kv/{key}"][verb]["responses"]["404"];
        delete $["/kv/{key}"][verb]["responses"]["412"];
    });

    ["put", "delete" ].forEach(verb => {
        delete $["/locks/{key}"][verb]["responses"]["404"]
        delete $["/locks/{key}"][verb]["responses"]["412"]
    });    
```

### Make .key a required field
``` yaml
directive:
- from: swagger-document
  where: $["definitions"]["KeyValue"]
  transform: >
    $.required = $.required || [];
    $.required.push('key');
```
