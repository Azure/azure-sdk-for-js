# @azure/arm-enclave client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-enclave in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approvalCreateOrUpdateSample.js][approvalcreateorupdatesample]                                       | create a ApprovalResource x-ms-original-file: 2026-04-01/Approvals_CreateOrUpdate.json                                                                            |
| [approvalDeleteSample.js][approvaldeletesample]                                                       | delete a ApprovalResource x-ms-original-file: 2026-04-01/Approvals_Delete.json                                                                                    |
| [approvalGetSample.js][approvalgetsample]                                                             | get a ApprovalResource x-ms-original-file: 2026-04-01/Approvals_Get.json                                                                                          |
| [approvalListByParentSample.js][approvallistbyparentsample]                                           | list ApprovalResource resources by parent x-ms-original-file: 2026-04-01/Approvals_ListByParent.json                                                              |
| [approvalNotifyInitiatorSample.js][approvalnotifyinitiatorsample]                                     | upon receiving approval or rejection from approver, this facilitates actions on approval resource x-ms-original-file: 2026-04-01/Approvals_NotifyInitiator.json   |
| [approvalUpdateSample.js][approvalupdatesample]                                                       | update a ApprovalResource x-ms-original-file: 2026-04-01/Approvals_Update.json                                                                                    |
| [communityCheckAddressSpaceAvailabilitySample.js][communitycheckaddressspaceavailabilitysample]       | checks that the IP Address Space to be allocated for this Community is available. x-ms-original-file: 2026-04-01/Community_PostCheckAddressSpaceAvailability.json |
| [communityCreateOrUpdateSample.js][communitycreateorupdatesample]                                     | create a CommunityResource x-ms-original-file: 2026-04-01/Community_CreateOrUpdate.json                                                                           |
| [communityDeleteSample.js][communitydeletesample]                                                     | delete a CommunityResource x-ms-original-file: 2026-04-01/Community_Delete.json                                                                                   |
| [communityEndpointsCreateOrUpdateSample.js][communityendpointscreateorupdatesample]                   | create a CommunityEndpointResource x-ms-original-file: 2026-04-01/CommunityEndpoints_CreateOrUpdate.json                                                          |
| [communityEndpointsDeleteSample.js][communityendpointsdeletesample]                                   | delete a CommunityEndpointResource x-ms-original-file: 2026-04-01/CommunityEndpoints_Delete.json                                                                  |
| [communityEndpointsGetSample.js][communityendpointsgetsample]                                         | get a CommunityEndpointResource x-ms-original-file: 2026-04-01/CommunityEndpoints_Get.json                                                                        |
| [communityEndpointsHandleApprovalCreationSample.js][communityendpointshandleapprovalcreationsample]   | callback that triggers on approval state change. x-ms-original-file: 2026-04-01/CommunityEndpoints_HandleApprovalCreation.json                                    |
| [communityEndpointsHandleApprovalDeletionSample.js][communityendpointshandleapprovaldeletionsample]   | callback that triggers on approval deletion state change. x-ms-original-file: 2026-04-01/CommunityEndpoints_HandleApprovalDeletion.json                           |
| [communityEndpointsListByCommunityResourceSample.js][communityendpointslistbycommunityresourcesample] | list CommunityEndpointResource resources by CommunityResource x-ms-original-file: 2026-04-01/CommunityEndpoints_ListByCommunityResource.json                      |
| [communityEndpointsListBySubscriptionSample.js][communityendpointslistbysubscriptionsample]           | list CommunityEndpointResource resources by subscription ID x-ms-original-file: 2026-04-01/CommunityEndpoints_ListBySubscription.json                             |
| [communityEndpointsUpdateSample.js][communityendpointsupdatesample]                                   | update a CommunityEndpointResource x-ms-original-file: 2026-04-01/CommunityEndpoints_Update.json                                                                  |
| [communityGetSample.js][communitygetsample]                                                           | get a CommunityResource x-ms-original-file: 2026-04-01/Community_Get.json                                                                                         |
| [communityListByResourceGroupSample.js][communitylistbyresourcegroupsample]                           | list CommunityResource resources by resource group x-ms-original-file: 2026-04-01/Community_ListByResourceGroup.json                                              |
| [communityListBySubscriptionSample.js][communitylistbysubscriptionsample]                             | list CommunityResource resources by subscription ID x-ms-original-file: 2026-04-01/Community_ListBySubscription.json                                              |
| [communityUpdateSample.js][communityupdatesample]                                                     | update a CommunityResource x-ms-original-file: 2026-04-01/Community_Update.json                                                                                   |
| [dedicatedHubCreateOrUpdateSample.js][dedicatedhubcreateorupdatesample]                               | create a DedicatedHubResource x-ms-original-file: 2026-04-01/DedicatedHubs_CreateOrUpdate.json                                                                    |
| [dedicatedHubDeleteSample.js][dedicatedhubdeletesample]                                               | delete a DedicatedHubResource x-ms-original-file: 2026-04-01/DedicatedHubs_Delete.json                                                                            |
| [dedicatedHubGetSample.js][dedicatedhubgetsample]                                                     | get a DedicatedHubResource x-ms-original-file: 2026-04-01/DedicatedHubs_Get.json                                                                                  |
| [dedicatedHubListByCommunityResourceSample.js][dedicatedhublistbycommunityresourcesample]             | list DedicatedHubResource resources by CommunityResource x-ms-original-file: 2026-04-01/DedicatedHubs_ListByCommunityResource.json                                |
| [dedicatedHubListBySubscriptionSample.js][dedicatedhublistbysubscriptionsample]                       | list DedicatedHubResource resources by subscription ID x-ms-original-file: 2026-04-01/DedicatedHubs_ListBySubscription.json                                       |
| [dedicatedHubUpdateSample.js][dedicatedhubupdatesample]                                               | update a DedicatedHubResource x-ms-original-file: 2026-04-01/DedicatedHubs_Update.json                                                                            |
| [enclaveConnectionCreateOrUpdateSample.js][enclaveconnectioncreateorupdatesample]                     | create a EnclaveConnectionResource x-ms-original-file: 2026-04-01/EnclaveConnection_CreateOrUpdate.json                                                           |
| [enclaveConnectionDeleteSample.js][enclaveconnectiondeletesample]                                     | delete a EnclaveConnectionResource x-ms-original-file: 2026-04-01/EnclaveConnection_Delete.json                                                                   |
| [enclaveConnectionGetSample.js][enclaveconnectiongetsample]                                           | get a EnclaveConnectionResource x-ms-original-file: 2026-04-01/EnclaveConnection_Get.json                                                                         |
| [enclaveConnectionHandleApprovalCreationSample.js][enclaveconnectionhandleapprovalcreationsample]     | callback that triggers on approval state change. x-ms-original-file: 2026-04-01/EnclaveConnection_HandleApprovalCreation.json                                     |
| [enclaveConnectionHandleApprovalDeletionSample.js][enclaveconnectionhandleapprovaldeletionsample]     | callback that triggers on approval deletion state change. x-ms-original-file: 2026-04-01/EnclaveConnection_HandleApprovalDeletion.json                            |
| [enclaveConnectionListByResourceGroupSample.js][enclaveconnectionlistbyresourcegroupsample]           | list EnclaveConnectionResource resources by resource group x-ms-original-file: 2026-04-01/EnclaveConnection_ListByResourceGroup.json                              |
| [enclaveConnectionListBySubscriptionSample.js][enclaveconnectionlistbysubscriptionsample]             | list EnclaveConnectionResource resources by subscription ID x-ms-original-file: 2026-04-01/EnclaveConnection_ListBySubscription.json                              |
| [enclaveConnectionUpdateSample.js][enclaveconnectionupdatesample]                                     | update a EnclaveConnectionResource x-ms-original-file: 2026-04-01/EnclaveConnection_Update.json                                                                   |
| [enclaveEndpointsCreateOrUpdateSample.js][enclaveendpointscreateorupdatesample]                       | create a EnclaveEndpointResource x-ms-original-file: 2026-04-01/EnclaveEndpoints_CreateOrUpdate.json                                                              |
| [enclaveEndpointsDeleteSample.js][enclaveendpointsdeletesample]                                       | delete a EnclaveEndpointResource x-ms-original-file: 2026-04-01/EnclaveEndpoints_Delete.json                                                                      |
| [enclaveEndpointsGetSample.js][enclaveendpointsgetsample]                                             | get a EnclaveEndpointResource x-ms-original-file: 2026-04-01/EnclaveEndpoints_Get.json                                                                            |
| [enclaveEndpointsHandleApprovalCreationSample.js][enclaveendpointshandleapprovalcreationsample]       | callback that triggers on approval state change. x-ms-original-file: 2026-04-01/EnclaveEndpoints_HandleApprovalCreation.json                                      |
| [enclaveEndpointsHandleApprovalDeletionSample.js][enclaveendpointshandleapprovaldeletionsample]       | callback that triggers on approval deletion state change. x-ms-original-file: 2026-04-01/EnclaveEndpoints_HandleApprovalDeletion.json                             |
| [enclaveEndpointsListByEnclaveResourceSample.js][enclaveendpointslistbyenclaveresourcesample]         | list EnclaveEndpointResource resources by EnclaveResource x-ms-original-file: 2026-04-01/EnclaveEndpoints_ListByEnclaveResource.json                              |
| [enclaveEndpointsListBySubscriptionSample.js][enclaveendpointslistbysubscriptionsample]               | list EnclaveEndpointResource resources by subscription ID x-ms-original-file: 2026-04-01/EnclaveEndpoints_ListBySubscription.json                                 |
| [enclaveEndpointsUpdateSample.js][enclaveendpointsupdatesample]                                       | update a EnclaveEndpointResource x-ms-original-file: 2026-04-01/EnclaveEndpoints_Update.json                                                                      |
| [operationsListSample.js][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2026-04-01/Operations_List.json                                                                          |
| [transitHubCreateOrUpdateSample.js][transithubcreateorupdatesample]                                   | create a TransitHubResource x-ms-original-file: 2026-04-01/TransitHub_CreateOrUpdate.json                                                                         |
| [transitHubDeleteSample.js][transithubdeletesample]                                                   | delete a TransitHubResource x-ms-original-file: 2026-04-01/TransitHub_Delete.json                                                                                 |
| [transitHubGetSample.js][transithubgetsample]                                                         | get a TransitHubResource x-ms-original-file: 2026-04-01/TransitHub_Get.json                                                                                       |
| [transitHubListByCommunityResourceSample.js][transithublistbycommunityresourcesample]                 | list TransitHubResource resources by CommunityResource x-ms-original-file: 2026-04-01/TransitHub_ListByCommunityResource.json                                     |
| [transitHubListBySubscriptionSample.js][transithublistbysubscriptionsample]                           | list TransitHubResource resources by subscription ID x-ms-original-file: 2026-04-01/TransitHub_ListBySubscription.json                                            |
| [transitHubUpdateSample.js][transithubupdatesample]                                                   | update a TransitHubResource x-ms-original-file: 2026-04-01/TransitHub_Update.json                                                                                 |
| [virtualEnclaveCreateOrUpdateSample.js][virtualenclavecreateorupdatesample]                           | create a EnclaveResource x-ms-original-file: 2026-04-01/VirtualEnclave_CreateOrUpdate.json                                                                        |
| [virtualEnclaveDeleteSample.js][virtualenclavedeletesample]                                           | delete a EnclaveResource x-ms-original-file: 2026-04-01/VirtualEnclave_Delete.json                                                                                |
| [virtualEnclaveGetSample.js][virtualenclavegetsample]                                                 | get a EnclaveResource x-ms-original-file: 2026-04-01/VirtualEnclave_Get.json                                                                                      |
| [virtualEnclaveHandleApprovalCreationSample.js][virtualenclavehandleapprovalcreationsample]           | callback that triggers on approval state change. x-ms-original-file: 2026-04-01/VirtualEnclave_HandleApprovalCreation.json                                        |
| [virtualEnclaveHandleApprovalDeletionSample.js][virtualenclavehandleapprovaldeletionsample]           | callback that triggers on approval deletion state change. x-ms-original-file: 2026-04-01/VirtualEnclave_HandleApprovalDeletion.json                               |
| [virtualEnclaveListByResourceGroupSample.js][virtualenclavelistbyresourcegroupsample]                 | list EnclaveResource resources by resource group x-ms-original-file: 2026-04-01/VirtualEnclave_ListByResourceGroup.json                                           |
| [virtualEnclaveListBySubscriptionSample.js][virtualenclavelistbysubscriptionsample]                   | list EnclaveResource resources by subscription ID x-ms-original-file: 2026-04-01/VirtualEnclave_ListBySubscription.json                                           |
| [virtualEnclaveUpdateSample.js][virtualenclaveupdatesample]                                           | update a EnclaveResource x-ms-original-file: 2026-04-01/VirtualEnclave_Update.json                                                                                |
| [workloadCreateOrUpdateSample.js][workloadcreateorupdatesample]                                       | create a WorkloadResource x-ms-original-file: 2026-04-01/Workload_CreateOrUpdate.json                                                                             |
| [workloadDeleteSample.js][workloaddeletesample]                                                       | delete a WorkloadResource x-ms-original-file: 2026-04-01/Workload_Delete.json                                                                                     |
| [workloadGetSample.js][workloadgetsample]                                                             | get a WorkloadResource x-ms-original-file: 2026-04-01/Workload_Get.json                                                                                           |
| [workloadListByEnclaveResourceSample.js][workloadlistbyenclaveresourcesample]                         | list WorkloadResource resources by EnclaveResource x-ms-original-file: 2026-04-01/Workload_ListByEnclaveResource.json                                             |
| [workloadListBySubscriptionSample.js][workloadlistbysubscriptionsample]                               | list WorkloadResource resources by subscription ID x-ms-original-file: 2026-04-01/Workload_ListBySubscription.json                                                |
| [workloadUpdateSample.js][workloadupdatesample]                                                       | update a WorkloadResource x-ms-original-file: 2026-04-01/Workload_Update.json                                                                                     |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node approvalCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approvalcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/approvalCreateOrUpdateSample.js
[approvaldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/approvalDeleteSample.js
[approvalgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/approvalGetSample.js
[approvallistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/approvalListByParentSample.js
[approvalnotifyinitiatorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/approvalNotifyInitiatorSample.js
[approvalupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/approvalUpdateSample.js
[communitycheckaddressspaceavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityCheckAddressSpaceAvailabilitySample.js
[communitycreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityCreateOrUpdateSample.js
[communitydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityDeleteSample.js
[communityendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsCreateOrUpdateSample.js
[communityendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsDeleteSample.js
[communityendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsGetSample.js
[communityendpointshandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsHandleApprovalCreationSample.js
[communityendpointshandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsHandleApprovalDeletionSample.js
[communityendpointslistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsListByCommunityResourceSample.js
[communityendpointslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsListBySubscriptionSample.js
[communityendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityEndpointsUpdateSample.js
[communitygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityGetSample.js
[communitylistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityListByResourceGroupSample.js
[communitylistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityListBySubscriptionSample.js
[communityupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/communityUpdateSample.js
[dedicatedhubcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/dedicatedHubCreateOrUpdateSample.js
[dedicatedhubdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/dedicatedHubDeleteSample.js
[dedicatedhubgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/dedicatedHubGetSample.js
[dedicatedhublistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/dedicatedHubListByCommunityResourceSample.js
[dedicatedhublistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/dedicatedHubListBySubscriptionSample.js
[dedicatedhubupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/dedicatedHubUpdateSample.js
[enclaveconnectioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionCreateOrUpdateSample.js
[enclaveconnectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionDeleteSample.js
[enclaveconnectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionGetSample.js
[enclaveconnectionhandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionHandleApprovalCreationSample.js
[enclaveconnectionhandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionHandleApprovalDeletionSample.js
[enclaveconnectionlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionListByResourceGroupSample.js
[enclaveconnectionlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionListBySubscriptionSample.js
[enclaveconnectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveConnectionUpdateSample.js
[enclaveendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsCreateOrUpdateSample.js
[enclaveendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsDeleteSample.js
[enclaveendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsGetSample.js
[enclaveendpointshandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsHandleApprovalCreationSample.js
[enclaveendpointshandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsHandleApprovalDeletionSample.js
[enclaveendpointslistbyenclaveresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsListByEnclaveResourceSample.js
[enclaveendpointslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsListBySubscriptionSample.js
[enclaveendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/enclaveEndpointsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/operationsListSample.js
[transithubcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/transitHubCreateOrUpdateSample.js
[transithubdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/transitHubDeleteSample.js
[transithubgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/transitHubGetSample.js
[transithublistbycommunityresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/transitHubListByCommunityResourceSample.js
[transithublistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/transitHubListBySubscriptionSample.js
[transithubupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/transitHubUpdateSample.js
[virtualenclavecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveCreateOrUpdateSample.js
[virtualenclavedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveDeleteSample.js
[virtualenclavegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveGetSample.js
[virtualenclavehandleapprovalcreationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveHandleApprovalCreationSample.js
[virtualenclavehandleapprovaldeletionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveHandleApprovalDeletionSample.js
[virtualenclavelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveListByResourceGroupSample.js
[virtualenclavelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveListBySubscriptionSample.js
[virtualenclaveupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/virtualEnclaveUpdateSample.js
[workloadcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/workloadCreateOrUpdateSample.js
[workloaddeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/workloadDeleteSample.js
[workloadgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/workloadGetSample.js
[workloadlistbyenclaveresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/workloadListByEnclaveResourceSample.js
[workloadlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/workloadListBySubscriptionSample.js
[workloadupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/enclave/arm-enclave/samples/v1/javascript/workloadUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-enclave
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/enclave/arm-enclave/README.md
