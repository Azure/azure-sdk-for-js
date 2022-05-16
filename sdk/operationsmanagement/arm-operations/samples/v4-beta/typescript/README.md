# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [managementAssociationsCreateOrUpdateSample.ts][managementassociationscreateorupdatesample]             | Creates or updates the ManagementAssociation. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationCreate.json                                            |
| [managementAssociationsDeleteSample.ts][managementassociationsdeletesample]                             | Deletes the ManagementAssociation in the subscription. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationDelete.json                                   |
| [managementAssociationsGetSample.ts][managementassociationsgetsample]                                   | Retrieves the user ManagementAssociation. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationGet.json                                                   |
| [managementAssociationsListBySubscriptionSample.ts][managementassociationslistbysubscriptionsample]     | Retrieves the ManagementAssociations list. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementAssociationListForSubscription.json                                  |
| [managementConfigurationsCreateOrUpdateSample.ts][managementconfigurationscreateorupdatesample]         | Creates or updates the ManagementConfiguration. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationCreate.json                                        |
| [managementConfigurationsDeleteSample.ts][managementconfigurationsdeletesample]                         | Deletes the ManagementConfiguration in the subscription. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationDelete.json                               |
| [managementConfigurationsGetSample.ts][managementconfigurationsgetsample]                               | Retrieves the user ManagementConfiguration. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationGet.json                                               |
| [managementConfigurationsListBySubscriptionSample.ts][managementconfigurationslistbysubscriptionsample] | Retrieves the ManagementConfigurations list. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/ManagementConfigurationListForSubscription.json                              |
| [operationsListSample.ts][operationslistsample]                                                         | Lists all of the available OperationsManagement Rest API operations. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/OperationsList.json                                  |
| [solutionsCreateOrUpdateSample.ts][solutionscreateorupdatesample]                                       | Creates or updates the Solution. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionCreate.json                                                                      |
| [solutionsDeleteSample.ts][solutionsdeletesample]                                                       | Deletes the solution in the subscription. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionDelete.json                                                             |
| [solutionsGetSample.ts][solutionsgetsample]                                                             | Retrieves the user solution. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionGet.json                                                                             |
| [solutionsListByResourceGroupSample.ts][solutionslistbyresourcegroupsample]                             | Retrieves the solution list. It will retrieve both first party and third party solutions x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionList.json                |
| [solutionsListBySubscriptionSample.ts][solutionslistbysubscriptionsample]                               | Retrieves the solution list. It will retrieve both first party and third party solutions x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionListForSubscription.json |
| [solutionsUpdateSample.ts][solutionsupdatesample]                                                       | Patch a Solution. Only updating tags supported. x-ms-original-file: specification/operationsmanagement/resource-manager/Microsoft.OperationsManagement/preview/2015-11-01-preview/examples/SolutionUpdate.json                                                       |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/managementAssociationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/managementAssociationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[managementassociationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementAssociationsCreateOrUpdateSample.ts
[managementassociationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementAssociationsDeleteSample.ts
[managementassociationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementAssociationsGetSample.ts
[managementassociationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementAssociationsListBySubscriptionSample.ts
[managementconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementConfigurationsCreateOrUpdateSample.ts
[managementconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementConfigurationsDeleteSample.ts
[managementconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementConfigurationsGetSample.ts
[managementconfigurationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/managementConfigurationsListBySubscriptionSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/operationsListSample.ts
[solutionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/solutionsCreateOrUpdateSample.ts
[solutionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/solutionsDeleteSample.ts
[solutionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/solutionsGetSample.ts
[solutionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/solutionsListByResourceGroupSample.ts
[solutionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/solutionsListBySubscriptionSample.ts
[solutionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/operationsmanagement/arm-operations/samples/v4-beta/typescript/src/solutionsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-operations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/operationsmanagement/arm-operations/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
