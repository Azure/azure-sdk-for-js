# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]           | Creates or updates a team account with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateAccount.json                                      |
| [accountsDeleteSample.ts][accountsdeletesample]                           | Deletes a machine learning team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteAccount.json                                                              |
| [accountsGetSample.ts][accountsgetsample]                                 | Gets the properties of the specified machine learning team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetAccount.json                                      |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample] | Lists all the available machine learning team accounts under the specified resource group. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListAccountResourceGroup.json |
| [accountsListSample.ts][accountslistsample]                               | Lists all the available machine learning team accounts under the specified subscription. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListAccount.json                |
| [accountsUpdateSample.ts][accountsupdatesample]                           | Updates a machine learning team account with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateAccount.json                                |
| [projectsCreateOrUpdateSample.ts][projectscreateorupdatesample]           | Creates or updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateProject.json                                           |
| [projectsDeleteSample.ts][projectsdeletesample]                           | Deletes a project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteProject.json                                                                                    |
| [projectsGetSample.ts][projectsgetsample]                                 | Gets the properties of the specified machine learning project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetProject.json                                           |
| [projectsListByWorkspaceSample.ts][projectslistbyworkspacesample]         | Lists all the available machine learning projects under the specified workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ProjectListByWorkspaces.json            |
| [projectsUpdateSample.ts][projectsupdatesample]                           | Updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateProject.json                                                      |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]       | Creates or updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceCreate.json                      |
| [workspacesDeleteSample.ts][workspacesdeletesample]                       | Deletes a machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceDelete.json                                                               |
| [workspacesGetSample.ts][workspacesgetsample]                             | Gets the properties of the specified machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceGet.json                                       |
| [workspacesListByAccountsSample.ts][workspaceslistbyaccountssample]       | Lists all the available machine learning workspaces under the specified team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListWorkspacesByAccounts.json      |
| [workspacesUpdateSample.ts][workspacesupdatesample]                       | Updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceUpdate.json                                 |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountsListSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountsUpdateSample.ts
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/projectsCreateOrUpdateSample.ts
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/projectsDeleteSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/projectsGetSample.ts
[projectslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/projectsListByWorkspaceSample.ts
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/projectsUpdateSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspacesListByAccountsSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-machinelearningexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
