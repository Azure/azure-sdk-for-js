# @azure/arm-onlineexperimentation client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-onlineexperimentation in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [onlineExperimentWorkspacesCreateOrUpdateSample.js][onlineexperimentworkspacescreateorupdatesample]           | create an experiment workspace, or update an existing workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_CreateOrUpdate.json   |
| [onlineExperimentWorkspacesDeleteSample.js][onlineexperimentworkspacesdeletesample]                           | deletes an experiment workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Delete.json                                           |
| [onlineExperimentWorkspacesGetSample.js][onlineexperimentworkspacesgetsample]                                 | gets an experiment workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Get.json                                                 |
| [onlineExperimentWorkspacesListByResourceGroupSample.js][onlineexperimentworkspaceslistbyresourcegroupsample] | gets all experiment workspaces in a resource group. x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_ListByResourceGroup.json          |
| [onlineExperimentWorkspacesListBySubscriptionSample.js][onlineexperimentworkspaceslistbysubscriptionsample]   | gets all experiment workspaces in the specified subscription. x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_ListBySubscription.json |
| [onlineExperimentWorkspacesUpdateSample.js][onlineexperimentworkspacesupdatesample]                           | patch an experiment workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Update.json                                             |
| [operationsListSample.js][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_OperationsList.json                              |

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
node onlineExperimentWorkspacesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node onlineExperimentWorkspacesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[onlineexperimentworkspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/onlineExperimentWorkspacesCreateOrUpdateSample.js
[onlineexperimentworkspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/onlineExperimentWorkspacesDeleteSample.js
[onlineexperimentworkspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/onlineExperimentWorkspacesGetSample.js
[onlineexperimentworkspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/onlineExperimentWorkspacesListByResourceGroupSample.js
[onlineexperimentworkspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/onlineExperimentWorkspacesListBySubscriptionSample.js
[onlineexperimentworkspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/onlineExperimentWorkspacesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-onlineexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/arm-onlineexperimentation/README.md
