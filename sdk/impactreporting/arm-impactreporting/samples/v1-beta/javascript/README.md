# @azure/arm-impactreporting client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-impactreporting in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [connectorsConnectorsCreateOrUpdateSample.js][connectorsconnectorscreateorupdatesample]                                 | create a Connector x-ms-original-file: 2024-05-01-preview/Connectors_CreateOrUpdate.json                                         |
| [connectorsConnectorsDeleteSample.js][connectorsconnectorsdeletesample]                                                 | delete a Connector x-ms-original-file: 2024-05-01-preview/Connectors_Delete.json                                                 |
| [connectorsConnectorsGetSample.js][connectorsconnectorsgetsample]                                                       | get a Connector x-ms-original-file: 2024-05-01-preview/Connectors_Get.json                                                       |
| [connectorsConnectorsListBySubscriptionSample.js][connectorsconnectorslistbysubscriptionsample]                         | list Connector resources by subscription ID x-ms-original-file: 2024-05-01-preview/Connectors_ListBySubscription.json            |
| [connectorsConnectorsUpdateSample.js][connectorsconnectorsupdatesample]                                                 | update a Connector x-ms-original-file: 2024-05-01-preview/Connectors_Update.json                                                 |
| [impactCategoriesImpactCategoriesGetSample.js][impactcategoriesimpactcategoriesgetsample]                               | get a ImpactCategory x-ms-original-file: 2024-05-01-preview/ImpactCategories_Get.json                                            |
| [impactCategoriesImpactCategoriesListBySubscriptionSample.js][impactcategoriesimpactcategorieslistbysubscriptionsample] | list ImpactCategory resources by subscription x-ms-original-file: 2024-05-01-preview/ImpactCategories_ListBySubscription.json    |
| [insightsInsightsCreateSample.js][insightsinsightscreatesample]                                                         | create Insight resource, This is Admin only operation x-ms-original-file: 2024-05-01-preview/Insights_Create.json                |
| [insightsInsightsDeleteSample.js][insightsinsightsdeletesample]                                                         | delete Insight resource, This is Admin only operation x-ms-original-file: 2024-05-01-preview/Insights_Delete.json                |
| [insightsInsightsGetSample.js][insightsinsightsgetsample]                                                               | get Insight resources by workloadImpactName and insightName x-ms-original-file: 2024-05-01-preview/Insights_Get_diagnostics.json |
| [insightsInsightsListBySubscriptionSample.js][insightsinsightslistbysubscriptionsample]                                 | list Insight resources by workloadImpactName x-ms-original-file: 2024-05-01-preview/Insights_ListBySubscription.json             |
| [operationsOperationsListSample.js][operationsoperationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2024-05-01-preview/Operations_List.json                                 |
| [workloadImpactsWorkloadImpactsCreateSample.js][workloadimpactsworkloadimpactscreatesample]                             | create a WorkloadImpact x-ms-original-file: 2024-05-01-preview/WorkloadArmOperation_create.json                                  |
| [workloadImpactsWorkloadImpactsDeleteSample.js][workloadimpactsworkloadimpactsdeletesample]                             | delete a WorkloadImpact x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Delete.json                                        |
| [workloadImpactsWorkloadImpactsGetSample.js][workloadimpactsworkloadimpactsgetsample]                                   | get a WorkloadImpact x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Get.json                                              |
| [workloadImpactsWorkloadImpactsListBySubscriptionSample.js][workloadimpactsworkloadimpactslistbysubscriptionsample]     | list WorkloadImpact resources by subscription ID x-ms-original-file: 2024-05-01-preview/WorkloadImpacts_ListBySubscription.json  |

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
node connectorsConnectorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node connectorsConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[connectorsconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/connectorsConnectorsCreateOrUpdateSample.js
[connectorsconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/connectorsConnectorsDeleteSample.js
[connectorsconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/connectorsConnectorsGetSample.js
[connectorsconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/connectorsConnectorsListBySubscriptionSample.js
[connectorsconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/connectorsConnectorsUpdateSample.js
[impactcategoriesimpactcategoriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/impactCategoriesImpactCategoriesGetSample.js
[impactcategoriesimpactcategorieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/impactCategoriesImpactCategoriesListBySubscriptionSample.js
[insightsinsightscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/insightsInsightsCreateSample.js
[insightsinsightsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/insightsInsightsDeleteSample.js
[insightsinsightsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/insightsInsightsGetSample.js
[insightsinsightslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/insightsInsightsListBySubscriptionSample.js
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/operationsOperationsListSample.js
[workloadimpactsworkloadimpactscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/workloadImpactsWorkloadImpactsCreateSample.js
[workloadimpactsworkloadimpactsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/workloadImpactsWorkloadImpactsDeleteSample.js
[workloadimpactsworkloadimpactsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/workloadImpactsWorkloadImpactsGetSample.js
[workloadimpactsworkloadimpactslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/javascript/workloadImpactsWorkloadImpactsListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-impactreporting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/impactreporting/arm-impactreporting/README.md
