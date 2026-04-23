# @azure/arm-resourcesdeploymentstacks client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-resourcesdeploymentstacks in some common scenarios.

| **File Name**                                                                                                                               | **Description**                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentStacksCreateOrUpdateAtManagementGroupSample.js][deploymentstackscreateorupdateatmanagementgroupsample]                           | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupCreate.json                                                                               |
| [deploymentStacksCreateOrUpdateAtResourceGroupSample.js][deploymentstackscreateorupdateatresourcegroupsample]                               | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupCreate.json                                                                                 |
| [deploymentStacksCreateOrUpdateAtSubscriptionSample.js][deploymentstackscreateorupdateatsubscriptionsample]                                 | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionCreate.json                                                                                  |
| [deploymentStacksDeleteAtManagementGroupSample.js][deploymentstacksdeleteatmanagementgroupsample]                                           | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupDelete.json              |
| [deploymentStacksDeleteAtResourceGroupSample.js][deploymentstacksdeleteatresourcegroupsample]                                               | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupDelete.json                |
| [deploymentStacksDeleteAtSubscriptionSample.js][deploymentstacksdeleteatsubscriptionsample]                                                 | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionDelete.json                 |
| [deploymentStacksExportTemplateAtManagementGroupSample.js][deploymentstacksexporttemplateatmanagementgroupsample]                           | exports the template used to create the Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupExportTemplate.json                                                    |
| [deploymentStacksExportTemplateAtResourceGroupSample.js][deploymentstacksexporttemplateatresourcegroupsample]                               | exports the template used to create the Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackExportTemplate.json                                                                   |
| [deploymentStacksExportTemplateAtSubscriptionSample.js][deploymentstacksexporttemplateatsubscriptionsample]                                 | exports the template used to create the Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionExportTemplate.json                                                       |
| [deploymentStacksGetAtManagementGroupSample.js][deploymentstacksgetatmanagementgroupsample]                                                 | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupGet.json                                                                                                 |
| [deploymentStacksGetAtResourceGroupSample.js][deploymentstacksgetatresourcegroupsample]                                                     | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupGet.json                                                                                                   |
| [deploymentStacksGetAtSubscriptionSample.js][deploymentstacksgetatsubscriptionsample]                                                       | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionGet.json                                                                                                    |
| [deploymentStacksListAtManagementGroupSample.js][deploymentstackslistatmanagementgroupsample]                                               | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupList.json                                                                                               |
| [deploymentStacksListAtResourceGroupSample.js][deploymentstackslistatresourcegroupsample]                                                   | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupList.json                                                                                                 |
| [deploymentStacksListAtSubscriptionSample.js][deploymentstackslistatsubscriptionsample]                                                     | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionList.json                                                                                                  |
| [deploymentStacksValidateStackAtManagementGroupSample.js][deploymentstacksvalidatestackatmanagementgroupsample]                             | runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. x-ms-original-file: 2025-07-01/DeploymentStackManagementGroupValidate.json     |
| [deploymentStacksValidateStackAtResourceGroupSample.js][deploymentstacksvalidatestackatresourcegroupsample]                                 | runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. x-ms-original-file: 2025-07-01/DeploymentStackResourceGroupValidate.json       |
| [deploymentStacksValidateStackAtSubscriptionSample.js][deploymentstacksvalidatestackatsubscriptionsample]                                   | runs preflight validation on the Deployment stack template at the specified scope to verify its acceptance to Azure Resource Manager. x-ms-original-file: 2025-07-01/DeploymentStackSubscriptionValidate.json        |
| [deploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateSample.js][deploymentstackswhatifresultsatmanagementgroupcreateorupdatesample] | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupCreate.json                                                                  |
| [deploymentStacksWhatIfResultsAtManagementGroupDeleteSample.js][deploymentstackswhatifresultsatmanagementgroupdeletesample]                 | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupDelete.json |
| [deploymentStacksWhatIfResultsAtManagementGroupGetSample.js][deploymentstackswhatifresultsatmanagementgroupgetsample]                       | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupGet.json                                                                                    |
| [deploymentStacksWhatIfResultsAtManagementGroupListSample.js][deploymentstackswhatifresultsatmanagementgrouplistsample]                     | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupList.json                                                                                  |
| [deploymentStacksWhatIfResultsAtManagementGroupWhatIfSample.js][deploymentstackswhatifresultsatmanagementgroupwhatifsample]                 | returns property-level changes that will be made by the deployment if executed. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsManagementGroupWhatIf.json                                                |
| [deploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateSample.js][deploymentstackswhatifresultsatresourcegroupcreateorupdatesample]     | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupCreate.json                                                                    |
| [deploymentStacksWhatIfResultsAtResourceGroupDeleteSample.js][deploymentstackswhatifresultsatresourcegroupdeletesample]                     | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupDelete.json   |
| [deploymentStacksWhatIfResultsAtResourceGroupGetSample.js][deploymentstackswhatifresultsatresourcegroupgetsample]                           | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupGet.json                                                                                      |
| [deploymentStacksWhatIfResultsAtResourceGroupListSample.js][deploymentstackswhatifresultsatresourcegrouplistsample]                         | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupList.json                                                                                    |
| [deploymentStacksWhatIfResultsAtResourceGroupWhatIfSample.js][deploymentstackswhatifresultsatresourcegroupwhatifsample]                     | returns property-level changes that will be made by the deployment if executed. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsResourceGroupWhatIf.json                                                  |
| [deploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateSample.js][deploymentstackswhatifresultsatsubscriptioncreateorupdatesample]       | creates or updates a Deployment stack at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionCreate.json                                                                     |
| [deploymentStacksWhatIfResultsAtSubscriptionDeleteSample.js][deploymentstackswhatifresultsatsubscriptiondeletesample]                       | deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionDelete.json    |
| [deploymentStacksWhatIfResultsAtSubscriptionGetSample.js][deploymentstackswhatifresultsatsubscriptiongetsample]                             | gets the Deployment stack with the given name. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionGet.json                                                                                       |
| [deploymentStacksWhatIfResultsAtSubscriptionListSample.js][deploymentstackswhatifresultsatsubscriptionlistsample]                           | lists Deployment stacks at the specified scope. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionList.json                                                                                     |
| [deploymentStacksWhatIfResultsAtSubscriptionWhatIfSample.js][deploymentstackswhatifresultsatsubscriptionwhatifsample]                       | returns property-level changes that will be made by the deployment if executed. x-ms-original-file: 2025-07-01/DeploymentStackWhatIfResultsSubscriptionWhatIf.json                                                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentstackscreateorupdateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
[deploymentstackscreateorupdateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksCreateOrUpdateAtResourceGroupSample.js
[deploymentstackscreateorupdateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksCreateOrUpdateAtSubscriptionSample.js
[deploymentstacksdeleteatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksDeleteAtManagementGroupSample.js
[deploymentstacksdeleteatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksDeleteAtResourceGroupSample.js
[deploymentstacksdeleteatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksDeleteAtSubscriptionSample.js
[deploymentstacksexporttemplateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksExportTemplateAtManagementGroupSample.js
[deploymentstacksexporttemplateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksExportTemplateAtResourceGroupSample.js
[deploymentstacksexporttemplateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksExportTemplateAtSubscriptionSample.js
[deploymentstacksgetatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksGetAtManagementGroupSample.js
[deploymentstacksgetatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksGetAtResourceGroupSample.js
[deploymentstacksgetatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksGetAtSubscriptionSample.js
[deploymentstackslistatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksListAtManagementGroupSample.js
[deploymentstackslistatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksListAtResourceGroupSample.js
[deploymentstackslistatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksListAtSubscriptionSample.js
[deploymentstacksvalidatestackatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksValidateStackAtManagementGroupSample.js
[deploymentstacksvalidatestackatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksValidateStackAtResourceGroupSample.js
[deploymentstacksvalidatestackatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksValidateStackAtSubscriptionSample.js
[deploymentstackswhatifresultsatmanagementgroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateSample.js
[deploymentstackswhatifresultsatmanagementgroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtManagementGroupDeleteSample.js
[deploymentstackswhatifresultsatmanagementgroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtManagementGroupGetSample.js
[deploymentstackswhatifresultsatmanagementgrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtManagementGroupListSample.js
[deploymentstackswhatifresultsatmanagementgroupwhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtManagementGroupWhatIfSample.js
[deploymentstackswhatifresultsatresourcegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateSample.js
[deploymentstackswhatifresultsatresourcegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtResourceGroupDeleteSample.js
[deploymentstackswhatifresultsatresourcegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtResourceGroupGetSample.js
[deploymentstackswhatifresultsatresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtResourceGroupListSample.js
[deploymentstackswhatifresultsatresourcegroupwhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtResourceGroupWhatIfSample.js
[deploymentstackswhatifresultsatsubscriptioncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateSample.js
[deploymentstackswhatifresultsatsubscriptiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtSubscriptionDeleteSample.js
[deploymentstackswhatifresultsatsubscriptiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtSubscriptionGetSample.js
[deploymentstackswhatifresultsatsubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtSubscriptionListSample.js
[deploymentstackswhatifresultsatsubscriptionwhatifsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v2/javascript/deploymentStacksWhatIfResultsAtSubscriptionWhatIfSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcesdeploymentstacks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/README.md
