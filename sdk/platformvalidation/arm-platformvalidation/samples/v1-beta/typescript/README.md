# @azure/arm-platformvalidation client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-platformvalidation in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudValidationsCreateOrUpdateSample.ts][cloudvalidationscreateorupdatesample]                           | create or update a cloud validation x-ms-original-file: 2026-07-01-preview/CloudValidations_CreateOrUpdate_MaximumSet_Gen.json                                          |
| [cloudValidationsDeleteSample.ts][cloudvalidationsdeletesample]                                           | delete a cloud validation x-ms-original-file: 2026-07-01-preview/CloudValidations_Delete_MaximumSet_Gen.json                                                            |
| [cloudValidationsGetSample.ts][cloudvalidationsgetsample]                                                 | get a cloud validation x-ms-original-file: 2026-07-01-preview/CloudValidations_Get_MaximumSet_Gen.json                                                                  |
| [cloudValidationsListByResourceGroupSample.ts][cloudvalidationslistbyresourcegroupsample]                 | list cloud validations by resource group x-ms-original-file: 2026-07-01-preview/CloudValidations_ListByResourceGroup_MaximumSet_Gen.json                                |
| [cloudValidationsListBySubscriptionSample.ts][cloudvalidationslistbysubscriptionsample]                   | list cloud validations by subscription x-ms-original-file: 2026-07-01-preview/CloudValidations_ListBySubscription_MaximumSet_Gen.json                                   |
| [cloudValidationsUpdateSample.ts][cloudvalidationsupdatesample]                                           | update a cloud validation x-ms-original-file: 2026-07-01-preview/CloudValidations_Update_MaximumSet_Gen.json                                                            |
| [executionPlanRunsCreateOrUpdateSample.ts][executionplanrunscreateorupdatesample]                         | create or update a validation test execution plan x-ms-original-file: 2026-07-01-preview/ExecutionPlanRuns_CreateOrUpdate_MaximumSet_Gen.json                           |
| [executionPlanRunsDeleteSample.ts][executionplanrunsdeletesample]                                         | delete a validation test execution plan run resource x-ms-original-file: 2026-07-01-preview/ExecutionPlanRuns_Delete_MaximumSet_Gen.json                                |
| [executionPlanRunsGetSample.ts][executionplanrunsgetsample]                                               | get a Validation test execution plan run details x-ms-original-file: 2026-07-01-preview/ExecutionPlanRuns_Get_MaximumSet_Gen.json                                       |
| [executionPlanRunsListByExecutionPlanSample.ts][executionplanrunslistbyexecutionplansample]               | list Validation test execution plan runs for an execution plan x-ms-original-file: 2026-07-01-preview/ExecutionPlanRuns_ListByExecutionPlan_MaximumSet_Gen.json         |
| [operationStatusGetSample.ts][operationstatusgetsample]                                                   | returns the current status of an async operation. x-ms-original-file: 2026-07-01-preview/OperationStatus_Get_MaximumSet_Gen.json                                        |
| [operationsListSample.ts][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2026-07-01-preview/Operations_List_MaximumSet_Gen.json                                                         |
| [validationExecutionPlansCreateOrUpdateSample.ts][validationexecutionplanscreateorupdatesample]           | create or update a validation test execution plan x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_CreateOrUpdate_MaximumSet_Gen.json                    |
| [validationExecutionPlansDeleteSample.ts][validationexecutionplansdeletesample]                           | delete a validation test execution plan x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_Delete_MaximumSet_Gen.json                                      |
| [validationExecutionPlansGetSample.ts][validationexecutionplansgetsample]                                 | get a validation test execution plan x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_Get_MaximumSet_Gen.json                                            |
| [validationExecutionPlansListByResourceGroupSample.ts][validationexecutionplanslistbyresourcegroupsample] | list validation test execution plans by resource group x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_ListByResourceGroup_MaximumSet_Gen.json          |
| [validationExecutionPlansUpdateSample.ts][validationexecutionplansupdatesample]                           | update a validation test execution plan x-ms-original-file: 2026-07-01-preview/ValidationExecutionPlans_Update_MaximumSet_Gen.json                                      |
| [validationTestCategoriesGetSample.ts][validationtestcategoriesgetsample]                                 | get a validation test category catalog entry x-ms-original-file: 2026-07-01-preview/ValidationTestCategories_Get_MaximumSet_Gen.json                                    |
| [validationTestCategoriesListBySubscriptionSample.ts][validationtestcategorieslistbysubscriptionsample]   | list validation test category catalog entries for a subscription x-ms-original-file: 2026-07-01-preview/ValidationTestCategories_ListBySubscription_MaximumSet_Gen.json |
| [validationTestRunsCreateOrUpdateSample.ts][validationtestrunscreateorupdatesample]                       | create or update a validation test run x-ms-original-file: 2026-07-01-preview/ValidationTestRuns_CreateOrUpdate_MaximumSet_Gen.json                                     |
| [validationTestRunsDeleteSample.ts][validationtestrunsdeletesample]                                       | delete a validation test run x-ms-original-file: 2026-07-01-preview/ValidationTestRuns_Delete_MaximumSet_Gen.json                                                       |
| [validationTestRunsGetSample.ts][validationtestrunsgetsample]                                             | get a validation test run details x-ms-original-file: 2026-07-01-preview/ValidationTestRuns_Get_MaximumSet_Gen.json                                                     |
| [validationTestRunsListByExecutionPlanRunSample.ts][validationtestrunslistbyexecutionplanrunsample]       | list validation test runs for an execution plan run x-ms-original-file: 2026-07-01-preview/ValidationTestRuns_ListByExecutionPlanRun_MaximumSet_Gen.json                |
| [validationTestVersionsGetSample.ts][validationtestversionsgetsample]                                     | get a validation test version catalog entry x-ms-original-file: 2026-07-01-preview/ValidationTestVersions_Get_MaximumSet_Gen.json                                       |
| [validationTestVersionsListSample.ts][validationtestversionslistsample]                                   | list validation test version catalog entries x-ms-original-file: 2026-07-01-preview/ValidationTestVersions_List_MaximumSet_Gen.json                                     |
| [validationTestsGetSample.ts][validationtestsgetsample]                                                   | get a validation test catalog entry x-ms-original-file: 2026-07-01-preview/ValidationTests_Get_MaximumSet_Gen.json                                                      |
| [validationTestsListBySubscriptionSample.ts][validationtestslistbysubscriptionsample]                     | list validation test catalog entries for a subscription x-ms-original-file: 2026-07-01-preview/ValidationTests_ListBySubscription_MaximumSet_Gen.json                   |

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
node dist/cloudValidationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/cloudValidationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudvalidationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/cloudValidationsCreateOrUpdateSample.ts
[cloudvalidationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/cloudValidationsDeleteSample.ts
[cloudvalidationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/cloudValidationsGetSample.ts
[cloudvalidationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/cloudValidationsListByResourceGroupSample.ts
[cloudvalidationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/cloudValidationsListBySubscriptionSample.ts
[cloudvalidationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/cloudValidationsUpdateSample.ts
[executionplanrunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/executionPlanRunsCreateOrUpdateSample.ts
[executionplanrunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/executionPlanRunsDeleteSample.ts
[executionplanrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/executionPlanRunsGetSample.ts
[executionplanrunslistbyexecutionplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/executionPlanRunsListByExecutionPlanSample.ts
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/operationStatusGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/operationsListSample.ts
[validationexecutionplanscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationExecutionPlansCreateOrUpdateSample.ts
[validationexecutionplansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationExecutionPlansDeleteSample.ts
[validationexecutionplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationExecutionPlansGetSample.ts
[validationexecutionplanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationExecutionPlansListByResourceGroupSample.ts
[validationexecutionplansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationExecutionPlansUpdateSample.ts
[validationtestcategoriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestCategoriesGetSample.ts
[validationtestcategorieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestCategoriesListBySubscriptionSample.ts
[validationtestrunscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestRunsCreateOrUpdateSample.ts
[validationtestrunsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestRunsDeleteSample.ts
[validationtestrunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestRunsGetSample.ts
[validationtestrunslistbyexecutionplanrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestRunsListByExecutionPlanRunSample.ts
[validationtestversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestVersionsGetSample.ts
[validationtestversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestVersionsListSample.ts
[validationtestsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestsGetSample.ts
[validationtestslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/platformvalidation/arm-platformvalidation/samples/v1-beta/typescript/src/validationTestsListBySubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-platformvalidation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/platformvalidation/arm-platformvalidation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
