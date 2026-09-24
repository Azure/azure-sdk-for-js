# @azure/arm-deviceregistrysoftwareupdate client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-deviceregistrysoftwareupdate in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                             | list the operations for the provider x-ms-original-file: 2026-11-02-preview/Operations_List.json                                                                 |
| [updateInstancesCheckNameAvailabilitySample.js][updateinstanceschecknameavailabilitysample] | check if the Update Instance name is available. x-ms-original-file: 2026-11-02-preview/UpdateInstances_CheckNameAvailability.json                                |
| [updateInstancesCreateSample.js][updateinstancescreatesample]                               | creates or updates an Update Instance. x-ms-original-file: 2026-11-02-preview/UpdateInstances_Create.json                                                        |
| [updateInstancesDeleteSample.js][updateinstancesdeletesample]                               | deletes an update instance. x-ms-original-file: 2026-11-02-preview/UpdateInstances_Delete.json                                                                   |
| [updateInstancesGetSample.js][updateinstancesgetsample]                                     | returns update instance details for the given update instance name. x-ms-original-file: 2026-11-02-preview/UpdateInstances_Get.json                              |
| [updateInstancesLinkInitiateSample.js][updateinstanceslinkinitiatesample]                   | initiate account linking. Validates and persists binding, sets linkingState=InProgress. x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkInitiate.json |
| [updateInstancesLinkNotifySample.js][updateinstanceslinknotifysample]                       | notify linking state change (commit, fail, or namespaceDeleted). x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkNotify.json                          |
| [updateInstancesLinkPreflightSample.js][updateinstanceslinkpreflightsample]                 | preflight check for account linking readiness. No state change. x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkPreflight.json                        |
| [updateInstancesLinkUpdateSample.js][updateinstanceslinkupdatesample]                       | update linking properties (e.g., identity rotation). x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkUpdate.json                                      |
| [updateInstancesListByResourceGroupSample.js][updateinstanceslistbyresourcegroupsample]     | returns list of Update Instances. x-ms-original-file: 2026-11-02-preview/UpdateInstances_ListByResourceGroup.json                                                |
| [updateInstancesListBySubscriptionSample.js][updateinstanceslistbysubscriptionsample]       | returns list of Update Instances. x-ms-original-file: 2026-11-02-preview/UpdateInstances_ListBySubscription.json                                                 |
| [updateInstancesUpdateSample.js][updateinstancesupdatesample]                               | updates update instance's patchable properties. x-ms-original-file: 2026-11-02-preview/UpdateInstances_Update.json                                               |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/operationsListSample.js
[updateinstanceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesCheckNameAvailabilitySample.js
[updateinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesCreateSample.js
[updateinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesDeleteSample.js
[updateinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesGetSample.js
[updateinstanceslinkinitiatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesLinkInitiateSample.js
[updateinstanceslinknotifysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesLinkNotifySample.js
[updateinstanceslinkpreflightsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesLinkPreflightSample.js
[updateinstanceslinkupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesLinkUpdateSample.js
[updateinstanceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesListByResourceGroupSample.js
[updateinstanceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesListBySubscriptionSample.js
[updateinstancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/samples/v1-beta/javascript/updateInstancesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceregistrysoftwareupdate?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistrysoftwareupdate/README.md
