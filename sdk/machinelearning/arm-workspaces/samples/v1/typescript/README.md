# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                               | **Description**                                                                                                                                                                                                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [listWorkspaceKeys.ts][listworkspacekeys]                   | List the authorization keys associated with this workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaceKeys.json                                      |
| [resyncStorageKeys.ts][resyncstoragekeys]                   | Resync storage keys associated with this workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ResyncStorageKeys.json                                              |
| [workspaceCreate.ts][workspacecreate]                       | Creates or updates a workspace with the specified parameters. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/CreateWorkspace.json                                      |
| [workspaceDelete.ts][workspacedelete]                       | Deletes a machine learning workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/DeleteWorkspace.json                                                              |
| [workspaceGet.ts][workspaceget]                             | Gets the properties of the specified machine learning workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/GetWorkspace.json                                      |
| [workspaceGetBySubscription.ts][workspacegetbysubscription] | Lists all the available machine learning workspaces under the specified subscription. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaces.json               |
| [workspaceListResourceGroup.ts][workspacelistresourcegroup] | Lists all the available machine learning workspaces under the specified resource group. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaceResourceGroup.json |
| [workspaceUpdate.ts][workspaceupdate]                       | Updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/UpdateWorkspace.json                                |

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
node dist/listWorkspaceKeys.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/listWorkspaceKeys.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[listworkspacekeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/listWorkspaceKeys.ts
[resyncstoragekeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/resyncStorageKeys.ts
[workspacecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/workspaceCreate.ts
[workspacedelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/workspaceDelete.ts
[workspaceget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/workspaceGet.ts
[workspacegetbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/workspaceGetBySubscription.ts
[workspacelistresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/workspaceListResourceGroup.ts
[workspaceupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/typescript/src/workspaceUpdate.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-workspaces?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearning/arm-workspaces/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
