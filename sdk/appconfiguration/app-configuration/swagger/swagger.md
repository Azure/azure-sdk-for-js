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
# pull down the swagger file for the AppConfiguration API
input-file: ./appconfiguration.json
model-date-time-as-string: false
optional-response-headers: true
sample-generation: false
# need this or a later version so we generate code using @azure/core-http
use: '@microsoft.azure/autorest.typescript@5.0.0'
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