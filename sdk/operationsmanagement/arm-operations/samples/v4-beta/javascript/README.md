# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [managementAssociationsCreateOrUpdateSample.js][managementassociationscreateorupdatesample]             | Creates or updates the ManagementAssociation. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationCreate.json                                            |
| [managementAssociationsDeleteSample.js][managementassociationsdeletesample]                             | Deletes the ManagementAssociation in the subscription. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationDelete.json                                   |
| [managementAssociationsGetSample.js][managementassociationsgetsample]                                   | Retrieves the user ManagementAssociation. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationGet.json                                                   |
| [managementAssociationsListBySubscriptionSample.js][managementassociationslistbysubscriptionsample]     | Retrieves the ManagementAssociations list. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationListForSubscription.json                                  |
| [managementConfigurationsCreateOrUpdateSample.js][managementconfigurationscreateorupdatesample]         | Creates or updates the ManagementConfiguration. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationCreate.json                                        |
| [managementConfigurationsDeleteSample.js][managementconfigurationsdeletesample]                         | Deletes the ManagementConfiguration in the subscription. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationDelete.json                               |
| [managementConfigurationsGetSample.js][managementconfigurationsgetsample]                               | Retrieves the user ManagementConfiguration. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationGet.json                                               |
| [managementConfigurationsListBySubscriptionSample.js][managementconfigurationslistbysubscriptionsample] | Retrieves the ManagementConfigurations list. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationListForSubscription.json                              |
| [operationsListSample.js][operationslistsample]                                                         | Lists all of the available OperationsManagement Rest API operations. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/OperationsList.json                                  |
| [solutionsCreateOrUpdateSample.js][solutionscreateorupdatesample]                                       | Creates or updates the Solution. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionCreate.json                                                                      |
| [solutionsDeleteSample.js][solutionsdeletesample]                                                       | Deletes the solution in the subscription. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionDelete.json                                                             |
| [solutionsGetSample.js][solutionsgetsample]                                                             | Retrieves the user solution. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionGet.json                                                                             |
| [solutionsListByResourceGroupSample.js][solutionslistbyresourcegroupsample]                             | Retrieves the solution list. It will retrieve both first party and third party solutions x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionList.json                |
| [solutionsListBySubscriptionSample.js][solutionslistbysubscriptionsample]                               | Retrieves the solution list. It will retrieve both first party and third party solutions x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionListForSubscription.json |
| [solutionsUpdateSample.js][solutionsupdatesample]                                                       | Patch a Solution. Only updating tags supported. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionUpdate.json                                                       |

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
node managementAssociationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node managementAssociationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[managementassociationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementAssociationsCreateOrUpdateSample.js
[managementassociationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementAssociationsDeleteSample.js
[managementassociationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementAssociationsGetSample.js
[managementassociationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementAssociationsListBySubscriptionSample.js
[managementconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementConfigurationsCreateOrUpdateSample.js
[managementconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementConfigurationsDeleteSample.js
[managementconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementConfigurationsGetSample.js
[managementconfigurationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/managementConfigurationsListBySubscriptionSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/operationsListSample.js
[solutionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/solutionsCreateOrUpdateSample.js
[solutionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/solutionsDeleteSample.js
[solutionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/solutionsGetSample.js
[solutionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/solutionsListByResourceGroupSample.js
[solutionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/solutionsListBySubscriptionSample.js
[solutionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/javascript/solutionsUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-operations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/operationsmanagement/arm-operations/README.md
