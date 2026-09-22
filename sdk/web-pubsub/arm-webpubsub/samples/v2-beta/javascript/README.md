# @azure/arm-webpubsub client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-webpubsub in some common scenarios.

| **File Name**                                                                                                                       | **Description**                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                     | list the operations for the provider x-ms-original-file: 2025-08-01-preview/Operations_List.json                                                                                    |
| [usagesListSample.js][usageslistsample]                                                                                             | list resource usage quotas by location. x-ms-original-file: 2025-08-01-preview/Usages_List.json                                                                                     |
| [webPubSubCheckNameAvailabilitySample.js][webpubsubchecknameavailabilitysample]                                                     | checks that the resource name is valid and is not already in use. x-ms-original-file: 2025-08-01-preview/WebPubSub_CheckNameAvailability.json                                       |
| [webPubSubCreateOrUpdateSample.js][webpubsubcreateorupdatesample]                                                                   | create or update a resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_CreateOrUpdate.json                                                                                   |
| [webPubSubCustomCertificatesCreateOrUpdateSample.js][webpubsubcustomcertificatescreateorupdatesample]                               | create or update a custom certificate. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_CreateOrUpdate.json                                                       |
| [webPubSubCustomCertificatesDeleteSample.js][webpubsubcustomcertificatesdeletesample]                                               | delete a custom certificate. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Delete.json                                                                         |
| [webPubSubCustomCertificatesGetSample.js][webpubsubcustomcertificatesgetsample]                                                     | get a custom certificate. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_Get.json                                                                               |
| [webPubSubCustomCertificatesListSample.js][webpubsubcustomcertificateslistsample]                                                   | list all custom certificates. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomCertificates_List.json                                                                          |
| [webPubSubCustomDomainsCreateOrUpdateSample.js][webpubsubcustomdomainscreateorupdatesample]                                         | create or update a custom domain. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_CreateOrUpdate.json                                                                 |
| [webPubSubCustomDomainsDeleteSample.js][webpubsubcustomdomainsdeletesample]                                                         | delete a custom domain. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Delete.json                                                                                   |
| [webPubSubCustomDomainsGetSample.js][webpubsubcustomdomainsgetsample]                                                               | get a custom domain. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_Get.json                                                                                         |
| [webPubSubCustomDomainsListSample.js][webpubsubcustomdomainslistsample]                                                             | list all custom domains. x-ms-original-file: 2025-08-01-preview/WebPubSubCustomDomains_List.json                                                                                    |
| [webPubSubDeleteSample.js][webpubsubdeletesample]                                                                                   | operation to delete a resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_Delete.json                                                                                        |
| [webPubSubGetSample.js][webpubsubgetsample]                                                                                         | get the resource and its properties. x-ms-original-file: 2025-08-01-preview/WebPubSub_Get.json                                                                                      |
| [webPubSubHubsCreateOrUpdateSample.js][webpubsubhubscreateorupdatesample]                                                           | create or update a hub setting. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_CreateOrUpdate.json                                                                            |
| [webPubSubHubsDeleteSample.js][webpubsubhubsdeletesample]                                                                           | delete a hub setting. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_Delete.json                                                                                              |
| [webPubSubHubsGetSample.js][webpubsubhubsgetsample]                                                                                 | get a hub setting. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_Get.json                                                                                                    |
| [webPubSubHubsListSample.js][webpubsubhubslistsample]                                                                               | list hub settings. x-ms-original-file: 2025-08-01-preview/WebPubSubHubs_List.json                                                                                                   |
| [webPubSubListByResourceGroupSample.js][webpubsublistbyresourcegroupsample]                                                         | handles requests to list all resources in a resource group. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListByResourceGroup.json                                               |
| [webPubSubListBySubscriptionSample.js][webpubsublistbysubscriptionsample]                                                           | handles requests to list all resources in a subscription. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListBySubscription.json                                                  |
| [webPubSubListKeysSample.js][webpubsublistkeyssample]                                                                               | get the access keys of the resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListKeys.json                                                                                 |
| [webPubSubListReplicaSkusSample.js][webpubsublistreplicaskussample]                                                                 | list all available skus of the replica resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListReplicaSkus.json                                                              |
| [webPubSubListSkusSample.js][webpubsublistskussample]                                                                               | list all available skus of the resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_ListSkus.json                                                                             |
| [webPubSubPrivateEndpointConnectionsDeleteSample.js][webpubsubprivateendpointconnectionsdeletesample]                               | delete the specified private endpoint connection x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Delete.json                                             |
| [webPubSubPrivateEndpointConnectionsGetSample.js][webpubsubprivateendpointconnectionsgetsample]                                     | get the specified private endpoint connection x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Get.json                                                   |
| [webPubSubPrivateEndpointConnectionsListSample.js][webpubsubprivateendpointconnectionslistsample]                                   | list private endpoint connections x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_List.json                                                              |
| [webPubSubPrivateEndpointConnectionsUpdateSample.js][webpubsubprivateendpointconnectionsupdatesample]                               | update the state of specified private endpoint connection x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateEndpointConnections_Update.json                                    |
| [webPubSubPrivateLinkResourcesListSample.js][webpubsubprivatelinkresourceslistsample]                                               | get the private link resources that need to be created for a resource. x-ms-original-file: 2025-08-01-preview/WebPubSubPrivateLinkResources_List.json                               |
| [webPubSubRegenerateKeySample.js][webpubsubregeneratekeysample]                                                                     | regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: 2025-08-01-preview/WebPubSub_RegenerateKey.json |
| [webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.js][webpubsubreplicasharedprivatelinkresourcescreateorupdatesample] | create or update a shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_CreateOrUpdate.json                               |
| [webPubSubReplicaSharedPrivateLinkResourcesGetSample.js][webpubsubreplicasharedprivatelinkresourcesgetsample]                       | get the specified shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_Get.json                                           |
| [webPubSubReplicaSharedPrivateLinkResourcesListSample.js][webpubsubreplicasharedprivatelinkresourceslistsample]                     | list shared private link resources x-ms-original-file: 2025-08-01-preview/WebPubSubReplicaSharedPrivateLinkResources_List.json                                                      |
| [webPubSubReplicasCreateOrUpdateSample.js][webpubsubreplicascreateorupdatesample]                                                   | create or update a replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_CreateOrUpdate.json                                                                            |
| [webPubSubReplicasDeleteSample.js][webpubsubreplicasdeletesample]                                                                   | operation to delete a replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Delete.json                                                                                 |
| [webPubSubReplicasGetSample.js][webpubsubreplicasgetsample]                                                                         | get the replica and its properties. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Get.json                                                                               |
| [webPubSubReplicasListSample.js][webpubsubreplicaslistsample]                                                                       | list all replicas belong to this resource x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_List.json                                                                        |
| [webPubSubReplicasRestartSample.js][webpubsubreplicasrestartsample]                                                                 | operation to restart a replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Restart.json                                                                               |
| [webPubSubReplicasUpdateSample.js][webpubsubreplicasupdatesample]                                                                   | operation to update an exiting replica. x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Update.json                                                                        |
| [webPubSubRestartSample.js][webpubsubrestartsample]                                                                                 | operation to restart a resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_Restart.json                                                                                      |
| [webPubSubSharedPrivateLinkResourcesCreateOrUpdateSample.js][webpubsubsharedprivatelinkresourcescreateorupdatesample]               | create or update a shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_CreateOrUpdate.json                                      |
| [webPubSubSharedPrivateLinkResourcesDeleteSample.js][webpubsubsharedprivatelinkresourcesdeletesample]                               | delete the specified shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_Delete.json                                            |
| [webPubSubSharedPrivateLinkResourcesGetSample.js][webpubsubsharedprivatelinkresourcesgetsample]                                     | get the specified shared private link resource x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_Get.json                                                  |
| [webPubSubSharedPrivateLinkResourcesListSample.js][webpubsubsharedprivatelinkresourceslistsample]                                   | list shared private link resources x-ms-original-file: 2025-08-01-preview/WebPubSubSharedPrivateLinkResources_List.json                                                             |
| [webPubSubUpdateSample.js][webpubsubupdatesample]                                                                                   | operation to update an exiting resource. x-ms-original-file: 2025-08-01-preview/WebPubSub_Update.json                                                                               |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node operationsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/operationsListSample.js
[usageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/usagesListSample.js
[webpubsubchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCheckNameAvailabilitySample.js
[webpubsubcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCreateOrUpdateSample.js
[webpubsubcustomcertificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomCertificatesCreateOrUpdateSample.js
[webpubsubcustomcertificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomCertificatesDeleteSample.js
[webpubsubcustomcertificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomCertificatesGetSample.js
[webpubsubcustomcertificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomCertificatesListSample.js
[webpubsubcustomdomainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomDomainsCreateOrUpdateSample.js
[webpubsubcustomdomainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomDomainsDeleteSample.js
[webpubsubcustomdomainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomDomainsGetSample.js
[webpubsubcustomdomainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubCustomDomainsListSample.js
[webpubsubdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubDeleteSample.js
[webpubsubgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubGetSample.js
[webpubsubhubscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubHubsCreateOrUpdateSample.js
[webpubsubhubsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubHubsDeleteSample.js
[webpubsubhubsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubHubsGetSample.js
[webpubsubhubslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubHubsListSample.js
[webpubsublistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubListByResourceGroupSample.js
[webpubsublistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubListBySubscriptionSample.js
[webpubsublistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubListKeysSample.js
[webpubsublistreplicaskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubListReplicaSkusSample.js
[webpubsublistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubListSkusSample.js
[webpubsubprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubPrivateEndpointConnectionsDeleteSample.js
[webpubsubprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubPrivateEndpointConnectionsGetSample.js
[webpubsubprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubPrivateEndpointConnectionsListSample.js
[webpubsubprivateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubPrivateEndpointConnectionsUpdateSample.js
[webpubsubprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubPrivateLinkResourcesListSample.js
[webpubsubregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubRegenerateKeySample.js
[webpubsubreplicasharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.js
[webpubsubreplicasharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicaSharedPrivateLinkResourcesGetSample.js
[webpubsubreplicasharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicaSharedPrivateLinkResourcesListSample.js
[webpubsubreplicascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicasCreateOrUpdateSample.js
[webpubsubreplicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicasDeleteSample.js
[webpubsubreplicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicasGetSample.js
[webpubsubreplicaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicasListSample.js
[webpubsubreplicasrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicasRestartSample.js
[webpubsubreplicasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubReplicasUpdateSample.js
[webpubsubrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubRestartSample.js
[webpubsubsharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubSharedPrivateLinkResourcesCreateOrUpdateSample.js
[webpubsubsharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubSharedPrivateLinkResourcesDeleteSample.js
[webpubsubsharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubSharedPrivateLinkResourcesGetSample.js
[webpubsubsharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubSharedPrivateLinkResourcesListSample.js
[webpubsubupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/web-pubsub/arm-webpubsub/samples/v2-beta/javascript/webPubSubUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-webpubsub?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub/arm-webpubsub/README.md
