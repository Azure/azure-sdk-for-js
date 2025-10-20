# @azure/arm-virtualenclaves client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-virtualenclaves in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approvalCreateOrUpdateSample.ts][approvalcreateorupdatesample]                                       | create a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_CreateOrUpdate.json                                                                            |
| [approvalDeleteSample.ts][approvaldeletesample]                                                       | delete a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_Delete.json                                                                                    |
| [approvalGetSample.ts][approvalgetsample]                                                             | get a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_Get.json                                                                                          |
| [approvalListByParentSample.ts][approvallistbyparentsample]                                           | list ApprovalResource resources by parent x-ms-original-file: 2025-05-01-preview/Approvals_ListByParent.json                                                              |
| [approvalNotifyInitiatorSample.ts][approvalnotifyinitiatorsample]                                     | upon receiving approval or rejection from approver, this facilitates actions on approval resource x-ms-original-file: 2025-05-01-preview/Approvals_NotifyInitiator.json   |
| [approvalUpdateSample.ts][approvalupdatesample]                                                       | update a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_Update.json                                                                                    |
| [communityCheckAddressSpaceAvailabilitySample.ts][communitycheckaddressspaceavailabilitysample]       | checks that the IP Address Space to be allocated for this Community is available. x-ms-original-file: 2025-05-01-preview/Community_PostCheckAddressSpaceAvailability.json |
| [communityCreateOrUpdateSample.ts][communitycreateorupdatesample]                                     | create a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_CreateOrUpdate.json                                                                           |
| [communityDeleteSample.ts][communitydeletesample]                                                     | delete a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_Delete.json                                                                                   |
| [communityEndpointsCreateOrUpdateSample.ts][communityendpointscreateorupdatesample]                   | create a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_CreateOrUpdate.json                                                          |
| [communityEndpointsDeleteSample.ts][communityendpointsdeletesample]                                   | delete a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Delete.json                                                                  |
| [communityEndpointsGetSample.ts][communityendpointsgetsample]                                         | get a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Get.json                                                                        |
| [communityEndpointsHandleApprovalCreationSample.ts][communityendpointshandleapprovalcreationsample]   | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_HandleApprovalCreation.json                                    |
| [communityEndpointsHandleApprovalDeletionSample.ts][communityendpointshandleapprovaldeletionsample]   | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_HandleApprovalDeletion.json                           |
| [communityEndpointsListByCommunityResourceSample.ts][communityendpointslistbycommunityresourcesample] | list CommunityEndpointResource resources by CommunityResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_ListByCommunityResource.json                      |
| [communityEndpointsListBySubscriptionSample.ts][communityendpointslistbysubscriptionsample]           | list CommunityEndpointResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_ListBySubscription.json                             |
| [communityEndpointsUpdateSample.ts][communityendpointsupdatesample]                                   | update a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Update.json                                                                  |
| [communityGetSample.ts][communitygetsample]                                                           | get a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_Get.json                                                                                         |
| [communityListByResourceGroupSample.ts][communitylistbyresourcegroupsample]                           | list CommunityResource resources by resource group x-ms-original-file: 2025-05-01-preview/Community_ListByResourceGroup.json                                              |
| [communityListBySubscriptionSample.ts][communitylistbysubscriptionsample]                             | list CommunityResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/Community_ListBySubscription.json                                              |
| [communityUpdateSample.ts][communityupdatesample]                                                     | update a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_Update.json                                                                                   |
| [enclaveConnectionCreateOrUpdateSample.ts][enclaveconnectioncreateorupdatesample]                     | create a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_CreateOrUpdate.json                                                           |
| [enclaveConnectionDeleteSample.ts][enclaveconnectiondeletesample]                                     | delete a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Delete.json                                                                   |
| [enclaveConnectionGetSample.ts][enclaveconnectiongetsample]                                           | get a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Get.json                                                                         |
| [enclaveConnectionHandleApprovalCreationSample.ts][enclaveconnectionhandleapprovalcreationsample]     | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/EnclaveConnection_HandleApprovalCreation.json                                     |
| [enclaveConnectionHandleApprovalDeletionSample.ts][enclaveconnectionhandleapprovaldeletionsample]     | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/EnclaveConnection_HandleApprovalDeletion.json                            |
| [enclaveConnectionListByResourceGroupSample.ts][enclaveconnectionlistbyresourcegroupsample]           | list EnclaveConnectionResource resources by resource group x-ms-original-file: 2025-05-01-preview/EnclaveConnection_ListByResourceGroup.json                              |
| [enclaveConnectionListBySubscriptionSample.ts][enclaveconnectionlistbysubscriptionsample]             | list EnclaveConnectionResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/EnclaveConnection_ListBySubscription.json                              |
| [enclaveConnectionUpdateSample.ts][enclaveconnectionupdatesample]                                     | update a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Update.json                                                                   |
| [enclaveEndpointsCreateOrUpdateSample.ts][enclaveendpointscreateorupdatesample]                       | create a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_CreateOrUpdate.json                                                              |
| [enclaveEndpointsDeleteSample.ts][enclaveendpointsdeletesample]                                       | delete a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Delete.json                                                                      |
| [enclaveEndpointsGetSample.ts][enclaveendpointsgetsample]                                             | get a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Get.json                                                                            |
| [enclaveEndpointsHandleApprovalCreationSample.ts][enclaveendpointshandleapprovalcreationsample]       | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_HandleApprovalCreation.json                                      |
| [enclaveEndpointsHandleApprovalDeletionSample.ts][enclaveendpointshandleapprovaldeletionsample]       | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_HandleApprovalDeletion.json                             |
| [enclaveEndpointsListByEnclaveResourceSample.ts][enclaveendpointslistbyenclaveresourcesample]         | list EnclaveEndpointResource resources by EnclaveResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_ListByEnclaveResource.json                              |
| [enclaveEndpointsListBySubscriptionSample.ts][enclaveendpointslistbysubscriptionsample]               | list EnclaveEndpointResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_ListBySubscription.json                                 |
| [enclaveEndpointsUpdateSample.ts][enclaveendpointsupdatesample]                                       | update a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Update.json                                                                      |
| [operationsListSample.ts][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2025-05-01-preview/Operations_List.json                                                                          |
| [transitHubCreateOrUpdateSample.ts][transithubcreateorupdatesample]                                   | create a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_CreateOrUpdate.json                                                                         |
| [transitHubDeleteSample.ts][transithubdeletesample]                                                   | delete a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_Delete.json                                                                                 |
| [transitHubGetSample.ts][transithubgetsample]                                                         | get a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_Get.json                                                                                       |
| [transitHubListByCommunityResourceSample.ts][transithublistbycommunityresourcesample]                 | list TransitHubResource resources by CommunityResource x-ms-original-file: 2025-05-01-preview/TransitHub_ListByCommunityResource.json                                     |
| [transitHubListBySubscriptionSample.ts][transithublistbysubscriptionsample]                           | list TransitHubResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/TransitHub_ListBySubscription.json                                            |
| [transitHubUpdateSample.ts][transithubupdatesample]                                                   | update a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_Update.json                                                                                 |
| [virtualEnclaveCreateOrUpdateSample.ts][virtualenclavecreateorupdatesample]                           | create a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_CreateOrUpdate.json                                                                        |
| [virtualEnclaveDeleteSample.ts][virtualenclavedeletesample]                                           | delete a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Delete.json                                                                                |
| [virtualEnclaveGetSample.ts][virtualenclavegetsample]                                                 | get a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Get.json                                                                                      |
| [virtualEnclaveHandleApprovalCreationSample.ts][virtualenclavehandleapprovalcreationsample]           | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/VirtualEnclave_HandleApprovalCreation.json                                        |
| [virtualEnclaveHandleApprovalDeletionSample.ts][virtualenclavehandleapprovaldeletionsample]           | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/VirtualEnclave_HandleApprovalDeletion.json                               |
| [virtualEnclaveListByResourceGroupSample.ts][virtualenclavelistbyresourcegroupsample]                 | list EnclaveResource resources by resource group x-ms-original-file: 2025-05-01-preview/VirtualEnclave_ListByResourceGroup.json                                           |
| [virtualEnclaveListBySubscriptionSample.ts][virtualenclavelistbysubscriptionsample]                   | list EnclaveResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/VirtualEnclave_ListBySubscription.json                                           |
| [virtualEnclaveUpdateSample.ts][virtualenclaveupdatesample]                                           | update a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Update.json                                                                                |
| [workloadCreateOrUpdateSample.ts][workloadcreateorupdatesample]                                       | create a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_CreateOrUpdate.json                                                                             |
| [workloadDeleteSample.ts][workloaddeletesample]                                                       | delete a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_Delete.json                                                                                     |
| [workloadGetSample.ts][workloadgetsample]                                                             | get a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_Get.json                                                                                           |
| [workloadListByEnclaveResourceSample.ts][workloadlistbyenclaveresourcesample]                         | list WorkloadResource resources by EnclaveResource x-ms-original-file: 2025-05-01-preview/Workload_ListByEnclaveResource.json                                             |
| [workloadListBySubscriptionSample.ts][workloadlistbysubscriptionsample]                               | list WorkloadResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/Workload_ListBySubscription.json                                                |
| [workloadUpdateSample.ts][workloadupdatesample]                                                       | update a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_Update.json                                                                                     |

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
node dist/approvalCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/approvalCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approvalcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/approvalCreateOrUpdateSample.ts
[approvaldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/approvalDeleteSample.ts
[approvalgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/approvalGetSample.ts
[approvallistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/approvalListByParentSample.ts
[approvalnotifyinitiatorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/approvalNotifyInitiatorSample.ts
[approvalupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/approvalUpdateSample.ts
[communitycheckaddressspaceavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityCheckAddressSpaceAvailabilitySample.ts
[communitycreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityCreateOrUpdateSample.ts
[communitydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityDeleteSample.ts
[communityendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsCreateOrUpdateSample.ts
[communityendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsDeleteSample.ts
[communityendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsGetSample.ts
[communityendpointshandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsHandleApprovalCreationSample.ts
[communityendpointshandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsHandleApprovalDeletionSample.ts
[communityendpointslistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsListByCommunityResourceSample.ts
[communityendpointslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsListBySubscriptionSample.ts
[communityendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityEndpointsUpdateSample.ts
[communitygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityGetSample.ts
[communitylistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityListByResourceGroupSample.ts
[communitylistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityListBySubscriptionSample.ts
[communityupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/communityUpdateSample.ts
[enclaveconnectioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionCreateOrUpdateSample.ts
[enclaveconnectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionDeleteSample.ts
[enclaveconnectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionGetSample.ts
[enclaveconnectionhandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionHandleApprovalCreationSample.ts
[enclaveconnectionhandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionHandleApprovalDeletionSample.ts
[enclaveconnectionlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionListByResourceGroupSample.ts
[enclaveconnectionlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionListBySubscriptionSample.ts
[enclaveconnectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveConnectionUpdateSample.ts
[enclaveendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsCreateOrUpdateSample.ts
[enclaveendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsDeleteSample.ts
[enclaveendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsGetSample.ts
[enclaveendpointshandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsHandleApprovalCreationSample.ts
[enclaveendpointshandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsHandleApprovalDeletionSample.ts
[enclaveendpointslistbyenclaveresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsListByEnclaveResourceSample.ts
[enclaveendpointslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsListBySubscriptionSample.ts
[enclaveendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/enclaveEndpointsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/operationsListSample.ts
[transithubcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/transitHubCreateOrUpdateSample.ts
[transithubdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/transitHubDeleteSample.ts
[transithubgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/transitHubGetSample.ts
[transithublistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/transitHubListByCommunityResourceSample.ts
[transithublistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/transitHubListBySubscriptionSample.ts
[transithubupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/transitHubUpdateSample.ts
[virtualenclavecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveCreateOrUpdateSample.ts
[virtualenclavedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveDeleteSample.ts
[virtualenclavegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveGetSample.ts
[virtualenclavehandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveHandleApprovalCreationSample.ts
[virtualenclavehandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveHandleApprovalDeletionSample.ts
[virtualenclavelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveListByResourceGroupSample.ts
[virtualenclavelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveListBySubscriptionSample.ts
[virtualenclaveupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/virtualEnclaveUpdateSample.ts
[workloadcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/workloadCreateOrUpdateSample.ts
[workloaddeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/workloadDeleteSample.ts
[workloadgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/workloadGetSample.ts
[workloadlistbyenclaveresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/workloadListByEnclaveResourceSample.ts
[workloadlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/workloadListBySubscriptionSample.ts
[workloadupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/typescript/src/workloadUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-virtualenclaves?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/virtualenclaves/arm-virtualenclaves/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
