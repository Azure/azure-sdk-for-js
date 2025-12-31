# Azure Purview Share TypeScript Protocol Layer

> see https://aka.ms/autorest

## Configuration

```yaml
flavor: azure
openapi-type: data-plane
package-name: "@azure-rest/purview-sharing"
title: Purview Sharing
description: Purview Sharing Client
license-header: MICROSOFT_MIT_NO_VERSION
output-folder: ../
source-code-folder-path: ./src
input-file: https://raw.githubusercontent.com/Azure/azure-rest-api-specs/40a953243ea428918de6e63758e853b7a24aa59a/specification/purview/data-plane/Azure.Analytics.Purview.Share/preview/2023-05-30-preview/share.json
package-version: 1.0.0-beta.5
rest-level-client: true
add-credentials: true
credential-scopes: "https://purview.azure.net/.default"
generate-metadata: false
generate-test: false
generate-sample: false
use-extension:
  "@autorest/typescript": "6.0.34"
modelerfour:
  lenient-model-deduplication: true
directive:
  rename-operation:
    [
      from: "SentShares_Get",
      to: "SentShares_GetSentShare",
      from: "SentShares_Create",
      to: "SentShares_CreateOrReplaceSentShare",
      from: "SentShares_Delete",
      to: "SentShares_DeleteSentShare",
      from: "SentShares_List",
      to: "SentShares_GetAllSentShares",
      from: "SentShares_GetInvitation",
      to: "SentShares_GetSentShareInvitation",
      from: "SentShares_CreateInvitation",
      to: "SentShares_CreateSentShareInvitation",
      from: "SentShares_DeleteInvitation",
      to: "SentShares_DeleteSentShareInvitation",
      from: "SentShares_ListInvitations",
      to: "SentShares_GetAllSentShareInvitations",
      from: "SentShares_NotifyUserInvitation",
      to: "SentShares_NotifyUserSentShareInvitation",
      from: "ReceivedShares_Get",
      to: "ReceivedShares_GetReceivedShare",
      from: "ReceivedShares_Create",
      to: "ReceivedShares_CreateOrReplaceReceivedShare",
      from: "ReceivedShares_Delete",
      to: "ReceivedShares_DeleteReceivedShare",
      from: "ReceivedShares_ListAttached",
      to: "ReceivedShares_GetAllAttachedReceivedShares",
      from: "ReceivedShares_ListDetached",
      to: "ReceivedShares_GetAllDetachedReceivedShares",
      from: "ShareResources_List",
      to: "ShareResources_GetAllShareResources"
    ]
module-kind: esm
```
