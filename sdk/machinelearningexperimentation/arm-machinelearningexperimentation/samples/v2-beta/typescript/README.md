# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                           | **Description**                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountCreate.ts][accountcreate]                       | Deletes a project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteProject.json                                                                               |
| [accountGet.ts][accountget]                             | Gets the properties of the specified machine learning team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetAccount.json                                 |
| [accountUpdate.ts][accountupdate]                       | Updates a machine learning team account with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateAccount.json                           |
| [createProject.ts][createproject]                       | Creates or updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateProject.json                                      |
| [getProject.ts][getproject]                             | Gets the properties of the specified machine learning project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetProject.json                                      |
| [listWorkspacesByAccounts.ts][listworkspacesbyaccounts] | Lists all the available machine learning workspaces under the specified team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListWorkspacesByAccounts.json |
| [projectListByWorkspaces.ts][projectlistbyworkspaces]   | Lists all the available machine learning projects under the specified workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ProjectListByWorkspaces.json       |
| [updateProject.ts][updateproject]                       | Updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateProject.json                                                 |
| [workspaceCreate.ts][workspacecreate]                   | Creates or updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceCreate.json                 |
| [workspaceDelete.ts][workspacedelete]                   | Deletes a machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceDelete.json                                                          |
| [workspaceGet.ts][workspaceget]                         | Gets the properties of the specified machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceGet.json                                  |
| [workspaceUpdate.ts][workspaceupdate]                   | Updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceUpdate.json                            |

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
node dist/accountCreate.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountCreate.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountcreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountCreate.ts
[accountget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountGet.ts
[accountupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/accountUpdate.ts
[createproject]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/createProject.ts
[getproject]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/getProject.ts
[listworkspacesbyaccounts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/listWorkspacesByAccounts.ts
[projectlistbyworkspaces]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/projectListByWorkspaces.ts
[updateproject]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/updateProject.ts
[workspacecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspaceCreate.ts
[workspacedelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspaceDelete.ts
[workspaceget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspaceGet.ts
[workspaceupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/typescript/src/workspaceUpdate.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-machinelearningexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
