# Azure Maps Search Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
v3: true
package-name: "@azure/maps-search"
title: MapsSearchClient
description: Azure Maps Search Client
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src/generated
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/maps/data-plane/Search/preview/1.0/search.json
#input-file: ..\..\..\..\..\azure-rest-api-specs\specification\maps\data-plane\Search\preview\1.0\search.json
# add-credentials: true
# credential-default-policy-type: BearerTokenCredentialPolicy
# credential-scopes: https://atlas.microsoft.com/.default
add-credentials: false
override-client-name: GeneratedClient
package-version: 1.0.0-beta.1
disable-async-iterators: true
hide-clients: true
use-extension:
  "@autorest/typescript": "6.0.0-beta.13"
```
