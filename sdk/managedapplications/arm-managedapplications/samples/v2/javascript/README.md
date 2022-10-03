# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationDefinitionsCreateOrUpdateByIdSample.js][applicationdefinitionscreateorupdatebyidsample]   | Creates a new managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplicationDefinition.json                                                  |
| [applicationDefinitionsCreateOrUpdateSample.js][applicationdefinitionscreateorupdatesample]           | Creates a new managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplicationDefinition.json                                                  |
| [applicationDefinitionsDeleteByIdSample.js][applicationdefinitionsdeletebyidsample]                   | Deletes the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplicationDefinition.json                                                            |
| [applicationDefinitionsDeleteSample.js][applicationdefinitionsdeletesample]                           | Deletes the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplicationDefinition.json                                                            |
| [applicationDefinitionsGetByIdSample.js][applicationdefinitionsgetbyidsample]                         | Gets the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplicationDefinition.json                                                                  |
| [applicationDefinitionsGetSample.js][applicationdefinitionsgetsample]                                 | Gets the managed application definition. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplicationDefinition.json                                                                  |
| [applicationDefinitionsListByResourceGroupSample.js][applicationdefinitionslistbyresourcegroupsample] | Lists the managed application definitions in a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listApplicationDefinitionsByResourceGroup.json                           |
| [applicationsCreateOrUpdateByIdSample.js][applicationscreateorupdatebyidsample]                       | Creates a new managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplicationById.json                                                                   |
| [applicationsCreateOrUpdateSample.js][applicationscreateorupdatesample]                               | Creates a new managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/createOrUpdateApplication.json                                                                       |
| [applicationsDeleteByIdSample.js][applicationsdeletebyidsample]                                       | Deletes the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplicationById.json                                                                             |
| [applicationsDeleteSample.js][applicationsdeletesample]                                               | Deletes the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/deleteApplication.json                                                                                 |
| [applicationsGetByIdSample.js][applicationsgetbyidsample]                                             | Gets the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplicationById.json                                                                                   |
| [applicationsGetSample.js][applicationsgetsample]                                                     | Gets the managed application. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/getApplication.json                                                                                       |
| [applicationsListByResourceGroupSample.js][applicationslistbyresourcegroupsample]                     | Gets all the applications within a resource group. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listApplicationsByResourceGroup.json                                                 |
| [applicationsListBySubscriptionSample.js][applicationslistbysubscriptionsample]                       | Gets all the applications within a subscription. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listApplicationsBySubscription.json                                                    |
| [applicationsUpdateByIdSample.js][applicationsupdatebyidsample]                                       | Updates an existing managed application. The only value that can be updated via PATCH currently is the tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/updateApplicationById.json |
| [applicationsUpdateSample.js][applicationsupdatesample]                                               | Updates an existing managed application. The only value that can be updated via PATCH currently is the tags. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/updateApplication.json     |
| [listOperationsSample.js][listoperationssample]                                                       | Lists all of the available Microsoft.Solutions REST API operations. x-ms-original-file: specification/resources/resource-manager/Microsoft.Solutions/stable/2018-06-01/examples/listSolutionsOperations.json                                        |

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
node applicationDefinitionsCreateOrUpdateByIdSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node applicationDefinitionsCreateOrUpdateByIdSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationdefinitionscreateorupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsCreateOrUpdateByIdSample.js
[applicationdefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsCreateOrUpdateSample.js
[applicationdefinitionsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsDeleteByIdSample.js
[applicationdefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsDeleteSample.js
[applicationdefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsGetByIdSample.js
[applicationdefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsGetSample.js
[applicationdefinitionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationDefinitionsListByResourceGroupSample.js
[applicationscreateorupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsCreateOrUpdateByIdSample.js
[applicationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsCreateOrUpdateSample.js
[applicationsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsDeleteByIdSample.js
[applicationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsDeleteSample.js
[applicationsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsGetByIdSample.js
[applicationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsGetSample.js
[applicationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsListByResourceGroupSample.js
[applicationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsListBySubscriptionSample.js
[applicationsupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsUpdateByIdSample.js
[applicationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/applicationsUpdateSample.js
[listoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managedapplications/arm-managedapplications/samples/v2/javascript/listOperationsSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-managedapplications?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managedapplications/arm-managedapplications/README.md
