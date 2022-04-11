# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessReviewDefaultSettingsGetSample.ts][accessreviewdefaultsettingsgetsample]                                                     | Get access review default settings for the subscription x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewDefaultSettings.json                                                                                                                              |
| [accessReviewDefaultSettingsPutSample.ts][accessreviewdefaultsettingsputsample]                                                     | Get access review default settings for the subscription x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/PutAccessReviewDefaultSettings.json                                                                                                                              |
| [accessReviewHistoryDefinitionCreateSample.ts][accessreviewhistorydefinitioncreatesample]                                           | Create a scheduled or one-time Access Review History Definition x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/PutAccessReviewHistoryDefinition.json                                                                                                                    |
| [accessReviewHistoryDefinitionDeleteByIdSample.ts][accessreviewhistorydefinitiondeletebyidsample]                                   | Delete an access review history definition x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/DeleteAccessReviewHistoryDefinition.json                                                                                                                                      |
| [accessReviewHistoryDefinitionInstanceGenerateDownloadUriSample.ts][accessreviewhistorydefinitioninstancegeneratedownloadurisample] | Generates a uri which can be used to retrieve review history data. This URI has a TTL of 1 day and can be retrieved by fetching the accessReviewHistoryDefinition object. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/PostAccessReviewHistoryDefinitionInstance.json |
| [accessReviewHistoryDefinitionInstancesListSample.ts][accessreviewhistorydefinitioninstanceslistsample]                             | Get access review history definition instances by definition Id x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewHistoryDefinitionInstances.json                                                                                                           |
| [accessReviewHistoryDefinitionsGetByIdSample.ts][accessreviewhistorydefinitionsgetbyidsample]                                       | Get access review history definition by definition Id x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewHistoryDefinition.json                                                                                                                              |
| [accessReviewHistoryDefinitionsListSample.ts][accessreviewhistorydefinitionslistsample]                                             | Lists the accessReviewHistoryDefinitions available from this provider, definition instances are only available for 30 days after creation. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewHistoryDefinitions.json                                        |
| [accessReviewInstanceAcceptRecommendationsSample.ts][accessreviewinstanceacceptrecommendationssample]                               | An action to accept recommendations for decision in an access review instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/AccessReviewInstanceAcceptRecommendations.json                                                                                            |
| [accessReviewInstanceApplyDecisionsSample.ts][accessreviewinstanceapplydecisionssample]                                             | An action to apply all decisions for an access review instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/AccessReviewInstanceApplyDecisions.json                                                                                                                  |
| [accessReviewInstanceContactedReviewersListSample.ts][accessreviewinstancecontactedreviewerslistsample]                             | Get access review instance contacted reviewers x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstanceContactedReviewers.json                                                                                                                            |
| [accessReviewInstanceDecisionsListSample.ts][accessreviewinstancedecisionslistsample]                                               | Get access review instance decisions x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstanceDecisions.json                                                                                                                                               |
| [accessReviewInstanceMyDecisionsGetByIdSample.ts][accessreviewinstancemydecisionsgetbyidsample]                                     | Get my single access review instance decision. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstanceMyDecisionById.json                                                                                                                                |
| [accessReviewInstanceMyDecisionsListSample.ts][accessreviewinstancemydecisionslistsample]                                           | Get my access review instance decisions. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstanceMyDecisions.json                                                                                                                                         |
| [accessReviewInstanceMyDecisionsPatchSample.ts][accessreviewinstancemydecisionspatchsample]                                         | Record a decision. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/PatchAccessReviewInstanceMyDecisionById.json                                                                                                                                                          |
| [accessReviewInstanceResetDecisionsSample.ts][accessreviewinstanceresetdecisionssample]                                             | An action to reset all decisions for an access review instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/AccessReviewInstanceResetDecisions.json                                                                                                                  |
| [accessReviewInstanceSendRemindersSample.ts][accessreviewinstancesendreminderssample]                                               | An action to send reminders for an access review instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/AccessReviewInstanceSendReminders.json                                                                                                                        |
| [accessReviewInstanceStopSample.ts][accessreviewinstancestopsample]                                                                 | An action to stop an access review instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/StopAccessReviewInstance.json                                                                                                                                               |
| [accessReviewInstancesAssignedForMyApprovalGetByIdSample.ts][accessreviewinstancesassignedformyapprovalgetbyidsample]               | Get single access review instance assigned for my approval. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstanceAssignedForMyApproval.json                                                                                                            |
| [accessReviewInstancesAssignedForMyApprovalListSample.ts][accessreviewinstancesassignedformyapprovallistsample]                     | Get access review instances assigned for my approval. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstancesAssignedForMyApproval.json                                                                                                                 |
| [accessReviewInstancesCreateSample.ts][accessreviewinstancescreatesample]                                                           | Update access review instance. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/PutAccessReviewInstance.json                                                                                                                                                              |
| [accessReviewInstancesGetByIdSample.ts][accessreviewinstancesgetbyidsample]                                                         | Get access review instances x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstance.json                                                                                                                                                                 |
| [accessReviewInstancesListSample.ts][accessreviewinstanceslistsample]                                                               | Get access review instances x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewInstances.json                                                                                                                                                                |
| [accessReviewScheduleDefinitionsAssignedForMyApprovalListSample.ts][accessreviewscheduledefinitionsassignedformyapprovallistsample] | Get access review instances assigned for my approval. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewScheduleDefinitionsAssignedForMyApproval.json                                                                                                       |
| [accessReviewScheduleDefinitionsCreateOrUpdateByIdSample.ts][accessreviewscheduledefinitionscreateorupdatebyidsample]               | Create or Update access review schedule definition. x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/PutAccessReviewScheduleDefinition.json                                                                                                                               |
| [accessReviewScheduleDefinitionsDeleteByIdSample.ts][accessreviewscheduledefinitionsdeletebyidsample]                               | Delete access review schedule definition x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/DeleteAccessReviewScheduleDefinition.json                                                                                                                                       |
| [accessReviewScheduleDefinitionsGetByIdSample.ts][accessreviewscheduledefinitionsgetbyidsample]                                     | Get single access review definition x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewScheduleDefinition.json                                                                                                                                               |
| [accessReviewScheduleDefinitionsListSample.ts][accessreviewscheduledefinitionslistsample]                                           | Get access review schedule definitions x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/GetAccessReviewScheduleDefinitions.json                                                                                                                                           |
| [accessReviewScheduleDefinitionsStopSample.ts][accessreviewscheduledefinitionsstopsample]                                           | Stop access review definition x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/StopAccessReviewScheduleDefinition.json                                                                                                                                                    |
| [tenantLevelAccessReviewInstanceContactedReviewersListSample.ts][tenantlevelaccessreviewinstancecontactedreviewerslistsample]       | Get access review instance contacted reviewers x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2021-11-16-preview/examples/TenantLevelGetAccessReviewInstanceContactedReviewers.json                                                                                                                 |

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
node dist/accessReviewDefaultSettingsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accessReviewDefaultSettingsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accessreviewdefaultsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewDefaultSettingsGetSample.ts
[accessreviewdefaultsettingsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewDefaultSettingsPutSample.ts
[accessreviewhistorydefinitioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewHistoryDefinitionCreateSample.ts
[accessreviewhistorydefinitiondeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewHistoryDefinitionDeleteByIdSample.ts
[accessreviewhistorydefinitioninstancegeneratedownloadurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewHistoryDefinitionInstanceGenerateDownloadUriSample.ts
[accessreviewhistorydefinitioninstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewHistoryDefinitionInstancesListSample.ts
[accessreviewhistorydefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewHistoryDefinitionsGetByIdSample.ts
[accessreviewhistorydefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewHistoryDefinitionsListSample.ts
[accessreviewinstanceacceptrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceAcceptRecommendationsSample.ts
[accessreviewinstanceapplydecisionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceApplyDecisionsSample.ts
[accessreviewinstancecontactedreviewerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceContactedReviewersListSample.ts
[accessreviewinstancedecisionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceDecisionsListSample.ts
[accessreviewinstancemydecisionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceMyDecisionsGetByIdSample.ts
[accessreviewinstancemydecisionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceMyDecisionsListSample.ts
[accessreviewinstancemydecisionspatchsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceMyDecisionsPatchSample.ts
[accessreviewinstanceresetdecisionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceResetDecisionsSample.ts
[accessreviewinstancesendreminderssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceSendRemindersSample.ts
[accessreviewinstancestopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstanceStopSample.ts
[accessreviewinstancesassignedformyapprovalgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstancesAssignedForMyApprovalGetByIdSample.ts
[accessreviewinstancesassignedformyapprovallistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstancesAssignedForMyApprovalListSample.ts
[accessreviewinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstancesCreateSample.ts
[accessreviewinstancesgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstancesGetByIdSample.ts
[accessreviewinstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewInstancesListSample.ts
[accessreviewscheduledefinitionsassignedformyapprovallistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewScheduleDefinitionsAssignedForMyApprovalListSample.ts
[accessreviewscheduledefinitionscreateorupdatebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewScheduleDefinitionsCreateOrUpdateByIdSample.ts
[accessreviewscheduledefinitionsdeletebyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewScheduleDefinitionsDeleteByIdSample.ts
[accessreviewscheduledefinitionsgetbyidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewScheduleDefinitionsGetByIdSample.ts
[accessreviewscheduledefinitionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewScheduleDefinitionsListSample.ts
[accessreviewscheduledefinitionsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/accessReviewScheduleDefinitionsStopSample.ts
[tenantlevelaccessreviewinstancecontactedreviewerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/authorization/arm-authorization/samples/v9-beta/typescript/src/tenantLevelAccessReviewInstanceContactedReviewersListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-authorization?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/authorization/arm-authorization/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
