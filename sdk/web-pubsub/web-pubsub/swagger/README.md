# Azure Web PubSub Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
package-name: "@azure/web-pubsub"
title: GeneratedClient
description: Web PubSub Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/webpubsub/data-plane/WebPubSub/stable/2021-10-01/webpubsub.json
add-credentials: false
package-version: 1.0.0
v3: true
hide-clients: true
use-core-v2: true
```

## Customizations for Track 2 Generator

See the [AutoRest samples](https://github.com/Azure/autorest/tree/master/Samples/3b-custom-transformations)
for more about how we're customizing things.

### Rename maxresults -> maxPageSize

```yaml
directive:
  - from: swagger-document
    where: $["paths"]["/api/hubs/{hub}/:generateToken"]["post"]["parameters"]
    transform: >
      if($) {
        for(let i = 0; i < $.length; i++) {
          if ($[i] &&  $[i]["name"] == "role") {
            $[i]["x-ms-client-name"] = "roles";
          }
          if ($[i] &&  $[i]["name"] == "minutesToExpire") {
            $[i]["x-ms-client-name"] = "expirationTimeInMinutes";
          }
        }
      }
  - from: swagger-document
    where: $["paths"]["/api/hubs/{hub}/:send"]["post"]["parameters"]
    transform: >
      if($) {
        for(let i = 0; i < $.length; i++) {
          if ($[i] &&  $[i]["name"] == "excluded") {
            $[i]["x-ms-client-name"] = "excludedConnections";
          }
        }
      }
  - from: swagger-document
    where: $["paths"]["/api/hubs/{hub}/groups/{group}/:send"]["post"]["parameters"]
    transform: >
      if($) {
        for(let i = 0; i < $.length; i++) {
          if ($[i] &&  $[i]["name"] == "excluded") {
            $[i]["x-ms-client-name"] = "excludedConnections";
          }
        }
      }
  - from: swagger-document
    where: $["paths"]["/api/hubs/{hub}/groups/{group}/:send"]["post"]["parameters"]
    transform: >
      if($) {
        for(let i = 0; i < $.length; i++) {
          if ($[i] &&  $[i]["name"] == "excluded") {
            $[i]["x-ms-client-name"] = "excludedConnections";
          }
        }
      }
```
