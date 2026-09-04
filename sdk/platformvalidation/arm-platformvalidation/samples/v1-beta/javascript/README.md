# @azure/arm-platformvalidation client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-platformvalidation in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudValidationsCreateOrUpdateSample.js][cloudvalidationscreateorupdatesample]                           | create or update a cloud validation x-ms-original-file: 2026-08-01-preview/CloudValidations_CreateOrUpdate_MaximumSet_Gen.json                                          |
| [cloudValidationsDeleteSample.js][cloudvalidationsdeletesample]                                           | delete a cloud validation x-ms-original-file: 2026-08-01-preview/CloudValidations_Delete_MaximumSet_Gen.json                                                            |
| [cloudValidationsGetSample.js][cloudvalidationsgetsample]                                                 | get a cloud validation x-ms-original-file: 2026-08-01-preview/CloudValidations_Get_MaximumSet_Gen.json                                                                  |
| [cloudValidationsListByResourceGroupSample.js][cloudvalidationslistbyresourcegroupsample]                 | list cloud validations by resource group x-ms-original-file: 2026-08-01-preview/CloudValidations_ListByResourceGroup_MaximumSet_Gen.json                                |
| [cloudValidationsListBySubscriptionSample.js][cloudvalidationslistbysubscriptionsample]                   | list cloud validations by subscription x-ms-original-file: 2026-08-01-preview/CloudValidations_ListBySubscription_MaximumSet_Gen.json                                   |
| [cloudValidationsUpdateSample.js][cloudvalidationsupdatesample]                                           | update a cloud validation x-ms-original-file: 2026-08-01-preview/CloudValidations_Update_MaximumSet_Gen.json                                                            |
| [executionPlanRunsCreateOrUpdateSample.js][executionplanrunscreateorupdatesample]                         | create or update a validation test execution plan x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_CreateOrUpdate_MaximumSet_Gen.json                           |
| [executionPlanRunsDeleteSample.js][executionplanrunsdeletesample]                                         | delete a validation test execution plan run resource x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_Delete_MaximumSet_Gen.json                                |
| [executionPlanRunsGetSample.js][executionplanrunsgetsample]                                               | get a Validation test execution plan run details x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_Get_MaximumSet_Gen.json                                       |
| [executionPlanRunsListByExecutionPlanSample.js][executionplanrunslistbyexecutionplansample]               | list Validation test execution plan runs for an execution plan x-ms-original-file: 2026-08-01-preview/ExecutionPlanRuns_ListByExecutionPlan_MaximumSet_Gen.json         |
| [operationStatusGetSample.js][operationstatusgetsample]                                                   | returns the current status of an async operation. x-ms-original-file: 2026-08-01-preview/OperationStatus_Get_MaximumSet_Gen.json                                        |
| [operationsListSample.js][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2026-08-01-preview/Operations_List_MaximumSet_Gen.json                                                         |
| [validationExecutionPlansCreateOrUpdateSample.js][validationexecutionplanscreateorupdatesample]           | create or update a validation test execution plan x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_CreateOrUpdate_MaximumSet_Gen.json                    |
| [validationExecutionPlansDeleteSample.js][validationexecutionplansdeletesample]                           | delete a validation test execution plan x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_Delete_MaximumSet_Gen.json                                      |
| [validationExecutionPlansGetSample.js][validationexecutionplansgetsample]                                 | get a validation test execution plan x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_Get_MaximumSet_Gen.json                                            |
| [validationExecutionPlansListByResourceGroupSample.js][validationexecutionplanslistbyresourcegroupsample] | list validation test execution plans by resource group x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_ListByResourceGroup_MaximumSet_Gen.json          |
| [validationExecutionPlansUpdateSample.js][validationexecutionplansupdatesample]                           | update a validation test execution plan x-ms-original-file: 2026-08-01-preview/ValidationExecutionPlans_Update_MaximumSet_Gen.json                                      |
| [validationTestCategoriesGetSample.js][validationtestcategoriesgetsample]                                 | get a validation test category catalog entry x-ms-original-file: 2026-08-01-preview/ValidationTestCategories_Get_MaximumSet_Gen.json                                    |
| [validationTestCategoriesListBySubscriptionSample.js][validationtestcategorieslistbysubscriptionsample]   | list validation test category catalog entries for a subscription x-ms-original-file: 2026-08-01-preview/ValidationTestCategories_ListBySubscription_MaximumSet_Gen.json |
| [validationTestRunsGetSample.js][validationtestrunsgetsample]                                             | get a validation test run details x-ms-original-file: 2026-08-01-preview/ValidationTestRuns_Get_MaximumSet_Gen.json                                                     |
| [validationTestRunsListByExecutionPlanRunSample.js][validationtestrunslistbyexecutionplanrunsample]       | list validation test runs for an execution plan run x-ms-original-file: 2026-08-01-preview/ValidationTestRuns_ListByExecutionPlanRun_MaximumSet_Gen.json                |
| [validationTestVersionsGetSample.js][validationtestversionsgetsample]                                     | get a validation test version catalog entry x-ms-original-file: 2026-08-01-preview/ValidationTestVersions_Get_MaximumSet_Gen.json                                       |
| [validationTestVersionsListSample.js][validationtestversionslistsample]                                   | list validation test version catalog entries x-ms-original-file: 2026-08-01-preview/ValidationTestVersions_List_MaximumSet_Gen.json                                     |
| [validationTestsGetSample.js][validationtestsgetsample]                                                   | get a validation test catalog entry x-ms-original-file: 2026-08-01-preview/ValidationTests_Get_MaximumSet_Gen.json                                                      |
| [validationTestsListBySubscriptionSample.js][validationtestslistbysubscriptionsample]                     | list validation test catalog entries for a subscription x-ms-original-file: 2026-08-01-preview/ValidationTests_ListBySubscription_MaximumSet_Gen.json                   |

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
node cloudValidationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node cloudValidationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudvalidationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/cloudValidationsCreateOrUpdateSample.js
[cloudvalidationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/cloudValidationsDeleteSample.js
[cloudvalidationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/cloudValidationsGetSample.js
[cloudvalidationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/cloudValidationsListByResourceGroupSample.js
[cloudvalidationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/cloudValidationsListBySubscriptionSample.js
[cloudvalidationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/cloudValidationsUpdateSample.js
[executionplanrunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/executionPlanRunsCreateOrUpdateSample.js
[executionplanrunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/executionPlanRunsDeleteSample.js
[executionplanrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/executionPlanRunsGetSample.js
[executionplanrunslistbyexecutionplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/executionPlanRunsListByExecutionPlanSample.js
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/operationStatusGetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/operationsListSample.js
[validationexecutionplanscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationExecutionPlansCreateOrUpdateSample.js
[validationexecutionplansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationExecutionPlansDeleteSample.js
[validationexecutionplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationExecutionPlansGetSample.js
[validationexecutionplanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationExecutionPlansListByResourceGroupSample.js
[validationexecutionplansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationExecutionPlansUpdateSample.js
[validationtestcategoriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestCategoriesGetSample.js
[validationtestcategorieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestCategoriesListBySubscriptionSample.js
[validationtestrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestRunsGetSample.js
[validationtestrunslistbyexecutionplanrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestRunsListByExecutionPlanRunSample.js
[validationtestversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestVersionsGetSample.js
[validationtestversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestVersionsListSample.js
[validationtestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestsGetSample.js
[validationtestslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/javascript/validationTestsListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-platformvalidation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/platformvalidation/arm-platformvalidation/README.md
