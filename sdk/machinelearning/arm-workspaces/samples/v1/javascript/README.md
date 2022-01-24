# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                               | **Description**                                                                                                                                                                                                                                 |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [listWorkspaceKeys.js][listworkspacekeys]                   | List the authorization keys associated with this workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaceKeys.json                                      |
| [resyncStorageKeys.js][resyncstoragekeys]                   | Resync storage keys associated with this workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ResyncStorageKeys.json                                              |
| [workspaceCreate.js][workspacecreate]                       | Creates or updates a workspace with the specified parameters. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/CreateWorkspace.json                                      |
| [workspaceDelete.js][workspacedelete]                       | Deletes a machine learning workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/DeleteWorkspace.json                                                              |
| [workspaceGet.js][workspaceget]                             | Gets the properties of the specified machine learning workspace. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/GetWorkspace.json                                      |
| [workspaceGetBySubscription.js][workspacegetbysubscription] | Lists all the available machine learning workspaces under the specified subscription. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaces.json               |
| [workspaceListResourceGroup.js][workspacelistresourcegroup] | Lists all the available machine learning workspaces under the specified resource group. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/ListWorkspaceResourceGroup.json |
| [workspaceUpdate.js][workspaceupdate]                       | Updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearning/resource-manager/Microsoft.MachineLearning/stable/2019-10-01/examples/UpdateWorkspace.json                                |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node listWorkspaceKeys.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node listWorkspaceKeys.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[listworkspacekeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/listWorkspaceKeys.js
[resyncstoragekeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/resyncStorageKeys.js
[workspacecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/workspaceCreate.js
[workspacedelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/workspaceDelete.js
[workspaceget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/workspaceGet.js
[workspacegetbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/workspaceGetBySubscription.js
[workspacelistresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/workspaceListResourceGroup.js
[workspaceupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearning/arm-workspaces/samples/v1/javascript/workspaceUpdate.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-workspaces?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearning/arm-workspaces/README.md
