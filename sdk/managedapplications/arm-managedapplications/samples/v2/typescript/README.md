# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationDefinitionsCreateOrUpdateByIdSample.ts][applicationdefinitionscreateorupdatebyidsample]   | Creates a new managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplicationDefinition.json                                                  |
| [applicationDefinitionsCreateOrUpdateSample.ts][applicationdefinitionscreateorupdatesample]           | Creates a new managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplicationDefinition.json                                                  |
| [applicationDefinitionsDeleteByIdSample.ts][applicationdefinitionsdeletebyidsample]                   | Deletes the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplicationDefinition.json                                                            |
| [applicationDefinitionsDeleteSample.ts][applicationdefinitionsdeletesample]                           | Deletes the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplicationDefinition.json                                                            |
| [applicationDefinitionsGetByIdSample.ts][applicationdefinitionsgetbyidsample]                         | Gets the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplicationDefinition.json                                                                  |
| [applicationDefinitionsGetSample.ts][applicationdefinitionsgetsample]                                 | Gets the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplicationDefinition.json                                                                  |
| [applicationDefinitionsListByResourceGroupSample.ts][applicationdefinitionslistbyresourcegroupsample] | Lists the managed application definitions in a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listApplicationDefinitionsByResourceGroup.json                           |
| [applicationsCreateOrUpdateByIdSample.ts][applicationscreateorupdatebyidsample]                       | Creates a new managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplicationById.json                                                                   |
| [applicationsCreateOrUpdateSample.ts][applicationscreateorupdatesample]                               | Creates a new managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplication.json                                                                       |
| [applicationsDeleteByIdSample.ts][applicationsdeletebyidsample]                                       | Deletes the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplicationById.json                                                                             |
| [applicationsDeleteSample.ts][applicationsdeletesample]                                               | Deletes the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplication.json                                                                                 |
| [applicationsGetByIdSample.ts][applicationsgetbyidsample]                                             | Gets the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplicationById.json                                                                                   |
| [applicationsGetSample.ts][applicationsgetsample]                                                     | Gets the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplication.json                                                                                       |
| [applicationsListByResourceGroupSample.ts][applicationslistbyresourcegroupsample]                     | Gets all the applications within a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listApplicationsByResourceGroup.json                                                 |
| [applicationsListBySubscriptionSample.ts][applicationslistbysubscriptionsample]                       | Gets all the applications within a subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listApplicationsBySubscription.json                                                    |
| [applicationsUpdateByIdSample.ts][applicationsupdatebyidsample]                                       | Updates an existing managed application. The only value that can be updated via PATCH currently is the tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/updateApplicationById.json |
| [applicationsUpdateSample.ts][applicationsupdatesample]                                               | Updates an existing managed application. The only value that can be updated via PATCH currently is the tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/updateApplication.json     |
| [listOperationsSample.ts][listoperationssample]                                                       | Lists all of the available Microsoft.Solutions REST API operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listSolutionsOperations.json                                        |

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
node dist/applicationDefinitionsCreateOrUpdateByIdSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/applicationDefinitionsCreateOrUpdateByIdSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationdefinitionscreateorupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsCreateOrUpdateByIdSample.ts
[applicationdefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsCreateOrUpdateSample.ts
[applicationdefinitionsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsDeleteByIdSample.ts
[applicationdefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsDeleteSample.ts
[applicationdefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsGetByIdSample.ts
[applicationdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsGetSample.ts
[applicationdefinitionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationDefinitionsListByResourceGroupSample.ts
[applicationscreateorupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsCreateOrUpdateByIdSample.ts
[applicationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsCreateOrUpdateSample.ts
[applicationsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsDeleteByIdSample.ts
[applicationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsDeleteSample.ts
[applicationsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsGetByIdSample.ts
[applicationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsGetSample.ts
[applicationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsListByResourceGroupSample.ts
[applicationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsListBySubscriptionSample.ts
[applicationsupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsUpdateByIdSample.ts
[applicationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/applicationsUpdateSample.ts
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/typescript/src/listOperationsSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-managedapplications?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managedapplications/arm-managedapplications/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
