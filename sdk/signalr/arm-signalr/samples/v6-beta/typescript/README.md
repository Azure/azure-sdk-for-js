# @azure/arm-signalr client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-signalr in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2025-01-01-preview/Operations_List.json                                                                                  |
| [signalRCheckNameAvailabilitySample.ts][signalrchecknameavailabilitysample]                                                     | checks that the resource name is valid and is not already in use. x-ms-original-file: 2025-01-01-preview/SignalR_CheckNameAvailability.json                                       |
| [signalRCreateOrUpdateSample.ts][signalrcreateorupdatesample]                                                                   | create or update a resource. x-ms-original-file: 2025-01-01-preview/SignalR_CreateOrUpdate.json                                                                                   |
| [signalRCustomCertificatesCreateOrUpdateSample.ts][signalrcustomcertificatescreateorupdatesample]                               | create or update a custom certificate. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_CreateOrUpdate.json                                                       |
| [signalRCustomCertificatesDeleteSample.ts][signalrcustomcertificatesdeletesample]                                               | delete a custom certificate. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_Delete.json                                                                         |
| [signalRCustomCertificatesGetSample.ts][signalrcustomcertificatesgetsample]                                                     | get a custom certificate. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_Get.json                                                                               |
| [signalRCustomCertificatesListSample.ts][signalrcustomcertificateslistsample]                                                   | list all custom certificates. x-ms-original-file: 2025-01-01-preview/SignalRCustomCertificates_List.json                                                                          |
| [signalRCustomDomainsCreateOrUpdateSample.ts][signalrcustomdomainscreateorupdatesample]                                         | create or update a custom domain. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_CreateOrUpdate.json                                                                 |
| [signalRCustomDomainsDeleteSample.ts][signalrcustomdomainsdeletesample]                                                         | delete a custom domain. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_Delete.json                                                                                   |
| [signalRCustomDomainsGetSample.ts][signalrcustomdomainsgetsample]                                                               | get a custom domain. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_Get.json                                                                                         |
| [signalRCustomDomainsListSample.ts][signalrcustomdomainslistsample]                                                             | list all custom domains. x-ms-original-file: 2025-01-01-preview/SignalRCustomDomains_List.json                                                                                    |
| [signalRDeleteSample.ts][signalrdeletesample]                                                                                   | operation to delete a resource. x-ms-original-file: 2025-01-01-preview/SignalR_Delete.json                                                                                        |
| [signalRGetSample.ts][signalrgetsample]                                                                                         | get the resource and its properties. x-ms-original-file: 2025-01-01-preview/SignalR_Get.json                                                                                      |
| [signalRListByResourceGroupSample.ts][signalrlistbyresourcegroupsample]                                                         | handles requests to list all resources in a resource group. x-ms-original-file: 2025-01-01-preview/SignalR_ListByResourceGroup.json                                               |
| [signalRListBySubscriptionSample.ts][signalrlistbysubscriptionsample]                                                           | handles requests to list all resources in a subscription. x-ms-original-file: 2025-01-01-preview/SignalR_ListBySubscription.json                                                  |
| [signalRListKeysSample.ts][signalrlistkeyssample]                                                                               | get the access keys of the resource. x-ms-original-file: 2025-01-01-preview/SignalR_ListKeys.json                                                                                 |
| [signalRListReplicaSkusSample.ts][signalrlistreplicaskussample]                                                                 | list all available skus of the replica resource. x-ms-original-file: 2025-01-01-preview/SignalR_ListReplicaSkus.json                                                              |
| [signalRListSkusSample.ts][signalrlistskussample]                                                                               | list all available skus of the resource. x-ms-original-file: 2025-01-01-preview/SignalR_ListSkus.json                                                                             |
| [signalRPrivateEndpointConnectionsDeleteSample.ts][signalrprivateendpointconnectionsdeletesample]                               | delete the specified private endpoint connection x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Delete.json                                             |
| [signalRPrivateEndpointConnectionsGetSample.ts][signalrprivateendpointconnectionsgetsample]                                     | get the specified private endpoint connection x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Get.json                                                   |
| [signalRPrivateEndpointConnectionsListSample.ts][signalrprivateendpointconnectionslistsample]                                   | list private endpoint connections x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_List.json                                                              |
| [signalRPrivateEndpointConnectionsUpdateSample.ts][signalrprivateendpointconnectionsupdatesample]                               | update the state of specified private endpoint connection x-ms-original-file: 2025-01-01-preview/SignalRPrivateEndpointConnections_Update.json                                    |
| [signalRPrivateLinkResourcesListSample.ts][signalrprivatelinkresourceslistsample]                                               | get the private link resources that need to be created for a resource. x-ms-original-file: 2025-01-01-preview/SignalRPrivateLinkResources_List.json                               |
| [signalRRegenerateKeySample.ts][signalrregeneratekeysample]                                                                     | regenerate the access key for the resource. PrimaryKey and SecondaryKey cannot be regenerated at the same time. x-ms-original-file: 2025-01-01-preview/SignalR_RegenerateKey.json |
| [signalRReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.ts][signalrreplicasharedprivatelinkresourcescreateorupdatesample] | create or update a shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_CreateOrUpdate.json                               |
| [signalRReplicaSharedPrivateLinkResourcesGetSample.ts][signalrreplicasharedprivatelinkresourcesgetsample]                       | get the specified shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_Get.json                                           |
| [signalRReplicaSharedPrivateLinkResourcesListSample.ts][signalrreplicasharedprivatelinkresourceslistsample]                     | list shared private link resources x-ms-original-file: 2025-01-01-preview/SignalRReplicaSharedPrivateLinkResources_List.json                                                      |
| [signalRReplicasCreateOrUpdateSample.ts][signalrreplicascreateorupdatesample]                                                   | create or update a replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_CreateOrUpdate.json                                                                            |
| [signalRReplicasDeleteSample.ts][signalrreplicasdeletesample]                                                                   | operation to delete a replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Delete.json                                                                                 |
| [signalRReplicasGetSample.ts][signalrreplicasgetsample]                                                                         | get the replica and its properties. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Get.json                                                                               |
| [signalRReplicasListSample.ts][signalrreplicaslistsample]                                                                       | list all replicas belong to this resource x-ms-original-file: 2025-01-01-preview/SignalRReplicas_List.json                                                                        |
| [signalRReplicasRestartSample.ts][signalrreplicasrestartsample]                                                                 | operation to restart a replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Restart.json                                                                               |
| [signalRReplicasUpdateSample.ts][signalrreplicasupdatesample]                                                                   | operation to update an exiting replica. x-ms-original-file: 2025-01-01-preview/SignalRReplicas_Update.json                                                                        |
| [signalRRestartSample.ts][signalrrestartsample]                                                                                 | operation to restart a resource. x-ms-original-file: 2025-01-01-preview/SignalR_Restart.json                                                                                      |
| [signalRSharedPrivateLinkResourcesCreateOrUpdateSample.ts][signalrsharedprivatelinkresourcescreateorupdatesample]               | create or update a shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_CreateOrUpdate.json                                      |
| [signalRSharedPrivateLinkResourcesDeleteSample.ts][signalrsharedprivatelinkresourcesdeletesample]                               | delete the specified shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_Delete.json                                            |
| [signalRSharedPrivateLinkResourcesGetSample.ts][signalrsharedprivatelinkresourcesgetsample]                                     | get the specified shared private link resource x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_Get.json                                                  |
| [signalRSharedPrivateLinkResourcesListSample.ts][signalrsharedprivatelinkresourceslistsample]                                   | list shared private link resources x-ms-original-file: 2025-01-01-preview/SignalRSharedPrivateLinkResources_List.json                                                             |
| [signalRUpdateSample.ts][signalrupdatesample]                                                                                   | operation to update an exiting resource. x-ms-original-file: 2025-01-01-preview/SignalR_Update.json                                                                               |
| [usagesListSample.ts][usageslistsample]                                                                                         | list resource usage quotas by location. x-ms-original-file: 2025-01-01-preview/Usages_List.json                                                                                   |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/operationsListSample.ts
[signalrchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCheckNameAvailabilitySample.ts
[signalrcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCreateOrUpdateSample.ts
[signalrcustomcertificatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomCertificatesCreateOrUpdateSample.ts
[signalrcustomcertificatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomCertificatesDeleteSample.ts
[signalrcustomcertificatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomCertificatesGetSample.ts
[signalrcustomcertificateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomCertificatesListSample.ts
[signalrcustomdomainscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomDomainsCreateOrUpdateSample.ts
[signalrcustomdomainsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomDomainsDeleteSample.ts
[signalrcustomdomainsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomDomainsGetSample.ts
[signalrcustomdomainslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRCustomDomainsListSample.ts
[signalrdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRDeleteSample.ts
[signalrgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRGetSample.ts
[signalrlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRListByResourceGroupSample.ts
[signalrlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRListBySubscriptionSample.ts
[signalrlistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRListKeysSample.ts
[signalrlistreplicaskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRListReplicaSkusSample.ts
[signalrlistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRListSkusSample.ts
[signalrprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRPrivateEndpointConnectionsDeleteSample.ts
[signalrprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRPrivateEndpointConnectionsGetSample.ts
[signalrprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRPrivateEndpointConnectionsListSample.ts
[signalrprivateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRPrivateEndpointConnectionsUpdateSample.ts
[signalrprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRPrivateLinkResourcesListSample.ts
[signalrregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRRegenerateKeySample.ts
[signalrreplicasharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicaSharedPrivateLinkResourcesCreateOrUpdateSample.ts
[signalrreplicasharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicaSharedPrivateLinkResourcesGetSample.ts
[signalrreplicasharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicaSharedPrivateLinkResourcesListSample.ts
[signalrreplicascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicasCreateOrUpdateSample.ts
[signalrreplicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicasDeleteSample.ts
[signalrreplicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicasGetSample.ts
[signalrreplicaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicasListSample.ts
[signalrreplicasrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicasRestartSample.ts
[signalrreplicasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRReplicasUpdateSample.ts
[signalrrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRRestartSample.ts
[signalrsharedprivatelinkresourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRSharedPrivateLinkResourcesCreateOrUpdateSample.ts
[signalrsharedprivatelinkresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRSharedPrivateLinkResourcesDeleteSample.ts
[signalrsharedprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRSharedPrivateLinkResourcesGetSample.ts
[signalrsharedprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRSharedPrivateLinkResourcesListSample.ts
[signalrupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/signalRUpdateSample.ts
[usageslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/signalr/arm-signalr/samples/v6-beta/typescript/src/usagesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-signalr?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/signalr/arm-signalr/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
