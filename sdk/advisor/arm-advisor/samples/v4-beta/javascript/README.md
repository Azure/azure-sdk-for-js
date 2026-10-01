# @azure/arm-advisor client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-advisor in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [advisorScoresGetSample.js][advisorscoresgetsample]                                                                 | gets the advisor score. x-ms-original-file: 2026-02-01-preview/GetAdvisorScoreDetail.json                                                                                                                                                                                               |
| [advisorScoresListSample.js][advisorscoreslistsample]                                                               | gets the list of advisor scores. x-ms-original-file: 2026-02-01-preview/ListAdvisorScore.json                                                                                                                                                                                           |
| [assessmentTypesListSample.js][assessmenttypeslistsample]                                                           | get list of Azure Advisor assessment types. x-ms-original-file: 2026-02-01-preview/ListAssessmentTypes.json                                                                                                                                                                             |
| [assessmentsDeleteSample.js][assessmentsdeletesample]                                                               | delete an existing Azure Advisor assessment. x-ms-original-file: 2026-02-01-preview/DeleteAssessment.json                                                                                                                                                                               |
| [assessmentsGetSample.js][assessmentsgetsample]                                                                     | get an existing Azure Advisor assessment. x-ms-original-file: 2026-02-01-preview/GetAssessment.json                                                                                                                                                                                     |
| [assessmentsListSample.js][assessmentslistsample]                                                                   | get list of Azure Advisor assessments. x-ms-original-file: 2026-02-01-preview/ListAssessments.json                                                                                                                                                                                      |
| [assessmentsPutSample.js][assessmentsputsample]                                                                     | create or Overwrite Azure Advisor assessment. x-ms-original-file: 2026-02-01-preview/PutAssessment.json                                                                                                                                                                                 |
| [configurationsCreateInResourceGroupSample.js][configurationscreateinresourcegroupsample]                           | create/Overwrite Azure Advisor configuration. x-ms-original-file: 2026-02-01-preview/CreateConfiguration.json                                                                                                                                                                           |
| [configurationsCreateInSubscriptionSample.js][configurationscreateinsubscriptionsample]                             | create/Overwrite Azure Advisor configuration and also delete all configurations of contained resource groups. x-ms-original-file: 2026-02-01-preview/CreateConfiguration_CreateInSubscription.json                                                                                      |
| [configurationsListByResourceGroupSample.js][configurationslistbyresourcegroupsample]                               | retrieve Azure Advisor configurations. x-ms-original-file: 2026-02-01-preview/ListConfigurations.json                                                                                                                                                                                   |
| [configurationsListBySubscriptionSample.js][configurationslistbysubscriptionsample]                                 | retrieve Azure Advisor configurations and also retrieve configurations of contained resource groups. x-ms-original-file: 2026-02-01-preview/ListConfigurations_ListBySubscription.json                                                                                                  |
| [operationsListSample.js][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2026-02-01-preview/OperationsList.json                                                                                                                                                                                         |
| [predictSample.js][predictsample]                                                                                   | predicts a recommendation. x-ms-original-file: 2026-02-01-preview/Predict.json                                                                                                                                                                                                          |
| [recommendationMetadataGetSample.js][recommendationmetadatagetsample]                                               | gets the metadata entity. x-ms-original-file: 2026-02-01-preview/GetRecommendationMetadataEntity.json                                                                                                                                                                                   |
| [recommendationMetadataListSample.js][recommendationmetadatalistsample]                                             | gets the list of metadata entities. x-ms-original-file: 2026-02-01-preview/ListRecommendationMetadata.json                                                                                                                                                                              |
| [recommendationsGenerateSample.js][recommendationsgeneratesample]                                                   | initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. x-ms-original-file: 2026-02-01-preview/GenerateRecommendations.json                      |
| [recommendationsGetGenerateStatusSample.js][recommendationsgetgeneratestatussample]                                 | retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. x-ms-original-file: 2026-02-01-preview/EmptyResponse.json      |
| [recommendationsGetSample.js][recommendationsgetsample]                                                             | obtains details of a cached recommendation. x-ms-original-file: 2026-02-01-preview/GetRecommendationDetailServiceGroupResourceUri.json                                                                                                                                                  |
| [recommendationsListByTenantSample.js][recommendationslistbytenantsample]                                           | obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. x-ms-original-file: 2026-02-01-preview/ListRecommendationsServiceGroupResourceUri.json                                                            |
| [recommendationsListSample.js][recommendationslistsample]                                                           | obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. x-ms-original-file: 2026-02-01-preview/ListRecommendationsSubscriptionResourceUri.json                                                            |
| [recommendationsUpdateSample.js][recommendationsupdatesample]                                                       | update the state of a Recommendation x-ms-original-file: 2026-02-01-preview/PatchRecommendationStateProperties.json                                                                                                                                                                     |
| [resiliencyReviewsGetSample.js][resiliencyreviewsgetsample]                                                         | get existing Azure Advisor resiliency review by id. x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsGet.json                                                                                                                                                                    |
| [resiliencyReviewsListSample.js][resiliencyreviewslistsample]                                                       | get list of Azure Advisor resiliency reviews. x-ms-original-file: 2026-02-01-preview/ResiliencyReviewsList.json                                                                                                                                                                         |
| [suppressionsCreateSample.js][suppressionscreatesample]                                                             | enables the snoozed or dismissed attribute of a recommendation. The snoozed or dismissed attribute is referred to as a suppression. Use this API to create or update the snoozed or dismissed status of a recommendation. x-ms-original-file: 2026-02-01-preview/CreateSuppression.json |
| [suppressionsDeleteSample.js][suppressionsdeletesample]                                                             | enables the activation of a snoozed or dismissed recommendation. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: 2026-02-01-preview/DeleteSuppression.json                                                                  |
| [suppressionsGetSample.js][suppressionsgetsample]                                                                   | obtains the details of a suppression. x-ms-original-file: 2026-02-01-preview/GetSuppressionDetail.json                                                                                                                                                                                  |
| [suppressionsListSample.js][suppressionslistsample]                                                                 | retrieves the list of snoozed or dismissed suppressions for a subscription. The snoozed or dismissed attribute of a recommendation is referred to as a suppression. x-ms-original-file: 2026-02-01-preview/ListSuppressions.json                                                        |
| [triageRecommendationsApproveTriageRecommendationSample.js][triagerecommendationsapprovetriagerecommendationsample] | approve a triage recommendation for a given id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsApprove.json                                                                                                                                                                |
| [triageRecommendationsGetSample.js][triagerecommendationsgetsample]                                                 | get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsGet.json                                                                                                                           |
| [triageRecommendationsListSample.js][triagerecommendationslistsample]                                               | get list of recommendations for an existing Azure Advisor Resiliency Review Id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsList.json                                                                                                                                   |
| [triageRecommendationsRejectTriageRecommendationSample.js][triagerecommendationsrejecttriagerecommendationsample]   | reject an existing triage recommendation for a given id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsReject.json                                                                                                                                                        |
| [triageRecommendationsResetTriageRecommendationSample.js][triagerecommendationsresettriagerecommendationsample]     | reset an existing triage recommendation for a given id. x-ms-original-file: 2026-02-01-preview/TriageRecommendationsReset.json                                                                                                                                                          |
| [triageResourcesGetSample.js][triageresourcesgetsample]                                                             | get a triage resource for a given review and recommendation. x-ms-original-file: 2026-02-01-preview/TriageResourcesGet.json                                                                                                                                                             |
| [triageResourcesListSample.js][triageresourceslistsample]                                                           | list all triage resources that belong to a review and recommendation. x-ms-original-file: 2026-02-01-preview/TriageResourcesList.json                                                                                                                                                   |
| [workloadsListSample.js][workloadslistsample]                                                                       | get list of Workloads. x-ms-original-file: 2026-02-01-preview/ListWorkloads.json                                                                                                                                                                                                        |

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
node advisorScoresGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node advisorScoresGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[advisorscoresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/advisorScoresGetSample.js
[advisorscoreslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/advisorScoresListSample.js
[assessmenttypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/assessmentTypesListSample.js
[assessmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/assessmentsDeleteSample.js
[assessmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/assessmentsGetSample.js
[assessmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/assessmentsListSample.js
[assessmentsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/assessmentsPutSample.js
[configurationscreateinresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/configurationsCreateInResourceGroupSample.js
[configurationscreateinsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/configurationsCreateInSubscriptionSample.js
[configurationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/configurationsListByResourceGroupSample.js
[configurationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/configurationsListBySubscriptionSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/operationsListSample.js
[predictsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/predictSample.js
[recommendationmetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationMetadataGetSample.js
[recommendationmetadatalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationMetadataListSample.js
[recommendationsgeneratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationsGenerateSample.js
[recommendationsgetgeneratestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationsGetGenerateStatusSample.js
[recommendationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationsGetSample.js
[recommendationslistbytenantsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationsListByTenantSample.js
[recommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationsListSample.js
[recommendationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/recommendationsUpdateSample.js
[resiliencyreviewsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/resiliencyReviewsGetSample.js
[resiliencyreviewslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/resiliencyReviewsListSample.js
[suppressionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/suppressionsCreateSample.js
[suppressionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/suppressionsDeleteSample.js
[suppressionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/suppressionsGetSample.js
[suppressionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/suppressionsListSample.js
[triagerecommendationsapprovetriagerecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageRecommendationsApproveTriageRecommendationSample.js
[triagerecommendationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageRecommendationsGetSample.js
[triagerecommendationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageRecommendationsListSample.js
[triagerecommendationsrejecttriagerecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageRecommendationsRejectTriageRecommendationSample.js
[triagerecommendationsresettriagerecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageRecommendationsResetTriageRecommendationSample.js
[triageresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageResourcesGetSample.js
[triageresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/triageResourcesListSample.js
[workloadslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/advisor/arm-advisor/samples/v4-beta/javascript/workloadsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-advisor?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/advisor/arm-advisor/README.md
