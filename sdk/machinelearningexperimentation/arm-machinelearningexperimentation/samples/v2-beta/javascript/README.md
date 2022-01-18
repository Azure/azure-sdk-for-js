# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                           | **Description**                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountCreate.js][accountcreate]                       | Deletes a project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteProject.json                                                                               |
| [accountGet.js][accountget]                             | Gets the properties of the specified machine learning team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetAccount.json                                 |
| [accountUpdate.js][accountupdate]                       | Updates a machine learning team account with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateAccount.json                           |
| [createProject.js][createproject]                       | Creates or updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateProject.json                                      |
| [getProject.js][getproject]                             | Gets the properties of the specified machine learning project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetProject.json                                      |
| [listWorkspacesByAccounts.js][listworkspacesbyaccounts] | Lists all the available machine learning workspaces under the specified team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListWorkspacesByAccounts.json |
| [projectListByWorkspaces.js][projectlistbyworkspaces]   | Lists all the available machine learning projects under the specified workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ProjectListByWorkspaces.json       |
| [updateProject.js][updateproject]                       | Updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateProject.json                                                 |
| [workspaceCreate.js][workspacecreate]                   | Creates or updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceCreate.json                 |
| [workspaceDelete.js][workspacedelete]                   | Deletes a machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceDelete.json                                                          |
| [workspaceGet.js][workspaceget]                         | Gets the properties of the specified machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceGet.json                                  |
| [workspaceUpdate.js][workspaceupdate]                   | Updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceUpdate.json                            |

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
node accountCreate.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node accountCreate.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountcreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountCreate.js
[accountget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountGet.js
[accountupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountUpdate.js
[createproject]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/createProject.js
[getproject]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/getProject.js
[listworkspacesbyaccounts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/listWorkspacesByAccounts.js
[projectlistbyworkspaces]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/projectListByWorkspaces.js
[updateproject]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/updateProject.js
[workspacecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspaceCreate.js
[workspacedelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspaceDelete.js
[workspaceget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspaceGet.js
[workspaceupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspaceUpdate.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-machinelearningexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/README.md
