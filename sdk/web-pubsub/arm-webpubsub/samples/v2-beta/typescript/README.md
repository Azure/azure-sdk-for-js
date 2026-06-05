# @azure/arm-webpubsub client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-webpubsub in some common scenarios.

| **File Name**                                                                                                                       | **Description**                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                     | list the operations for the provider x-ms-original-file: 2025-08-01-preview/Operations_List.json                                                                                    |
| [usagesListSample.ts][usageslistsample]                                                                                             | list resource usage quotas by location. x-ms-original-file: 2025-08-01-preview/Usages_List.json                                                                                     |
| [webPubSubCheckNameAvailabilitySample.ts][webpubsubchecknameavailabilitysample]                                                     | checks that the resource name is valid and is not already in use. x-ms-original-file: 2025-08-01-preview/WebPubSub_CheckNameAvailability.json                                       |
| [webPubSubCreateOrUpdateSample.ts][webpubsubcreateorupdatesample]                                                                   | create or update a resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_CreateOrUpdate.json                                                                                   |
| [webPubSubCustomCertificatesCreateOrUpdateSample.ts][webpubsubcustomcertificatescreateorupdatesample]                               | create or update a custom certificate. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_CreateOrUpdate.json                                                       |
| [webPubSubCustomCertificatesDeleteSample.ts][webpubsubcustomcertificatesdeletesample]                                               | delete a custom certificate. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Delete.json                                                                         |
| [webPubSubCustomCertificatesGetSample.ts][webpubsubcustomcertificatesgetsample]                                                     | get a custom certificate. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Get.json                                                                               |
| [webPubSubCustomCertificatesListSample.ts][webpubsubcustomcertificateslistsample]                                                   | list all custom certificates. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_List.json                                                                          |
| [webPubSubCustomDomainsCreateOrUpdateSample.ts][webpubsubcustomdomainscreateorupdatesample]                                         | create or update a custom domain. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_CreateOrUpdate.json                                                                 |
| [webPubSubCustomDomainsDeleteSample.ts][webpubsubcustomdomainsdeletesample]                                                         | delete a custom domain. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Delete.json                                                                                   |
| [webPubSubCustomDomainsGetSample.ts][webpubsubcustomdomainsgetsample]                                                               | get a custom domain. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Get.json                                                                                         |
| [webPubSubCustomDomainsListSample.ts][webpubsubcustomdomainslistsample]                                                             | list all custom domains. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_List.json                                                                                    |
| [webPubSubDeleteSample.ts][webpubsubdeletesample]                                                                                   | operation to delete a resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_Delete.json                                                                                        |
| [webPubSubGetSample.ts][webpubsubgetsample]                                                                                         | get the resource and its properties. x-ms-original-file: 2025-08-01-preview/WebPubSub_Get.json                                                                                      |
| [webPubSubHubsCreateOrUpdateSample.ts][webpubsubhubscreateorupdatesample]                                                           | create or update a hub setting. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_CreateOrUpdate.json                                                                            |
| [webPubSubHubsDeleteSample.ts][webpubsubhubsdeletesample]                                                                           | delete a hub setting. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_Delete.json                                                                                              |
| [webPubSubHubsGetSample.ts][webpubsubhubsgetsample]                                                                                 | get a hub setting. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_Get.json                                                                                                    |
| [webPubSubHubsListSample.ts][webpubsubhubslistsample]                                                                               | list hub settings. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_List.json                                                                                                   |
| [webPubSubListByResourceGroupSample.ts][webpubsublistbyresourcegroupsample]                                                         | handles requests to list all resources in a resource group. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListByResourceGroup.json                                               |
| [webPubSubListBySubscriptionSample.ts][webpubsublistbysubscriptionsample]                                                           | handles requests to list all resources in a subscription. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListBySubscription.json                                                  |
| [webPubSubListKeysSample.ts][webpubsublistkeyssample]                                                                               | get the access keys of the resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListKeys.json                                                                                 |
| [webPubSubListReplicaSkusSample.ts][webpubsublistreplicaskussample]                                                                 | list all available skus of the replica resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListReplicaSkus.json                                                              |
| [webPubSubListSkusSample.ts][webpubsublistskussample]                                                                               | list all available skus of the resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListSkus.json                                                                             |
| [webPubSubPrivateEndpointConnectionsDeleteSample.ts][webpubsubprivateendpointconnectionsdeletesample]                               | delete the specified private endpoint connection x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Delete.json                                             |
| [webPubSubPrivateEndpointConnectionsGetSample.ts][webpubsubprivateendpointconnectionsgetsample]                                     | get the specified private endpoint connection x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Get.json                                                   |
| [webPubSubPrivateEndpointConnectionsListSample.ts][webpubsubprivateendpointconnectionslistsample]                                   | list private endpoint connections x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_List.json                                                              |
| [webPubSubPrivateEndpointConnectionsUpdateSample.ts][webpubsubprivateendpointconnectionsupdatesample]                               | update the state of specified private endpoint connection x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Update.json                                    |
| [webPubSubPrivateLinkResourcesListSample.ts][webpubsubprivatelinkresourceslistsample]                                               | get the private link resources that need to be created for a resource. x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateLinkResources_List.json                               |
| [webPubSubRegenerateKeySample.ts][webpubsubregeneratekeysample]                                                                     | regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: 2025-08-01-preview/WebPubSub_RegenerateKey.json |
| [webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.ts][webpubsubreplicasharedprivatelinkresourcescreateorupdatesample] | create or update a shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_CreateOrUpdate.json                               |
| [webPubSubReplicaSharedPrivateLinkResourcesGetSample.ts][webpubsubreplicasharedprivatelinkresourcesgetsample]                       | get the specified shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_Get.json                                           |
| [webPubSubReplicaSharedPrivateLinkResourcesListSample.ts][webpubsubreplicasharedprivatelinkresourceslistsample]                     | list shared private link resources x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_List.json                                                      |
| [webPubSubReplicasCreateOrUpdateSample.ts][webpubsubreplicascreateorupdatesample]                                                   | create or update a replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_CreateOrUpdate.json                                                                            |
| [webPubSubReplicasDeleteSample.ts][webpubsubreplicasdeletesample]                                                                   | operation to delete a replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Delete.json                                                                                 |
| [webPubSubReplicasGetSample.ts][webpubsubreplicasgetsample]                                                                         | get the replica and its properties. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Get.json                                                                               |
| [webPubSubReplicasListSample.ts][webpubsubreplicaslistsample]                                                                       | list all replicas belong to this resource x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_List.json                                                                        |
| [webPubSubReplicasRestartSample.ts][webpubsubreplicasrestartsample]                                                                 | operation to restart a replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Restart.json                                                                               |
| [webPubSubReplicasUpdateSample.ts][webpubsubreplicasupdatesample]                                                                   | operation to update an exiting replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Update.json                                                                        |
| [webPubSubRestartSample.ts][webpubsubrestartsample]                                                                                 | operation to restart a resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_Restart.json                                                                                      |
| [webPubSubSharedPrivateLinkResourcesCreateOrUpdateSample.ts][webpubsubsharedprivatelinkresourcescreateorupdatesample]               | create or update a shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_CreateOrUpdate.json                                      |
| [webPubSubSharedPrivateLinkResourcesDeleteSample.ts][webpubsubsharedprivatelinkresourcesdeletesample]                               | delete the specified shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_Delete.json                                            |
| [webPubSubSharedPrivateLinkResourcesGetSample.ts][webpubsubsharedprivatelinkresourcesgetsample]                                     | get the specified shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_Get.json                                                  |
| [webPubSubSharedPrivateLinkResourcesListSample.ts][webpubsubsharedprivatelinkresourceslistsample]                                   | list shared private link resources x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_List.json                                                             |
| [webPubSubUpdateSample.ts][webpubsubupdatesample]                                                                                   | operation to update an exiting resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_Update.json                                                                               |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/operationsListSample.ts
[usageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/usagesListSample.ts
[webpubsubchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCheckNameAvailabilitySample.ts
[webpubsubcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCreateOrUpdateSample.ts
[webpubsubcustomcertificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomCertificatesCreateOrUpdateSample.ts
[webpubsubcustomcertificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomCertificatesDeleteSample.ts
[webpubsubcustomcertificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomCertificatesGetSample.ts
[webpubsubcustomcertificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomCertificatesListSample.ts
[webpubsubcustomdomainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomDomainsCreateOrUpdateSample.ts
[webpubsubcustomdomainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomDomainsDeleteSample.ts
[webpubsubcustomdomainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomDomainsGetSample.ts
[webpubsubcustomdomainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubCustomDomainsListSample.ts
[webpubsubdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubDeleteSample.ts
[webpubsubgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubGetSample.ts
[webpubsubhubscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubHubsCreateOrUpdateSample.ts
[webpubsubhubsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubHubsDeleteSample.ts
[webpubsubhubsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubHubsGetSample.ts
[webpubsubhubslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubHubsListSample.ts
[webpubsublistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubListByResourceGroupSample.ts
[webpubsublistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubListBySubscriptionSample.ts
[webpubsublistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubListKeysSample.ts
[webpubsublistreplicaskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubListReplicaSkusSample.ts
[webpubsublistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubListSkusSample.ts
[webpubsubprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubPrivateEndpointConnectionsDeleteSample.ts
[webpubsubprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubPrivateEndpointConnectionsGetSample.ts
[webpubsubprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubPrivateEndpointConnectionsListSample.ts
[webpubsubprivateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubPrivateEndpointConnectionsUpdateSample.ts
[webpubsubprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubPrivateLinkResourcesListSample.ts
[webpubsubregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubRegenerateKeySample.ts
[webpubsubreplicasharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.ts
[webpubsubreplicasharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicaSharedPrivateLinkResourcesGetSample.ts
[webpubsubreplicasharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicaSharedPrivateLinkResourcesListSample.ts
[webpubsubreplicascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicasCreateOrUpdateSample.ts
[webpubsubreplicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicasDeleteSample.ts
[webpubsubreplicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicasGetSample.ts
[webpubsubreplicaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicasListSample.ts
[webpubsubreplicasrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicasRestartSample.ts
[webpubsubreplicasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubReplicasUpdateSample.ts
[webpubsubrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubRestartSample.ts
[webpubsubsharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubSharedPrivateLinkResourcesCreateOrUpdateSample.ts
[webpubsubsharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubSharedPrivateLinkResourcesDeleteSample.ts
[webpubsubsharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubSharedPrivateLinkResourcesGetSample.ts
[webpubsubsharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubSharedPrivateLinkResourcesListSample.ts
[webpubsubupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/typescript/src/webPubSubUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-webpubsub?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/arm-webpubsub/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
