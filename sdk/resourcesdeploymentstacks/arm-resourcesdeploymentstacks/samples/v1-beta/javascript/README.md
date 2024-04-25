# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deploymentStacksCreateOrUpdateAtManagementGroupSample.js][deploymentstackscreateorupdateatmanagementgroupsample] | Creates or updates a Deployment Stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupCreate.json                                                                  |
| [deploymentStacksCreateOrUpdateAtResourceGroupSample.js][deploymentstackscreateorupdateatresourcegroupsample]     | Creates or updates a Deployment Stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupCreate.json                                                                    |
| [deploymentStacksCreateOrUpdateAtSubscriptionSample.js][deploymentstackscreateorupdateatsubscriptionsample]       | Creates or updates a Deployment Stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionCreate.json                                                                     |
| [deploymentStacksDeleteAtManagementGroupSample.js][deploymentstacksdeleteatmanagementgroupsample]                 | Deletes a Deployment Stack by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupDelete.json |
| [deploymentStacksDeleteAtResourceGroupSample.js][deploymentstacksdeleteatresourcegroupsample]                     | Deletes a Deployment Stack by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupDelete.json   |
| [deploymentStacksDeleteAtSubscriptionSample.js][deploymentstacksdeleteatsubscriptionsample]                       | Deletes a Deployment Stack by name. When operation completes, status code 200 returned without content. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionDelete.json    |
| [deploymentStacksExportTemplateAtManagementGroupSample.js][deploymentstacksexporttemplateatmanagementgroupsample] | Exports the template used to create the deployment stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupExportTemplate.json                                       |
| [deploymentStacksExportTemplateAtResourceGroupSample.js][deploymentstacksexporttemplateatresourcegroupsample]     | Exports the template used to create the deployment stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackExportTemplate.json                                                      |
| [deploymentStacksExportTemplateAtSubscriptionSample.js][deploymentstacksexporttemplateatsubscriptionsample]       | Exports the template used to create the deployment stack. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionExportTemplate.json                                          |
| [deploymentStacksGetAtManagementGroupSample.js][deploymentstacksgetatmanagementgroupsample]                       | Gets a Deployment Stack with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupGet.json                                                                 |
| [deploymentStacksGetAtResourceGroupSample.js][deploymentstacksgetatresourcegroupsample]                           | Gets a Deployment Stack with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupGet.json                                                                   |
| [deploymentStacksGetAtSubscriptionSample.js][deploymentstacksgetatsubscriptionsample]                             | Gets a Deployment Stack with a given name. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionGet.json                                                                    |
| [deploymentStacksListAtManagementGroupSample.js][deploymentstackslistatmanagementgroupsample]                     | Lists all the Deployment Stacks within the specified management group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackManagementGroupList.json                                    |
| [deploymentStacksListAtResourceGroupSample.js][deploymentstackslistatresourcegroupsample]                         | Lists all the Deployment Stacks within the specified resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackResourceGroupList.json                                        |
| [deploymentStacksListAtSubscriptionSample.js][deploymentstackslistatsubscriptionsample]                           | Lists all the Deployment Stacks within the specified subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Resources/preview/2022-08-01-preview/examples/DeploymentStackSubscriptionList.json                                           |

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
npx cross-env  node deploymentStacksCreateOrUpdateAtManagementGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deploymentstackscreateorupdateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksCreateOrUpdateAtManagementGroupSample.js
[deploymentstackscreateorupdateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksCreateOrUpdateAtResourceGroupSample.js
[deploymentstackscreateorupdateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksCreateOrUpdateAtSubscriptionSample.js
[deploymentstacksdeleteatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksDeleteAtManagementGroupSample.js
[deploymentstacksdeleteatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksDeleteAtResourceGroupSample.js
[deploymentstacksdeleteatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksDeleteAtSubscriptionSample.js
[deploymentstacksexporttemplateatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksExportTemplateAtManagementGroupSample.js
[deploymentstacksexporttemplateatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksExportTemplateAtResourceGroupSample.js
[deploymentstacksexporttemplateatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksExportTemplateAtSubscriptionSample.js
[deploymentstacksgetatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksGetAtManagementGroupSample.js
[deploymentstacksgetatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksGetAtResourceGroupSample.js
[deploymentstacksgetatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksGetAtSubscriptionSample.js
[deploymentstackslistatmanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksListAtManagementGroupSample.js
[deploymentstackslistatresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksListAtResourceGroupSample.js
[deploymentstackslistatsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/samples/v1-beta/javascript/deploymentStacksListAtSubscriptionSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcesdeploymentstacks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcesdeploymentstacks/arm-resourcesdeploymentstacks/README.md
