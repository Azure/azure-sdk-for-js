# @azure/arm-advisor client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-advisor in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [advisorScoresGetSample.ts][advisorscoresgetsample]                                                                 | gets the advisor score. x-ms-original-file: 2026-02-01-preview/GetAdvisorScoreDetail.json                                                                                                                                                                                               |
| [advisorScoresListSample.ts][advisorscoreslistsample]                                                               | gets the list of advisor scores. x-ms-original-file: 2026-02-01-preview/ListAdvisorScore.json                                                                                                                                                                                           |
| [assessmentTypesListSample.ts][assessmenttypeslistsample]                                                           | get list of Azure Advisor assessment types. x-ms-original-file: 2026-02-01-preview/ListAssessmentTypes.json                                                                                                                                                                             |
| [assessmentsDeleteSample.ts][assessmentsdeletesample]                                                               | delete an existing Azure Advisor assessment. x-ms-original-file: 2026-02-01-preview/DeleteAssessment.json                                                                                                                                                                               |
| [assessmentsGetSample.ts][assessmentsgetsample]                                                                     | get an existing Azure Advisor assessment. x-ms-original-file: 2026-02-01-preview/GetAssessment.json                                                                                                                                                                                     |
| [assessmentsListSample.ts][assessmentslistsample]                                                                   | get list of Azure Advisor assessments. x-ms-original-file: 2026-02-01-preview/ListAssessments.json                                                                                                                                                                                      |
| [assessmentsPutSample.ts][assessmentsputsample]                                                                     | create or Overwrite Azure Advisor assessment. x-ms-original-file: 2026-02-01-preview/PutAssessment.json                                                                                                                                                                                 |
| [configurationsCreateInResourceGroupSample.ts][configurationscreateinresourcegroupsample]                           | create/Overwrite Azure Advisor configuration. x-ms-original-file: 2026-02-01-preview/CreateConfiguration.json                                                                                                                                                                           |
| [configurationsCreateInSubscriptionSample.ts][configurationscreateinsubscriptionsample]                             | create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups. x-ms-original-file: 2026-02-01-preview/CreateConfiguration_CreateInSubscription.json                                                                                      |
| [configurationsListByResourceGroupSample.ts][configurationslistbyresourcegroupsample]                               | retrieve Azure Advisor configurations. x-ms-original-file: 2026-02-01-preview/ListConfigurations.json                                                                                                                                                                                   |
| [configurationsListBySubscriptionSample.ts][configurationslistbysubscriptionsample]                                 | retrieve Azure Advisor configurations and also retrieve configurations of contained resource groups. x-ms-original-file: 2026-02-01-preview/ListConfigurations_ListBySubscription.json                                                                                                  |
| [operationsListSample.ts][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2026-02-01-preview/OperationsList.json                                                                                                                                                                                         |
| [predictSample.ts][predictsample]                                                                                   | predicts a recommendation. x-ms-original-file: 2026-02-01-preview/Predict.json                                                                                                                                                                                                          |
| [recommendationMetadataGetSample.ts][recommendationmetadatagetsample]                                               | gets the metadata entity. x-ms-original-file: 2026-02-01-preview/GetRecommendationMetadataEntity.json                                                                                                                                                                                   |
| [recommendationMetadataListSample.ts][recommendationmetadatalistsample]                                             | gets the list of metadata entities. x-ms-original-file: 2026-02-01-preview/ListRecommendationMetadata.json                                                                                                                                                                              |
| [recommendationsGenerateSample.ts][recommendationsgeneratesample]                                                   | initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. x-ms-original-file: 2026-02-01-preview/GenerateRecommendations.json                      |
| [recommendationsGetGenerateStatusSample.ts][recommendationsgetgeneratestatussample]                                 | retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. x-ms-original-file: 2026-02-01-preview/EmptyResponse.json      |
| [recommendationsGetSample.ts][recommendationsgetsample]                                                             | obtains details of a cached recommendation. x-ms-original-file: 2026-02-01-preview/GetRecommendationDetailServiceGroupResourceUri.json                                                                                                                                                  |
| [recommendationsListByTenantSample.ts][recommendationslistbytenantsample]                                           | obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. x-ms-original-file: 2026-02-01-preview/ListRecommendationsServiceGroupResourceUri.json                                                            |
| [recommendationsListSample.ts][recommendationslistsample]                                                           | obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. x-ms-original-file: 2026-02-01-preview/ListRecommendationsSubscriptionResourceUri.json                                                            |
| [recommendationsUpdateSample.ts][recommendationsupdatesample]                                                       | update the state of a Recommendation x-ms-original-file: 2026-02-01-preview/PatchRecommendationStateProperties.json                                                                                                                                                                     |
| [resiliencyReviewsGetSample.ts][resiliencyreviewsgetsample]                                                         | get existing Azure Advisor resiliency review by id. x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsGet.json                                                                                                                                                                    |
| [resiliencyReviewsListSample.ts][resiliencyreviewslistsample]                                                       | get list of Azure Advisor resiliency reviews. x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsList.json                                                                                                                                                                         |
| [suppressionsCreateSample.ts][suppressionscreatesample]                                                             | enables the snoozed or dismissed attribute of a recommendation. The snoozed or dismissed attribute is referred to as a suppression. Use this API to create or update the snoozed or dismissed status of a recommendation. x-ms-original-file: 2026-02-01-preview/CreateSuppression.json |
| [suppressionsDeleteSample.ts][suppressionsdeletesample]                                                             | enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: 2026-02-01-preview/DeleteSuppression.json                                                                  |
| [suppressionsGetSample.ts][suppressionsgetsample]                                                                   | obtains the details of a suppression. x-ms-original-file: 2026-02-01-preview/GetSuppressionDetail.json                                                                                                                                                                                  |
| [suppressionsListSample.ts][suppressionslistsample]                                                                 | retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: 2026-02-01-preview/ListSuppressions.json                                                        |
| [triageRecommendationsApproveTriageRecommendationSample.ts][triagerecommendationsapprovetriagerecommendationsample] | approve a triage recommendation for a given id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsApprove.json                                                                                                                                                                |
| [triageRecommendationsGetSample.ts][triagerecommendationsgetsample]                                                 | get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsGet.json                                                                                                                           |
| [triageRecommendationsListSample.ts][triagerecommendationslistsample]                                               | get list of recommendations for an existing Azure Advisor Resiliency Review Id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsList.json                                                                                                                                   |
| [triageRecommendationsRejectTriageRecommendationSample.ts][triagerecommendationsrejecttriagerecommendationsample]   | reject an existing triage recommendation for a given id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsReject.json                                                                                                                                                        |
| [triageRecommendationsResetTriageRecommendationSample.ts][triagerecommendationsresettriagerecommendationsample]     | reset an existing triage recommendation for a given id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsReset.json                                                                                                                                                          |
| [triageResourcesGetSample.ts][triageresourcesgetsample]                                                             | get a triage resource for a given review and recommendation. x-ms-original-file: 2026-02-01-preview/TriageResourcesGet.json                                                                                                                                                             |
| [triageResourcesListSample.ts][triageresourceslistsample]                                                           | list all triage resources that belong to a review and recommendation. x-ms-original-file: 2026-02-01-preview/TriageResourcesList.json                                                                                                                                                   |
| [workloadsListSample.ts][workloadslistsample]                                                                       | get list of Workloads. x-ms-original-file: 2026-02-01-preview/ListWorkloads.json                                                                                                                                                                                                        |

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
node dist/advisorScoresGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/advisorScoresGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[advisorscoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/advisorScoresGetSample.ts
[advisorscoreslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/advisorScoresListSample.ts
[assessmenttypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/assessmentTypesListSample.ts
[assessmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/assessmentsDeleteSample.ts
[assessmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/assessmentsGetSample.ts
[assessmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/assessmentsListSample.ts
[assessmentsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/assessmentsPutSample.ts
[configurationscreateinresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/configurationsCreateInResourceGroupSample.ts
[configurationscreateinsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/configurationsCreateInSubscriptionSample.ts
[configurationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/configurationsListByResourceGroupSample.ts
[configurationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/configurationsListBySubscriptionSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/operationsListSample.ts
[predictsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/predictSample.ts
[recommendationmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationMetadataGetSample.ts
[recommendationmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationMetadataListSample.ts
[recommendationsgeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationsGenerateSample.ts
[recommendationsgetgeneratestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationsGetGenerateStatusSample.ts
[recommendationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationsGetSample.ts
[recommendationslistbytenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationsListByTenantSample.ts
[recommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationsListSample.ts
[recommendationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/recommendationsUpdateSample.ts
[resiliencyreviewsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/resiliencyReviewsGetSample.ts
[resiliencyreviewslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/resiliencyReviewsListSample.ts
[suppressionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/suppressionsCreateSample.ts
[suppressionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/suppressionsDeleteSample.ts
[suppressionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/suppressionsGetSample.ts
[suppressionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/suppressionsListSample.ts
[triagerecommendationsapprovetriagerecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageRecommendationsApproveTriageRecommendationSample.ts
[triagerecommendationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageRecommendationsGetSample.ts
[triagerecommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageRecommendationsListSample.ts
[triagerecommendationsrejecttriagerecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageRecommendationsRejectTriageRecommendationSample.ts
[triagerecommendationsresettriagerecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageRecommendationsResetTriageRecommendationSample.ts
[triageresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageResourcesGetSample.ts
[triageresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/triageResourcesListSample.ts
[workloadslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/typescript/src/workloadsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-advisor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/advisor/arm-advisor/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
