# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentStacksCreateOrUpdateAtManagementGroupSample.ts][deploymentstackscreateorupdateatmanagementgroupsample] | Creates or updates a Deployment stack at Management Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupCreate.json                                                                         |
| [deploymentStacksCreateOrUpdateAtResourceGroupSample.ts][deploymentstackscreateorupdateatresourcegroupsample]     | Creates or updates a Deployment stack at Resource Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupCreate.json                                                                             |
| [deploymentStacksCreateOrUpdateAtSubscriptionSample.ts][deploymentstackscreateorupdateatsubscriptionsample]       | Creates or updates a Deployment stack at Subscription scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionCreate.json                                                                                |
| [deploymentStacksDeleteAtManagementGroupSample.ts][deploymentstacksdeleteatmanagementgroupsample]                 | Deletes a Deployment stack by name at Management Group scope. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupDelete.json        |
| [deploymentStacksDeleteAtResourceGroupSample.ts][deploymentstacksdeleteatresourcegroupsample]                     | Deletes a Deployment stack by name at Resource Group scope. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupDelete.json            |
| [deploymentStacksDeleteAtSubscriptionSample.ts][deploymentstacksdeleteatsubscriptionsample]                       | Deletes a Deployment stack by name at Subscription scope. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionDelete.json               |
| [deploymentStacksExportTemplateAtManagementGroupSample.ts][deploymentstacksexporttemplateatmanagementgroupsample] | Exports the template used to create the Deployment stack at Management Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupExportTemplate.json                                              |
| [deploymentStacksExportTemplateAtResourceGroupSample.ts][deploymentstacksexporttemplateatresourcegroupsample]     | Exports the template used to create the Deployment stack at Resource Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackExportTemplate.json                                                               |
| [deploymentStacksExportTemplateAtSubscriptionSample.ts][deploymentstacksexporttemplateatsubscriptionsample]       | Exports the template used to create the Deployment stack at Subscription scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionExportTemplate.json                                                     |
| [deploymentStacksGetAtManagementGroupSample.ts][deploymentstacksgetatmanagementgroupsample]                       | Gets a Deployment stack with a given name at Management Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupGet.json                                                                        |
| [deploymentStacksGetAtResourceGroupSample.ts][deploymentstacksgetatresourcegroupsample]                           | Gets a Deployment stack with a given name at Resource Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupGet.json                                                                            |
| [deploymentStacksGetAtSubscriptionSample.ts][deploymentstacksgetatsubscriptionsample]                             | Gets a Deployment stack with a given name at Subscription scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionGet.json                                                                               |
| [deploymentStacksListAtManagementGroupSample.ts][deploymentstackslistatmanagementgroupsample]                     | Lists all the Deployment stacks within the specified Management Group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupList.json                                                                     |
| [deploymentStacksListAtResourceGroupSample.ts][deploymentstackslistatresourcegroupsample]                         | Lists all the Deployment stacks within the specified Resource Group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupList.json                                                                         |
| [deploymentStacksListAtSubscriptionSample.ts][deploymentstackslistatsubscriptionsample]                           | Lists all the Deployment stacks within the specified Subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionList.json                                                                            |
| [deploymentStacksValidateStackAtManagementGroupSample.ts][deploymentstacksvalidatestackatmanagementgroupsample]   | Runs preflight validation on the Management Group scoped Deployment stack template to verify its acceptance to Azure Resource Manager. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupValidate.json |
| [deploymentStacksValidateStackAtResourceGroupSample.ts][deploymentstacksvalidatestackatresourcegroupsample]       | Runs preflight validation on the Resource Group scoped Deployment stack template to verify its acceptance to Azure Resource Manager. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupValidate.json     |
| [deploymentStacksValidateStackAtSubscriptionSample.ts][deploymentstacksvalidatestackatsubscriptionsample]         | Runs preflight validation on the Subscription scoped Deployment stack template to verify its acceptance to Azure Resource Manager. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionValidate.json        |

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
cross-env node dist/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentstackscreateorupdateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksCreateOrUpdateAtManagementGroupSample.ts
[deploymentstackscreateorupdateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksCreateOrUpdateAtResourceGroupSample.ts
[deploymentstackscreateorupdateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksCreateOrUpdateAtSubscriptionSample.ts
[deploymentstacksdeleteatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksDeleteAtManagementGroupSample.ts
[deploymentstacksdeleteatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksDeleteAtResourceGroupSample.ts
[deploymentstacksdeleteatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksDeleteAtSubscriptionSample.ts
[deploymentstacksexporttemplateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksExportTemplateAtManagementGroupSample.ts
[deploymentstacksexporttemplateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksExportTemplateAtResourceGroupSample.ts
[deploymentstacksexporttemplateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksExportTemplateAtSubscriptionSample.ts
[deploymentstacksgetatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksGetAtManagementGroupSample.ts
[deploymentstacksgetatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksGetAtResourceGroupSample.ts
[deploymentstacksgetatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksGetAtSubscriptionSample.ts
[deploymentstackslistatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksListAtManagementGroupSample.ts
[deploymentstackslistatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksListAtResourceGroupSample.ts
[deploymentstackslistatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksListAtSubscriptionSample.ts
[deploymentstacksvalidatestackatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksValidateStackAtManagementGroupSample.ts
[deploymentstacksvalidatestackatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksValidateStackAtResourceGroupSample.ts
[deploymentstacksvalidatestackatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/typescript/src/deploymentStacksValidateStackAtSubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcesdeploymentstacks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
