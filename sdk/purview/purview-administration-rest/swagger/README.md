# Azure Purview Catalog TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml $(purview-account) == true
title: PurviewAccount
description: Purview Account Client
output-folder: ../src/account
source-code-folder-path: ./
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/master/specification/purview/data-plane/Azure.Analytics.Purview.Account/preview/2019-11-01-preview/account.json
```

```yaml $(purview-metadata) == true
title: PurviewMetadataPolicies
description: Purview Metadata Policies Client
output-folder: ../src/metadataPolicies
source-code-folder-path: ./
input-file:  https://raw.githubusercontent.com/Azure/azure-rest-api-specs/47868932eb81378d95890594b596f09ce27b69e6/specification/purview/data-plane/Azure.Analytics.Purview.MetadataPolicies/preview/2021-07-01/purviewMetadataPolicy.json
```


```yaml
modelerfour.lenient-model-deduplication: true
package-name: "@azure-rest/purview-administration"
generate-metadata: false
license-header: MICROSOFT_MIT_NO_VERSION
package-version: 1.0.0-beta.1
rest-level-client: true
add-credentials: true
credential-scopes: "https://purview.azure.net/.default"
use-extension:
  "@autorest/typescript": "latest"
```
