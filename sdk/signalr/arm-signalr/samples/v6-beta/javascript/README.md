# @azure/arm-signalr client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-signalr in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2025-01-01-preview/Operations_List.json                                                                                  |
| [signalRCheckNameAvailabilitySample.js][signalrchecknameavailabilitysample]                                                     | checks that the resource name is valid and is not already in use. x-ms-original-file: 2025-01-01-preview/SignalR_CheckNameAvailability.json                                       |
| [signalRCreateOrUpdateSample.js][signalrcreateorupdatesample]                                                                   | create or update a resource. x-ms-original-file: 2025-01-01-preview/SignalR_CreateOrUpdate.json                                                                                   |
| [signalRCustomCertificatesCreateOrUpdateSample.js][signalrcustomcertificatescreateorupdatesample]                               | create or update a custom certificate. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_CreateOrUpdate.json                                                       |
| [signalRCustomCertificatesDeleteSample.js][signalrcustomcertificatesdeletesample]                                               | delete a custom certificate. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_Delete.json                                                                         |
| [signalRCustomCertificatesGetSample.js][signalrcustomcertificatesgetsample]                                                     | get a custom certificate. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_Get.json                                                                               |
| [signalRCustomCertificatesListSample.js][signalrcustomcertificateslistsample]                                                   | list all custom certificates. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_List.json                                                                          |
| [signalRCustomDomainsCreateOrUpdateSample.js][signalrcustomdomainscreateorupdatesample]                                         | create or update a custom domain. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_CreateOrUpdate.json                                                                 |
| [signalRCustomDomainsDeleteSample.js][signalrcustomdomainsdeletesample]                                                         | delete a custom domain. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_Delete.json                                                                                   |
| [signalRCustomDomainsGetSample.js][signalrcustomdomainsgetsample]                                                               | get a custom domain. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_Get.json                                                                                         |
| [signalRCustomDomainsListSample.js][signalrcustomdomainslistsample]                                                             | list all custom domains. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_List.json                                                                                    |
| [signalRDeleteSample.js][signalrdeletesample]                                                                                   | operation to delete a resource. x-ms-original-file: 2025-01-01-preview/SignalR_Delete.json                                                                                        |
| [signalRGetSample.js][signalrgetsample]                                                                                         | get the resource and its properties. x-ms-original-file: 2025-01-01-preview/SignalR_Get.json                                                                                      |
| [signalRListByResourceGroupSample.js][signalrlistbyresourcegroupsample]                                                         | handles requests to list all resources in a resource group. x-ms-original-file: 2025-01-01-preview/SignalR_ListByResourceGroup.json                                               |
| [signalRListBySubscriptionSample.js][signalrlistbysubscriptionsample]                                                           | handles requests to list all resources in a subscription. x-ms-original-file: 2025-01-01-preview/SignalR_ListBySubscription.json                                                  |
| [signalRListKeysSample.js][signalrlistkeyssample]                                                                               | get the access keys of the resource. x-ms-original-file: 2025-01-01-preview/SignalR_ListKeys.json                                                                                 |
| [signalRListReplicaSkusSample.js][signalrlistreplicaskussample]                                                                 | list all available skus of the replica resource. x-ms-original-file: 2025-01-01-preview/SignalR_ListReplicaSkus.json                                                              |
| [signalRListSkusSample.js][signalrlistskussample]                                                                               | list all available skus of the resource. x-ms-original-file: 2025-01-01-preview/SignalR_ListSkus.json                                                                             |
| [signalRPrivateEndpointConnectionsDeleteSample.js][signalrprivateendpointconnectionsdeletesample]                               | delete the specified private endpoint connection x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Delete.json                                             |
| [signalRPrivateEndpointConnectionsGetSample.js][signalrprivateendpointconnectionsgetsample]                                     | get the specified private endpoint connection x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Get.json                                                   |
| [signalRPrivateEndpointConnectionsListSample.js][signalrprivateendpointconnectionslistsample]                                   | list private endpoint connections x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_List.json                                                              |
| [signalRPrivateEndpointConnectionsUpdateSample.js][signalrprivateendpointconnectionsupdatesample]                               | update the state of specified private endpoint connection x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Update.json                                    |
| [signalRPrivateLinkResourcesListSample.js][signalrprivatelinkresourceslistsample]                                               | get the private link resources that need to be created for a resource. x-ms-original-file: 2025-01-01-preview/SignalRPrivateLinkResources_List.json                               |
| [signalRRegenerateKeySample.js][signalrregeneratekeysample]                                                                     | regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: 2025-01-01-preview/SignalR_RegenerateKey.json |
| [signalRReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.js][signalrreplicasharedprivatelinkresourcescreateorupdatesample] | create or update a shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_CreateOrUpdate.json                               |
| [signalRReplicaSharedPrivateLinkResourcesGetSample.js][signalrreplicasharedprivatelinkresourcesgetsample]                       | get the specified shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_Get.json                                           |
| [signalRReplicaSharedPrivateLinkResourcesListSample.js][signalrreplicasharedprivatelinkresourceslistsample]                     | list shared private link resources x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_List.json                                                      |
| [signalRReplicasCreateOrUpdateSample.js][signalrreplicascreateorupdatesample]                                                   | create or update a replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_CreateOrUpdate.json                                                                            |
| [signalRReplicasDeleteSample.js][signalrreplicasdeletesample]                                                                   | operation to delete a replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Delete.json                                                                                 |
| [signalRReplicasGetSample.js][signalrreplicasgetsample]                                                                         | get the replica and its properties. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Get.json                                                                               |
| [signalRReplicasListSample.js][signalrreplicaslistsample]                                                                       | list all replicas belong to this resource x-ms-original-file: 2025-01-01-preview/SignalRReplicas_List.json                                                                        |
| [signalRReplicasRestartSample.js][signalrreplicasrestartsample]                                                                 | operation to restart a replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Restart.json                                                                               |
| [signalRReplicasUpdateSample.js][signalrreplicasupdatesample]                                                                   | operation to update an exiting replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Update.json                                                                        |
| [signalRRestartSample.js][signalrrestartsample]                                                                                 | operation to restart a resource. x-ms-original-file: 2025-01-01-preview/SignalR_Restart.json                                                                                      |
| [signalRSharedPrivateLinkResourcesCreateOrUpdateSample.js][signalrsharedprivatelinkresourcescreateorupdatesample]               | create or update a shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_CreateOrUpdate.json                                      |
| [signalRSharedPrivateLinkResourcesDeleteSample.js][signalrsharedprivatelinkresourcesdeletesample]                               | delete the specified shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_Delete.json                                            |
| [signalRSharedPrivateLinkResourcesGetSample.js][signalrsharedprivatelinkresourcesgetsample]                                     | get the specified shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_Get.json                                                  |
| [signalRSharedPrivateLinkResourcesListSample.js][signalrsharedprivatelinkresourceslistsample]                                   | list shared private link resources x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_List.json                                                             |
| [signalRUpdateSample.js][signalrupdatesample]                                                                                   | operation to update an exiting resource. x-ms-original-file: 2025-01-01-preview/SignalR_Update.json                                                                               |
| [usagesListSample.js][usageslistsample]                                                                                         | list resource usage quotas by location. x-ms-original-file: 2025-01-01-preview/Usages_List.json                                                                                   |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/operationsListSample.js
[signalrchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCheckNameAvailabilitySample.js
[signalrcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCreateOrUpdateSample.js
[signalrcustomcertificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomCertificatesCreateOrUpdateSample.js
[signalrcustomcertificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomCertificatesDeleteSample.js
[signalrcustomcertificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomCertificatesGetSample.js
[signalrcustomcertificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomCertificatesListSample.js
[signalrcustomdomainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomDomainsCreateOrUpdateSample.js
[signalrcustomdomainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomDomainsDeleteSample.js
[signalrcustomdomainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomDomainsGetSample.js
[signalrcustomdomainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRCustomDomainsListSample.js
[signalrdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRDeleteSample.js
[signalrgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRGetSample.js
[signalrlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRListByResourceGroupSample.js
[signalrlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRListBySubscriptionSample.js
[signalrlistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRListKeysSample.js
[signalrlistreplicaskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRListReplicaSkusSample.js
[signalrlistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRListSkusSample.js
[signalrprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRPrivateEndpointConnectionsDeleteSample.js
[signalrprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRPrivateEndpointConnectionsGetSample.js
[signalrprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRPrivateEndpointConnectionsListSample.js
[signalrprivateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRPrivateEndpointConnectionsUpdateSample.js
[signalrprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRPrivateLinkResourcesListSample.js
[signalrregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRRegenerateKeySample.js
[signalrreplicasharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.js
[signalrreplicasharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicaSharedPrivateLinkResourcesGetSample.js
[signalrreplicasharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicaSharedPrivateLinkResourcesListSample.js
[signalrreplicascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicasCreateOrUpdateSample.js
[signalrreplicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicasDeleteSample.js
[signalrreplicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicasGetSample.js
[signalrreplicaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicasListSample.js
[signalrreplicasrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicasRestartSample.js
[signalrreplicasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRReplicasUpdateSample.js
[signalrrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRRestartSample.js
[signalrsharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRSharedPrivateLinkResourcesCreateOrUpdateSample.js
[signalrsharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRSharedPrivateLinkResourcesDeleteSample.js
[signalrsharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRSharedPrivateLinkResourcesGetSample.js
[signalrsharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRSharedPrivateLinkResourcesListSample.js
[signalrupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/signalRUpdateSample.js
[usageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/javascript/usagesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-signalr?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/signalr/arm-signalr/README.md
