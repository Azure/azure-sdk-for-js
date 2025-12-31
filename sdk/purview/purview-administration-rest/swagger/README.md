# Azure Purview Catalog TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml $(purview-account) == true
title: PurviewAccount
description: Purview Account Client
output-folder: ../
source-code-folder-path: ./src/account
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/purview/data-plane/Azure.Analytics.Purview.Account/preview/2019-11-01-preview/account.json
```

```yaml $(purview-metadata) == true
title: PurviewMetadataPolicies
description: Purview Metadata Policies Client
output-folder: ../
source-code-folder-path: ./src/metadataPolicies
input-file:  https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/purview/data-plane/Azure.Analytics.Purview.MetadataPolicies/preview/2021-07-01-preview/purviewMetadataPolicy.json
```


```yaml
flavor: azure
openapi-type: data-plane
modelerfour.lenient-model-deduplication: true
package-name: "@azure-rest/purview-administration"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
package-version: 1.0.0-beta.4
rest-level-client: true
add-credentials: true
credential-scopes: "https://purview.azure.net/.default"
use-extension:
  "@autorest/typescript": "6.0.34"
batch:
  - purview-metadata: true
  - purview-account: true
module-kind: esm
```
