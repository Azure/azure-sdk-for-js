# @azure/arm-impactreporting client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-impactreporting in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [connectorsConnectorsCreateOrUpdateSample.ts][connectorsconnectorscreateorupdatesample]                                 | create a Connector x-ms-original-file: 2024-05-01-preview/Connectors_CreateOrUpdate.json                                         |
| [connectorsConnectorsDeleteSample.ts][connectorsconnectorsdeletesample]                                                 | delete a Connector x-ms-original-file: 2024-05-01-preview/Connectors_Delete.json                                                 |
| [connectorsConnectorsGetSample.ts][connectorsconnectorsgetsample]                                                       | get a Connector x-ms-original-file: 2024-05-01-preview/Connectors_Get.json                                                       |
| [connectorsConnectorsListBySubscriptionSample.ts][connectorsconnectorslistbysubscriptionsample]                         | list Connector resources by subscription ID x-ms-original-file: 2024-05-01-preview/Connectors_ListBySubscription.json            |
| [connectorsConnectorsUpdateSample.ts][connectorsconnectorsupdatesample]                                                 | update a Connector x-ms-original-file: 2024-05-01-preview/Connectors_Update.json                                                 |
| [impactCategoriesImpactCategoriesGetSample.ts][impactcategoriesimpactcategoriesgetsample]                               | get a ImpactCategory x-ms-original-file: 2024-05-01-preview/ImpactCategories_Get.json                                            |
| [impactCategoriesImpactCategoriesListBySubscriptionSample.ts][impactcategoriesimpactcategorieslistbysubscriptionsample] | list ImpactCategory resources by subscription x-ms-original-file: 2024-05-01-preview/ImpactCategories_ListBySubscription.json    |
| [insightsInsightsCreateSample.ts][insightsinsightscreatesample]                                                         | create Insight resource, This is Admin only operation x-ms-original-file: 2024-05-01-preview/Insights_Create.json                |
| [insightsInsightsDeleteSample.ts][insightsinsightsdeletesample]                                                         | delete Insight resource, This is Admin only operation x-ms-original-file: 2024-05-01-preview/Insights_Delete.json                |
| [insightsInsightsGetSample.ts][insightsinsightsgetsample]                                                               | get Insight resources by workloadImpactName and insightName x-ms-original-file: 2024-05-01-preview/Insights_Get_diagnostics.json |
| [insightsInsightsListBySubscriptionSample.ts][insightsinsightslistbysubscriptionsample]                                 | list Insight resources by workloadImpactName x-ms-original-file: 2024-05-01-preview/Insights_ListBySubscription.json             |
| [operationsOperationsListSample.ts][operationsoperationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2024-05-01-preview/Operations_List.json                                 |
| [workloadImpactsWorkloadImpactsCreateSample.ts][workloadimpactsworkloadimpactscreatesample]                             | create a WorkloadImpact x-ms-original-file: 2024-05-01-preview/WorkloadArmOperation_create.json                                  |
| [workloadImpactsWorkloadImpactsDeleteSample.ts][workloadimpactsworkloadimpactsdeletesample]                             | delete a WorkloadImpact x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Delete.json                                        |
| [workloadImpactsWorkloadImpactsGetSample.ts][workloadimpactsworkloadimpactsgetsample]                                   | get a WorkloadImpact x-ms-original-file: 2024-05-01-preview/WorkloadImpact_Get.json                                              |
| [workloadImpactsWorkloadImpactsListBySubscriptionSample.ts][workloadimpactsworkloadimpactslistbysubscriptionsample]     | list WorkloadImpact resources by subscription ID x-ms-original-file: 2024-05-01-preview/WorkloadImpacts_ListBySubscription.json  |

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
node dist/connectorsConnectorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/connectorsConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[connectorsconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/connectorsConnectorsCreateOrUpdateSample.ts
[connectorsconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/connectorsConnectorsDeleteSample.ts
[connectorsconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/connectorsConnectorsGetSample.ts
[connectorsconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/connectorsConnectorsListBySubscriptionSample.ts
[connectorsconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/connectorsConnectorsUpdateSample.ts
[impactcategoriesimpactcategoriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/impactCategoriesImpactCategoriesGetSample.ts
[impactcategoriesimpactcategorieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/impactCategoriesImpactCategoriesListBySubscriptionSample.ts
[insightsinsightscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/insightsInsightsCreateSample.ts
[insightsinsightsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/insightsInsightsDeleteSample.ts
[insightsinsightsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/insightsInsightsGetSample.ts
[insightsinsightslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/insightsInsightsListBySubscriptionSample.ts
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/operationsOperationsListSample.ts
[workloadimpactsworkloadimpactscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/workloadImpactsWorkloadImpactsCreateSample.ts
[workloadimpactsworkloadimpactsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/workloadImpactsWorkloadImpactsDeleteSample.ts
[workloadimpactsworkloadimpactsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/workloadImpactsWorkloadImpactsGetSample.ts
[workloadimpactsworkloadimpactslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/impactreporting/arm-impactreporting/samples/v1-beta/typescript/src/workloadImpactsWorkloadImpactsListBySubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-impactreporting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/impactreporting/arm-impactreporting/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
