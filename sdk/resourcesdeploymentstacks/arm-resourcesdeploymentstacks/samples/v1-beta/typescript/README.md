# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentStacksCreateOrUpdateAtManagementGroupSample.ts][deploymentstackscreateorupdateatmanagementgroupsample] | Creates or updates a Deployment Stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupCreate.json                                                                  |
| [deploymentStacksCreateOrUpdateAtResourceGroupSample.ts][deploymentstackscreateorupdateatresourcegroupsample]     | Creates or updates a Deployment Stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupCreate.json                                                                    |
| [deploymentStacksCreateOrUpdateAtSubscriptionSample.ts][deploymentstackscreateorupdateatsubscriptionsample]       | Creates or updates a Deployment Stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionCreate.json                                                                     |
| [deploymentStacksDeleteAtManagementGroupSample.ts][deploymentstacksdeleteatmanagementgroupsample]                 | Deletes a Deployment Stack by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupDelete.json |
| [deploymentStacksDeleteAtResourceGroupSample.ts][deploymentstacksdeleteatresourcegroupsample]                     | Deletes a Deployment Stack by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupDelete.json   |
| [deploymentStacksDeleteAtSubscriptionSample.ts][deploymentstacksdeleteatsubscriptionsample]                       | Deletes a Deployment Stack by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionDelete.json    |
| [deploymentStacksExportTemplateAtManagementGroupSample.ts][deploymentstacksexporttemplateatmanagementgroupsample] | Exports the template used to create the deployment stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupExportTemplate.json                                       |
| [deploymentStacksExportTemplateAtResourceGroupSample.ts][deploymentstacksexporttemplateatresourcegroupsample]     | Exports the template used to create the deployment stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackExportTemplate.json                                                      |
| [deploymentStacksExportTemplateAtSubscriptionSample.ts][deploymentstacksexporttemplateatsubscriptionsample]       | Exports the template used to create the deployment stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionExportTemplate.json                                          |
| [deploymentStacksGetAtManagementGroupSample.ts][deploymentstacksgetatmanagementgroupsample]                       | Gets a Deployment Stack with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupGet.json                                                                 |
| [deploymentStacksGetAtResourceGroupSample.ts][deploymentstacksgetatresourcegroupsample]                           | Gets a Deployment Stack with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupGet.json                                                                   |
| [deploymentStacksGetAtSubscriptionSample.ts][deploymentstacksgetatsubscriptionsample]                             | Gets a Deployment Stack with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionGet.json                                                                    |
| [deploymentStacksListAtManagementGroupSample.ts][deploymentstackslistatmanagementgroupsample]                     | Lists all the Deployment Stacks within the specified management group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupList.json                                    |
| [deploymentStacksListAtResourceGroupSample.ts][deploymentstackslistatresourcegroupsample]                         | Lists all the Deployment Stacks within the specified resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupList.json                                        |
| [deploymentStacksListAtSubscriptionSample.ts][deploymentstackslistatsubscriptionsample]                           | Lists all the Deployment Stacks within the specified subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionList.json                                           |

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
node dist/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentstackscreateorupdateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksCreateOrUpdateAtManagementGroupSample.ts
[deploymentstackscreateorupdateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksCreateOrUpdateAtResourceGroupSample.ts
[deploymentstackscreateorupdateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksCreateOrUpdateAtSubscriptionSample.ts
[deploymentstacksdeleteatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksDeleteAtManagementGroupSample.ts
[deploymentstacksdeleteatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksDeleteAtResourceGroupSample.ts
[deploymentstacksdeleteatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksDeleteAtSubscriptionSample.ts
[deploymentstacksexporttemplateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksExportTemplateAtManagementGroupSample.ts
[deploymentstacksexporttemplateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksExportTemplateAtResourceGroupSample.ts
[deploymentstacksexporttemplateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksExportTemplateAtSubscriptionSample.ts
[deploymentstacksgetatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksGetAtManagementGroupSample.ts
[deploymentstacksgetatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksGetAtResourceGroupSample.ts
[deploymentstacksgetatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksGetAtSubscriptionSample.ts
[deploymentstackslistatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksListAtManagementGroupSample.ts
[deploymentstackslistatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksListAtResourceGroupSample.ts
[deploymentstackslistatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/typescript/src/deploymentStacksListAtSubscriptionSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcesdeploymentstacks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
