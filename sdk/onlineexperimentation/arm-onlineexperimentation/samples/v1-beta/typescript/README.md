# @azure/arm-onlineexperimentation client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-onlineexperimentation in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [onlineExperimentWorkspacesCreateOrUpdateSample.ts][onlineexperimentworkspacescreateorupdatesample]           | create an experiment workspace, or update an existing workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_CreateOrUpdate.json   |
| [onlineExperimentWorkspacesDeleteSample.ts][onlineexperimentworkspacesdeletesample]                           | deletes an experiment workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Delete.json                                           |
| [onlineExperimentWorkspacesGetSample.ts][onlineexperimentworkspacesgetsample]                                 | gets an experiment workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Get.json                                                 |
| [onlineExperimentWorkspacesListByResourceGroupSample.ts][onlineexperimentworkspaceslistbyresourcegroupsample] | gets all experiment workspaces in a resource group. x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_ListByResourceGroup.json          |
| [onlineExperimentWorkspacesListBySubscriptionSample.ts][onlineexperimentworkspaceslistbysubscriptionsample]   | gets all experiment workspaces in the specified subscription. x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_ListBySubscription.json |
| [onlineExperimentWorkspacesUpdateSample.ts][onlineexperimentworkspacesupdatesample]                           | patch an experiment workspace x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_Update.json                                             |
| [operationsListSample.ts][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2025-05-31-preview/OnlineExperimentWorkspaces_OperationsList.json                              |

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
node dist/onlineExperimentWorkspacesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/onlineExperimentWorkspacesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[onlineexperimentworkspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentWorkspacesCreateOrUpdateSample.ts
[onlineexperimentworkspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentWorkspacesDeleteSample.ts
[onlineexperimentworkspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentWorkspacesGetSample.ts
[onlineexperimentworkspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentWorkspacesListByResourceGroupSample.ts
[onlineexperimentworkspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentWorkspacesListBySubscriptionSample.ts
[onlineexperimentworkspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentWorkspacesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-onlineexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/arm-onlineexperimentation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
