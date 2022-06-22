# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.js][accountscreateorupdatesample]           | Creates or updates a team account with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateAccount.json                                      |
| [accountsDeleteSample.js][accountsdeletesample]                           | Deletes a machine learning team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteAccount.json                                                              |
| [accountsGetSample.js][accountsgetsample]                                 | Gets the properties of the specified machine learning team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetAccount.json                                      |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample] | Lists all the available machine learning team accounts under the specified resource group. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListAccountResourceGroup.json |
| [accountsListSample.js][accountslistsample]                               | Lists all the available machine learning team accounts under the specified subscription. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListAccount.json                |
| [accountsUpdateSample.js][accountsupdatesample]                           | Updates a machine learning team account with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateAccount.json                                |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]           | Creates or updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/CreateProject.json                                           |
| [projectsDeleteSample.js][projectsdeletesample]                           | Deletes a project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/DeleteProject.json                                                                                    |
| [projectsGetSample.js][projectsgetsample]                                 | Gets the properties of the specified machine learning project. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/GetProject.json                                           |
| [projectsListByWorkspaceSample.js][projectslistbyworkspacesample]         | Lists all the available machine learning projects under the specified workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ProjectListByWorkspaces.json            |
| [projectsUpdateSample.js][projectsupdatesample]                           | Updates a project with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/UpdateProject.json                                                      |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]       | Creates or updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceCreate.json                      |
| [workspacesDeleteSample.js][workspacesdeletesample]                       | Deletes a machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceDelete.json                                                               |
| [workspacesGetSample.js][workspacesgetsample]                             | Gets the properties of the specified machine learning workspace. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceGet.json                                       |
| [workspacesListByAccountsSample.js][workspaceslistbyaccountssample]       | Lists all the available machine learning workspaces under the specified team account. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/ListWorkspacesByAccounts.json      |
| [workspacesUpdateSample.js][workspacesupdatesample]                       | Updates a machine learning workspace with the specified parameters. x-ms-original-file: specification/machinelearningexperimentation/resource-manager/Microsoft.MachineLearningExperimentation/preview/2017-05-01-preview/examples/WorkspaceUpdate.json                                 |

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
node accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountsCreateOrUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountsDeleteSample.js
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountsGetSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountsListByResourceGroupSample.js
[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountsListSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/accountsUpdateSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/projectsDeleteSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/projectsGetSample.js
[projectslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/projectsListByWorkspaceSample.js
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/projectsUpdateSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspacesGetSample.js
[workspaceslistbyaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspacesListByAccountsSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/samples/v2-beta/javascript/workspacesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-machinelearningexperimentation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearningexperimentation/arm-machinelearningexperimentation/README.md
