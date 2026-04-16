# @azure/arm-resourcesdeploymentstacks client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-resourcesdeploymentstacks in some common scenarios.

| **File Name**                                                                                                                               | **Description**                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentStacksCreateOrUpdateAtManagementGroupSample.ts][deploymentstackscreateorupdateatmanagementgroupsample]                           | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupCreate.json                                                                               |
| [deploymentStacksCreateOrUpdateAtResourceGroupSample.ts][deploymentstackscreateorupdateatresourcegroupsample]                               | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupCreate.json                                                                                 |
| [deploymentStacksCreateOrUpdateAtSubscriptionSample.ts][deploymentstackscreateorupdateatsubscriptionsample]                                 | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionCreate.json                                                                                  |
| [deploymentStacksDeleteAtManagementGroupSample.ts][deploymentstacksdeleteatmanagementgroupsample]                                           | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupDelete.json              |
| [deploymentStacksDeleteAtResourceGroupSample.ts][deploymentstacksdeleteatresourcegroupsample]                                               | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupDelete.json                |
| [deploymentStacksDeleteAtSubscriptionSample.ts][deploymentstacksdeleteatsubscriptionsample]                                                 | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionDelete.json                 |
| [deploymentStacksExportTemplateAtManagementGroupSample.ts][deploymentstacksexporttemplateatmanagementgroupsample]                           | exports the template used to create the Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupExportTemplate.json                                                    |
| [deploymentStacksExportTemplateAtResourceGroupSample.ts][deploymentstacksexporttemplateatresourcegroupsample]                               | exports the template used to create the Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackExportTemplate.json                                                                   |
| [deploymentStacksExportTemplateAtSubscriptionSample.ts][deploymentstacksexporttemplateatsubscriptionsample]                                 | exports the template used to create the Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionExportTemplate.json                                                       |
| [deploymentStacksGetAtManagementGroupSample.ts][deploymentstacksgetatmanagementgroupsample]                                                 | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupGet.json                                                                                                 |
| [deploymentStacksGetAtResourceGroupSample.ts][deploymentstacksgetatresourcegroupsample]                                                     | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupGet.json                                                                                                   |
| [deploymentStacksGetAtSubscriptionSample.ts][deploymentstacksgetatsubscriptionsample]                                                       | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionGet.json                                                                                                    |
| [deploymentStacksListAtManagementGroupSample.ts][deploymentstackslistatmanagementgroupsample]                                               | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupList.json                                                                                               |
| [deploymentStacksListAtResourceGroupSample.ts][deploymentstackslistatresourcegroupsample]                                                   | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupList.json                                                                                                 |
| [deploymentStacksListAtSubscriptionSample.ts][deploymentstackslistatsubscriptionsample]                                                     | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionList.json                                                                                                  |
| [deploymentStacksValidateStackAtManagementGroupSample.ts][deploymentstacksvalidatestackatmanagementgroupsample]                             | runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupValidate.json     |
| [deploymentStacksValidateStackAtResourceGroupSample.ts][deploymentstacksvalidatestackatresourcegroupsample]                                 | runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupValidate.json       |
| [deploymentStacksValidateStackAtSubscriptionSample.ts][deploymentstacksvalidatestackatsubscriptionsample]                                   | runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionValidate.json        |
| [deploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateSample.ts][deploymentstackswhatifresultsatmanagementgroupcreateorupdatesample] | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupCreate.json                                                                  |
| [deploymentStacksWhatIfResultsAtManagementGroupDeleteSample.ts][deploymentstackswhatifresultsatmanagementgroupdeletesample]                 | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupDelete.json |
| [deploymentStacksWhatIfResultsAtManagementGroupGetSample.ts][deploymentstackswhatifresultsatmanagementgroupgetsample]                       | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupGet.json                                                                                    |
| [deploymentStacksWhatIfResultsAtManagementGroupListSample.ts][deploymentstackswhatifresultsatmanagementgrouplistsample]                     | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupList.json                                                                                  |
| [deploymentStacksWhatIfResultsAtManagementGroupWhatIfSample.ts][deploymentstackswhatifresultsatmanagementgroupwhatifsample]                 | returns property-level changes that will be made by the deployment if executed. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupWhatIf.json                                                |
| [deploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateSample.ts][deploymentstackswhatifresultsatresourcegroupcreateorupdatesample]     | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupCreate.json                                                                    |
| [deploymentStacksWhatIfResultsAtResourceGroupDeleteSample.ts][deploymentstackswhatifresultsatresourcegroupdeletesample]                     | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupDelete.json   |
| [deploymentStacksWhatIfResultsAtResourceGroupGetSample.ts][deploymentstackswhatifresultsatresourcegroupgetsample]                           | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupGet.json                                                                                      |
| [deploymentStacksWhatIfResultsAtResourceGroupListSample.ts][deploymentstackswhatifresultsatresourcegrouplistsample]                         | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupList.json                                                                                    |
| [deploymentStacksWhatIfResultsAtResourceGroupWhatIfSample.ts][deploymentstackswhatifresultsatresourcegroupwhatifsample]                     | returns property-level changes that will be made by the deployment if executed. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupWhatIf.json                                                  |
| [deploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateSample.ts][deploymentstackswhatifresultsatsubscriptioncreateorupdatesample]       | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionCreate.json                                                                     |
| [deploymentStacksWhatIfResultsAtSubscriptionDeleteSample.ts][deploymentstackswhatifresultsatsubscriptiondeletesample]                       | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionDelete.json    |
| [deploymentStacksWhatIfResultsAtSubscriptionGetSample.ts][deploymentstackswhatifresultsatsubscriptiongetsample]                             | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionGet.json                                                                                       |
| [deploymentStacksWhatIfResultsAtSubscriptionListSample.ts][deploymentstackswhatifresultsatsubscriptionlistsample]                           | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionList.json                                                                                     |
| [deploymentStacksWhatIfResultsAtSubscriptionWhatIfSample.ts][deploymentstackswhatifresultsatsubscriptionwhatifsample]                       | returns property-level changes that will be made by the deployment if executed. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionWhatIf.json                                                   |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentstackscreateorupdateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksCreateOrUpdateAtManagementGroupSample.ts
[deploymentstackscreateorupdateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksCreateOrUpdateAtResourceGroupSample.ts
[deploymentstackscreateorupdateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksCreateOrUpdateAtSubscriptionSample.ts
[deploymentstacksdeleteatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksDeleteAtManagementGroupSample.ts
[deploymentstacksdeleteatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksDeleteAtResourceGroupSample.ts
[deploymentstacksdeleteatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksDeleteAtSubscriptionSample.ts
[deploymentstacksexporttemplateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksExportTemplateAtManagementGroupSample.ts
[deploymentstacksexporttemplateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksExportTemplateAtResourceGroupSample.ts
[deploymentstacksexporttemplateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksExportTemplateAtSubscriptionSample.ts
[deploymentstacksgetatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksGetAtManagementGroupSample.ts
[deploymentstacksgetatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksGetAtResourceGroupSample.ts
[deploymentstacksgetatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksGetAtSubscriptionSample.ts
[deploymentstackslistatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksListAtManagementGroupSample.ts
[deploymentstackslistatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksListAtResourceGroupSample.ts
[deploymentstackslistatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksListAtSubscriptionSample.ts
[deploymentstacksvalidatestackatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksValidateStackAtManagementGroupSample.ts
[deploymentstacksvalidatestackatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksValidateStackAtResourceGroupSample.ts
[deploymentstacksvalidatestackatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksValidateStackAtSubscriptionSample.ts
[deploymentstackswhatifresultsatmanagementgroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateSample.ts
[deploymentstackswhatifresultsatmanagementgroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtManagementGroupDeleteSample.ts
[deploymentstackswhatifresultsatmanagementgroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtManagementGroupGetSample.ts
[deploymentstackswhatifresultsatmanagementgrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtManagementGroupListSample.ts
[deploymentstackswhatifresultsatmanagementgroupwhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtManagementGroupWhatIfSample.ts
[deploymentstackswhatifresultsatresourcegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateSample.ts
[deploymentstackswhatifresultsatresourcegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtResourceGroupDeleteSample.ts
[deploymentstackswhatifresultsatresourcegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtResourceGroupGetSample.ts
[deploymentstackswhatifresultsatresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtResourceGroupListSample.ts
[deploymentstackswhatifresultsatresourcegroupwhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtResourceGroupWhatIfSample.ts
[deploymentstackswhatifresultsatsubscriptioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateSample.ts
[deploymentstackswhatifresultsatsubscriptiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtSubscriptionDeleteSample.ts
[deploymentstackswhatifresultsatsubscriptiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtSubscriptionGetSample.ts
[deploymentstackswhatifresultsatsubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtSubscriptionListSample.ts
[deploymentstackswhatifresultsatsubscriptionwhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/typescript/src/deploymentStacksWhatIfResultsAtSubscriptionWhatIfSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcesdeploymentstacks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
