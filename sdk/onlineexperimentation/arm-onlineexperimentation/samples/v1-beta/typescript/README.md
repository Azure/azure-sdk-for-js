# @azure/arm-onlineexperimentation client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-onlineexperimentation in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [onlineExperimentationWorkspacesCreateOrUpdateSample.ts][onlineexperimentationworkspacescreateorupdatesample]           | create an online experimentation workspace, or update an existing workspace. x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_CreateOrUpdate.json  |
| [onlineExperimentationWorkspacesDeleteSample.ts][onlineexperimentationworkspacesdeletesample]                           | deletes an online experimentation workspace. x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_Delete.json                                          |
| [onlineExperimentationWorkspacesGetSample.ts][onlineexperimentationworkspacesgetsample]                                 | gets an online experimentation workspace. x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_Get.json                                                |
| [onlineExperimentationWorkspacesListByResourceGroupSample.ts][onlineexperimentationworkspaceslistbyresourcegroupsample] | gets all online experimentation workspaces in a resource group. x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_ListByResourceGroup.json          |
| [onlineExperimentationWorkspacesListBySubscriptionSample.ts][onlineexperimentationworkspaceslistbysubscriptionsample]   | gets all online experimentation workspaces in the specified subscription. x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_ListBySubscription.json |
| [onlineExperimentationWorkspacesUpdateSample.ts][onlineexperimentationworkspacesupdatesample]                           | patch an online experimentation workspace. x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_Update.json                                            |
| [operationsListSample.ts][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2025-05-31-preview/OnlineExperimentationWorkspaces_OperationsList.json                                          |

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
node dist/onlineExperimentationWorkspacesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/onlineExperimentationWorkspacesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[onlineexperimentationworkspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentationWorkspacesCreateOrUpdateSample.ts
[onlineexperimentationworkspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentationWorkspacesDeleteSample.ts
[onlineexperimentationworkspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentationWorkspacesGetSample.ts
[onlineexperimentationworkspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentationWorkspacesListByResourceGroupSample.ts
[onlineexperimentationworkspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentationWorkspacesListBySubscriptionSample.ts
[onlineexperimentationworkspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/onlineExperimentationWorkspacesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/onlineexperimentation/arm-onlineexperimentation/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-onlineexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/arm-onlineexperimentation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
