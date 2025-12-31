# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentStacksCreateOrUpdateAtManagementGroupSample.js][deploymentstackscreateorupdateatmanagementgroupsample] | Creates or updates a Deployment stack at Management Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupCreate.json                                                                         |
| [deploymentStacksCreateOrUpdateAtResourceGroupSample.js][deploymentstackscreateorupdateatresourcegroupsample]     | Creates or updates a Deployment stack at Resource Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupCreate.json                                                                             |
| [deploymentStacksCreateOrUpdateAtSubscriptionSample.js][deploymentstackscreateorupdateatsubscriptionsample]       | Creates or updates a Deployment stack at Subscription scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionCreate.json                                                                                |
| [deploymentStacksDeleteAtManagementGroupSample.js][deploymentstacksdeleteatmanagementgroupsample]                 | Deletes a Deployment stack by name at Management Group scope. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupDelete.json        |
| [deploymentStacksDeleteAtResourceGroupSample.js][deploymentstacksdeleteatresourcegroupsample]                     | Deletes a Deployment stack by name at Resource Group scope. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupDelete.json            |
| [deploymentStacksDeleteAtSubscriptionSample.js][deploymentstacksdeleteatsubscriptionsample]                       | Deletes a Deployment stack by name at Subscription scope. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionDelete.json               |
| [deploymentStacksExportTemplateAtManagementGroupSample.js][deploymentstacksexporttemplateatmanagementgroupsample] | Exports the template used to create the Deployment stack at Management Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupExportTemplate.json                                              |
| [deploymentStacksExportTemplateAtResourceGroupSample.js][deploymentstacksexporttemplateatresourcegroupsample]     | Exports the template used to create the Deployment stack at Resource Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackExportTemplate.json                                                               |
| [deploymentStacksExportTemplateAtSubscriptionSample.js][deploymentstacksexporttemplateatsubscriptionsample]       | Exports the template used to create the Deployment stack at Subscription scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionExportTemplate.json                                                     |
| [deploymentStacksGetAtManagementGroupSample.js][deploymentstacksgetatmanagementgroupsample]                       | Gets a Deployment stack with a given name at Management Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupGet.json                                                                        |
| [deploymentStacksGetAtResourceGroupSample.js][deploymentstacksgetatresourcegroupsample]                           | Gets a Deployment stack with a given name at Resource Group scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupGet.json                                                                            |
| [deploymentStacksGetAtSubscriptionSample.js][deploymentstacksgetatsubscriptionsample]                             | Gets a Deployment stack with a given name at Subscription scope. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionGet.json                                                                               |
| [deploymentStacksListAtManagementGroupSample.js][deploymentstackslistatmanagementgroupsample]                     | Lists all the Deployment stacks within the specified Management Group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupList.json                                                                     |
| [deploymentStacksListAtResourceGroupSample.js][deploymentstackslistatresourcegroupsample]                         | Lists all the Deployment stacks within the specified Resource Group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupList.json                                                                         |
| [deploymentStacksListAtSubscriptionSample.js][deploymentstackslistatsubscriptionsample]                           | Lists all the Deployment stacks within the specified Subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionList.json                                                                            |
| [deploymentStacksValidateStackAtManagementGroupSample.js][deploymentstacksvalidatestackatmanagementgroupsample]   | Runs preflight validation on the Management Group scoped Deployment stack template to verify its acceptance to Azure Resource Manager. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackManagementGroupValidate.json |
| [deploymentStacksValidateStackAtResourceGroupSample.js][deploymentstacksvalidatestackatresourcegroupsample]       | Runs preflight validation on the Resource Group scoped Deployment stack template to verify its acceptance to Azure Resource Manager. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackResourceGroupValidate.json     |
| [deploymentStacksValidateStackAtSubscriptionSample.js][deploymentstacksvalidatestackatsubscriptionsample]         | Runs preflight validation on the Subscription scoped Deployment stack template to verify its acceptance to Azure Resource Manager. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/stable/2024-03-01/examples/DeploymentStackSubscriptionValidate.json        |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentstackscreateorupdateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
[deploymentstackscreateorupdateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksCreateOrUpdateAtResourceGroupSample.js
[deploymentstackscreateorupdateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksCreateOrUpdateAtSubscriptionSample.js
[deploymentstacksdeleteatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksDeleteAtManagementGroupSample.js
[deploymentstacksdeleteatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksDeleteAtResourceGroupSample.js
[deploymentstacksdeleteatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksDeleteAtSubscriptionSample.js
[deploymentstacksexporttemplateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksExportTemplateAtManagementGroupSample.js
[deploymentstacksexporttemplateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksExportTemplateAtResourceGroupSample.js
[deploymentstacksexporttemplateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksExportTemplateAtSubscriptionSample.js
[deploymentstacksgetatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksGetAtManagementGroupSample.js
[deploymentstacksgetatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksGetAtResourceGroupSample.js
[deploymentstacksgetatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksGetAtSubscriptionSample.js
[deploymentstackslistatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksListAtManagementGroupSample.js
[deploymentstackslistatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksListAtResourceGroupSample.js
[deploymentstackslistatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksListAtSubscriptionSample.js
[deploymentstacksvalidatestackatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksValidateStackAtManagementGroupSample.js
[deploymentstacksvalidatestackatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksValidateStackAtResourceGroupSample.js
[deploymentstacksvalidatestackatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1/javascript/deploymentStacksValidateStackAtSubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-resourcesdeploymentstacks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/README.md
