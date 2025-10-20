# @azure/arm-virtualenclaves client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-virtualenclaves in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approvalCreateOrUpdateSample.js][approvalcreateorupdatesample]                                       | create a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_CreateOrUpdate.json                                                                            |
| [approvalDeleteSample.js][approvaldeletesample]                                                       | delete a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_Delete.json                                                                                    |
| [approvalGetSample.js][approvalgetsample]                                                             | get a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_Get.json                                                                                          |
| [approvalListByParentSample.js][approvallistbyparentsample]                                           | list ApprovalResource resources by parent x-ms-original-file: 2025-05-01-preview/Approvals_ListByParent.json                                                              |
| [approvalNotifyInitiatorSample.js][approvalnotifyinitiatorsample]                                     | upon receiving approval or rejection from approver, this facilitates actions on approval resource x-ms-original-file: 2025-05-01-preview/Approvals_NotifyInitiator.json   |
| [approvalUpdateSample.js][approvalupdatesample]                                                       | update a ApprovalResource x-ms-original-file: 2025-05-01-preview/Approvals_Update.json                                                                                    |
| [communityCheckAddressSpaceAvailabilitySample.js][communitycheckaddressspaceavailabilitysample]       | checks that the IP Address Space to be allocated for this Community is available. x-ms-original-file: 2025-05-01-preview/Community_PostCheckAddressSpaceAvailability.json |
| [communityCreateOrUpdateSample.js][communitycreateorupdatesample]                                     | create a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_CreateOrUpdate.json                                                                           |
| [communityDeleteSample.js][communitydeletesample]                                                     | delete a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_Delete.json                                                                                   |
| [communityEndpointsCreateOrUpdateSample.js][communityendpointscreateorupdatesample]                   | create a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_CreateOrUpdate.json                                                          |
| [communityEndpointsDeleteSample.js][communityendpointsdeletesample]                                   | delete a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Delete.json                                                                  |
| [communityEndpointsGetSample.js][communityendpointsgetsample]                                         | get a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Get.json                                                                        |
| [communityEndpointsHandleApprovalCreationSample.js][communityendpointshandleapprovalcreationsample]   | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_HandleApprovalCreation.json                                    |
| [communityEndpointsHandleApprovalDeletionSample.js][communityendpointshandleapprovaldeletionsample]   | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_HandleApprovalDeletion.json                           |
| [communityEndpointsListByCommunityResourceSample.js][communityendpointslistbycommunityresourcesample] | list CommunityEndpointResource resources by CommunityResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_ListByCommunityResource.json                      |
| [communityEndpointsListBySubscriptionSample.js][communityendpointslistbysubscriptionsample]           | list CommunityEndpointResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_ListBySubscription.json                             |
| [communityEndpointsUpdateSample.js][communityendpointsupdatesample]                                   | update a CommunityEndpointResource x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_Update.json                                                                  |
| [communityGetSample.js][communitygetsample]                                                           | get a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_Get.json                                                                                         |
| [communityListByResourceGroupSample.js][communitylistbyresourcegroupsample]                           | list CommunityResource resources by resource group x-ms-original-file: 2025-05-01-preview/Community_ListByResourceGroup.json                                              |
| [communityListBySubscriptionSample.js][communitylistbysubscriptionsample]                             | list CommunityResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/Community_ListBySubscription.json                                              |
| [communityUpdateSample.js][communityupdatesample]                                                     | update a CommunityResource x-ms-original-file: 2025-05-01-preview/Community_Update.json                                                                                   |
| [enclaveConnectionCreateOrUpdateSample.js][enclaveconnectioncreateorupdatesample]                     | create a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_CreateOrUpdate.json                                                           |
| [enclaveConnectionDeleteSample.js][enclaveconnectiondeletesample]                                     | delete a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Delete.json                                                                   |
| [enclaveConnectionGetSample.js][enclaveconnectiongetsample]                                           | get a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Get.json                                                                         |
| [enclaveConnectionHandleApprovalCreationSample.js][enclaveconnectionhandleapprovalcreationsample]     | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/EnclaveConnection_HandleApprovalCreation.json                                     |
| [enclaveConnectionHandleApprovalDeletionSample.js][enclaveconnectionhandleapprovaldeletionsample]     | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/EnclaveConnection_HandleApprovalDeletion.json                            |
| [enclaveConnectionListByResourceGroupSample.js][enclaveconnectionlistbyresourcegroupsample]           | list EnclaveConnectionResource resources by resource group x-ms-original-file: 2025-05-01-preview/EnclaveConnection_ListByResourceGroup.json                              |
| [enclaveConnectionListBySubscriptionSample.js][enclaveconnectionlistbysubscriptionsample]             | list EnclaveConnectionResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/EnclaveConnection_ListBySubscription.json                              |
| [enclaveConnectionUpdateSample.js][enclaveconnectionupdatesample]                                     | update a EnclaveConnectionResource x-ms-original-file: 2025-05-01-preview/EnclaveConnection_Update.json                                                                   |
| [enclaveEndpointsCreateOrUpdateSample.js][enclaveendpointscreateorupdatesample]                       | create a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_CreateOrUpdate.json                                                              |
| [enclaveEndpointsDeleteSample.js][enclaveendpointsdeletesample]                                       | delete a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Delete.json                                                                      |
| [enclaveEndpointsGetSample.js][enclaveendpointsgetsample]                                             | get a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Get.json                                                                            |
| [enclaveEndpointsHandleApprovalCreationSample.js][enclaveendpointshandleapprovalcreationsample]       | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_HandleApprovalCreation.json                                      |
| [enclaveEndpointsHandleApprovalDeletionSample.js][enclaveendpointshandleapprovaldeletionsample]       | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_HandleApprovalDeletion.json                             |
| [enclaveEndpointsListByEnclaveResourceSample.js][enclaveendpointslistbyenclaveresourcesample]         | list EnclaveEndpointResource resources by EnclaveResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_ListByEnclaveResource.json                              |
| [enclaveEndpointsListBySubscriptionSample.js][enclaveendpointslistbysubscriptionsample]               | list EnclaveEndpointResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_ListBySubscription.json                                 |
| [enclaveEndpointsUpdateSample.js][enclaveendpointsupdatesample]                                       | update a EnclaveEndpointResource x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_Update.json                                                                      |
| [operationsListSample.js][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2025-05-01-preview/Operations_List.json                                                                          |
| [transitHubCreateOrUpdateSample.js][transithubcreateorupdatesample]                                   | create a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_CreateOrUpdate.json                                                                         |
| [transitHubDeleteSample.js][transithubdeletesample]                                                   | delete a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_Delete.json                                                                                 |
| [transitHubGetSample.js][transithubgetsample]                                                         | get a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_Get.json                                                                                       |
| [transitHubListByCommunityResourceSample.js][transithublistbycommunityresourcesample]                 | list TransitHubResource resources by CommunityResource x-ms-original-file: 2025-05-01-preview/TransitHub_ListByCommunityResource.json                                     |
| [transitHubListBySubscriptionSample.js][transithublistbysubscriptionsample]                           | list TransitHubResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/TransitHub_ListBySubscription.json                                            |
| [transitHubUpdateSample.js][transithubupdatesample]                                                   | update a TransitHubResource x-ms-original-file: 2025-05-01-preview/TransitHub_Update.json                                                                                 |
| [virtualEnclaveCreateOrUpdateSample.js][virtualenclavecreateorupdatesample]                           | create a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_CreateOrUpdate.json                                                                        |
| [virtualEnclaveDeleteSample.js][virtualenclavedeletesample]                                           | delete a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Delete.json                                                                                |
| [virtualEnclaveGetSample.js][virtualenclavegetsample]                                                 | get a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Get.json                                                                                      |
| [virtualEnclaveHandleApprovalCreationSample.js][virtualenclavehandleapprovalcreationsample]           | callback that triggers on approval state change. x-ms-original-file: 2025-05-01-preview/VirtualEnclave_HandleApprovalCreation.json                                        |
| [virtualEnclaveHandleApprovalDeletionSample.js][virtualenclavehandleapprovaldeletionsample]           | callback that triggers on approval deletion state change. x-ms-original-file: 2025-05-01-preview/VirtualEnclave_HandleApprovalDeletion.json                               |
| [virtualEnclaveListByResourceGroupSample.js][virtualenclavelistbyresourcegroupsample]                 | list EnclaveResource resources by resource group x-ms-original-file: 2025-05-01-preview/VirtualEnclave_ListByResourceGroup.json                                           |
| [virtualEnclaveListBySubscriptionSample.js][virtualenclavelistbysubscriptionsample]                   | list EnclaveResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/VirtualEnclave_ListBySubscription.json                                           |
| [virtualEnclaveUpdateSample.js][virtualenclaveupdatesample]                                           | update a EnclaveResource x-ms-original-file: 2025-05-01-preview/VirtualEnclave_Update.json                                                                                |
| [workloadCreateOrUpdateSample.js][workloadcreateorupdatesample]                                       | create a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_CreateOrUpdate.json                                                                             |
| [workloadDeleteSample.js][workloaddeletesample]                                                       | delete a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_Delete.json                                                                                     |
| [workloadGetSample.js][workloadgetsample]                                                             | get a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_Get.json                                                                                           |
| [workloadListByEnclaveResourceSample.js][workloadlistbyenclaveresourcesample]                         | list WorkloadResource resources by EnclaveResource x-ms-original-file: 2025-05-01-preview/Workload_ListByEnclaveResource.json                                             |
| [workloadListBySubscriptionSample.js][workloadlistbysubscriptionsample]                               | list WorkloadResource resources by subscription ID x-ms-original-file: 2025-05-01-preview/Workload_ListBySubscription.json                                                |
| [workloadUpdateSample.js][workloadupdatesample]                                                       | update a WorkloadResource x-ms-original-file: 2025-05-01-preview/Workload_Update.json                                                                                     |

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
node approvalCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node approvalCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approvalcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/approvalCreateOrUpdateSample.js
[approvaldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/approvalDeleteSample.js
[approvalgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/approvalGetSample.js
[approvallistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/approvalListByParentSample.js
[approvalnotifyinitiatorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/approvalNotifyInitiatorSample.js
[approvalupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/approvalUpdateSample.js
[communitycheckaddressspaceavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityCheckAddressSpaceAvailabilitySample.js
[communitycreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityCreateOrUpdateSample.js
[communitydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityDeleteSample.js
[communityendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsCreateOrUpdateSample.js
[communityendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsDeleteSample.js
[communityendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsGetSample.js
[communityendpointshandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsHandleApprovalCreationSample.js
[communityendpointshandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsHandleApprovalDeletionSample.js
[communityendpointslistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsListByCommunityResourceSample.js
[communityendpointslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsListBySubscriptionSample.js
[communityendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityEndpointsUpdateSample.js
[communitygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityGetSample.js
[communitylistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityListByResourceGroupSample.js
[communitylistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityListBySubscriptionSample.js
[communityupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/communityUpdateSample.js
[enclaveconnectioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionCreateOrUpdateSample.js
[enclaveconnectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionDeleteSample.js
[enclaveconnectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionGetSample.js
[enclaveconnectionhandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionHandleApprovalCreationSample.js
[enclaveconnectionhandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionHandleApprovalDeletionSample.js
[enclaveconnectionlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionListByResourceGroupSample.js
[enclaveconnectionlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionListBySubscriptionSample.js
[enclaveconnectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveConnectionUpdateSample.js
[enclaveendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsCreateOrUpdateSample.js
[enclaveendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsDeleteSample.js
[enclaveendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsGetSample.js
[enclaveendpointshandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsHandleApprovalCreationSample.js
[enclaveendpointshandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsHandleApprovalDeletionSample.js
[enclaveendpointslistbyenclaveresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsListByEnclaveResourceSample.js
[enclaveendpointslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsListBySubscriptionSample.js
[enclaveendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/enclaveEndpointsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/operationsListSample.js
[transithubcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/transitHubCreateOrUpdateSample.js
[transithubdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/transitHubDeleteSample.js
[transithubgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/transitHubGetSample.js
[transithublistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/transitHubListByCommunityResourceSample.js
[transithublistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/transitHubListBySubscriptionSample.js
[transithubupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/transitHubUpdateSample.js
[virtualenclavecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveCreateOrUpdateSample.js
[virtualenclavedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveDeleteSample.js
[virtualenclavegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveGetSample.js
[virtualenclavehandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveHandleApprovalCreationSample.js
[virtualenclavehandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveHandleApprovalDeletionSample.js
[virtualenclavelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveListByResourceGroupSample.js
[virtualenclavelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveListBySubscriptionSample.js
[virtualenclaveupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/virtualEnclaveUpdateSample.js
[workloadcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/workloadCreateOrUpdateSample.js
[workloaddeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/workloadDeleteSample.js
[workloadgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/workloadGetSample.js
[workloadlistbyenclaveresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/workloadListByEnclaveResourceSample.js
[workloadlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/workloadListBySubscriptionSample.js
[workloadupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/virtualenclaves/arm-virtualenclaves/samples/v1-beta/javascript/workloadUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-virtualenclaves?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/virtualenclaves/arm-virtualenclaves/README.md
