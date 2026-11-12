# @azure/arm-cloudhealth client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-cloudhealth in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [authenticationSettingsCreateOrUpdateSample.ts][authenticationsettingscreateorupdatesample]       | create a AuthenticationSetting x-ms-original-file: 2026-11-01/AuthenticationSettings_CreateOrUpdate.json                                                                                   |
| [authenticationSettingsDeleteSample.ts][authenticationsettingsdeletesample]                       | delete a AuthenticationSetting x-ms-original-file: 2026-11-01/AuthenticationSettings_Delete.json                                                                                           |
| [authenticationSettingsGetSample.ts][authenticationsettingsgetsample]                             | get a AuthenticationSetting x-ms-original-file: 2026-11-01/AuthenticationSettings_Get.json                                                                                                 |
| [authenticationSettingsListByHealthModelSample.ts][authenticationsettingslistbyhealthmodelsample] | list AuthenticationSetting resources by HealthModel x-ms-original-file: 2026-11-01/AuthenticationSettings_ListByHealthModel.json                                                           |
| [discoveryRulesCreateOrUpdateSample.ts][discoveryrulescreateorupdatesample]                       | create a DiscoveryRule x-ms-original-file: 2026-11-01/DiscoveryRules_CreateOrUpdate.json                                                                                                   |
| [discoveryRulesDeleteSample.ts][discoveryrulesdeletesample]                                       | delete a DiscoveryRule x-ms-original-file: 2026-11-01/DiscoveryRules_Delete.json                                                                                                           |
| [discoveryRulesGetSample.ts][discoveryrulesgetsample]                                             | get a DiscoveryRule x-ms-original-file: 2026-11-01/DiscoveryRules_Get.json                                                                                                                 |
| [discoveryRulesListByHealthModelSample.ts][discoveryruleslistbyhealthmodelsample]                 | list DiscoveryRule resources by HealthModel x-ms-original-file: 2026-11-01/DiscoveryRules_ListByHealthModel.json                                                                           |
| [entitiesAddDataAnnotationSample.ts][entitiesadddataannotationsample]                             | add a data annotation to an entity x-ms-original-file: 2026-11-01/Entities_AddDataAnnotation.json                                                                                          |
| [entitiesCreateOrUpdateSample.ts][entitiescreateorupdatesample]                                   | create a Entity x-ms-original-file: 2026-11-01/Entities_CreateOrUpdate.json                                                                                                                |
| [entitiesDeleteSample.ts][entitiesdeletesample]                                                   | delete a Entity x-ms-original-file: 2026-11-01/Entities_Delete.json                                                                                                                        |
| [entitiesGetDataAnnotationsSample.ts][entitiesgetdataannotationssample]                           | retrieve data annotations for an entity x-ms-original-file: 2026-11-01/Entities_GetDataAnnotations.json                                                                                    |
| [entitiesGetHistorySample.ts][entitiesgethistorysample]                                           | retrieve the health state transition history for an entity x-ms-original-file: 2026-11-01/Entities_GetHistory.json                                                                         |
| [entitiesGetSample.ts][entitiesgetsample]                                                         | get a Entity x-ms-original-file: 2026-11-01/Entities_Get.json                                                                                                                              |
| [entitiesGetSignalHistorySample.ts][entitiesgetsignalhistorysample]                               | retrieve the time series history for a signal on an entity x-ms-original-file: 2026-11-01/Entities_GetSignalHistory.json                                                                   |
| [entitiesGetSignalRecommendationsSample.ts][entitiesgetsignalrecommendationssample]               | get recommended signal configurations for a given Entity (only applicable for Entities representing Azure resources) x-ms-original-file: 2026-11-01/Entities_GetSignalRecommendations.json |
| [entitiesIngestHealthReportSample.ts][entitiesingesthealthreportsample]                           | ingest a health report for a specific signal on an entity (the entity must already exist) x-ms-original-file: 2026-11-01/Entities_IngestHealthReport.json                                  |
| [entitiesListByHealthModelSample.ts][entitieslistbyhealthmodelsample]                             | list Entity resources by HealthModel x-ms-original-file: 2026-11-01/Entities_ListByHealthModel.json                                                                                        |
| [healthModelsCreateSample.ts][healthmodelscreatesample]                                           | create a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Create.json                                                                                                               |
| [healthModelsDeleteSample.ts][healthmodelsdeletesample]                                           | delete a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Delete.json                                                                                                               |
| [healthModelsGetSample.ts][healthmodelsgetsample]                                                 | get a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Get.json                                                                                                                     |
| [healthModelsListByResourceGroupSample.ts][healthmodelslistbyresourcegroupsample]                 | list HealthModel resources by resource group x-ms-original-file: 2026-11-01/HealthModels_ListByResourceGroup.json                                                                          |
| [healthModelsListBySubscriptionSample.ts][healthmodelslistbysubscriptionsample]                   | list HealthModel resources by subscription ID x-ms-original-file: 2026-11-01/HealthModels_ListBySubscription.json                                                                          |
| [healthModelsUpdateSample.ts][healthmodelsupdatesample]                                           | update a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Update.json                                                                                                               |
| [operationsListSample.ts][operationslistsample]                                                   | list the operations for the provider x-ms-original-file: 2026-11-01/Operations_List.json                                                                                                   |
| [relationshipsCreateOrUpdateSample.ts][relationshipscreateorupdatesample]                         | create a Relationship x-ms-original-file: 2026-11-01/Relationships_CreateOrUpdate.json                                                                                                     |
| [relationshipsDeleteSample.ts][relationshipsdeletesample]                                         | delete a Relationship x-ms-original-file: 2026-11-01/Relationships_Delete.json                                                                                                             |
| [relationshipsGetSample.ts][relationshipsgetsample]                                               | get a Relationship x-ms-original-file: 2026-11-01/Relationships_Get.json                                                                                                                   |
| [relationshipsListByHealthModelSample.ts][relationshipslistbyhealthmodelsample]                   | list Relationship resources by HealthModel x-ms-original-file: 2026-11-01/Relationships_ListByHealthModel.json                                                                             |
| [signalDefinitionsCreateOrUpdateSample.ts][signaldefinitionscreateorupdatesample]                 | create a SignalDefinition x-ms-original-file: 2026-11-01/SignalDefinitions_CreateOrUpdate.json                                                                                             |
| [signalDefinitionsDeleteSample.ts][signaldefinitionsdeletesample]                                 | delete a SignalDefinition x-ms-original-file: 2026-11-01/SignalDefinitions_Delete.json                                                                                                     |
| [signalDefinitionsGetSample.ts][signaldefinitionsgetsample]                                       | get a SignalDefinition x-ms-original-file: 2026-11-01/SignalDefinitions_Get.json                                                                                                           |
| [signalDefinitionsListByHealthModelSample.ts][signaldefinitionslistbyhealthmodelsample]           | list SignalDefinition resources by HealthModel x-ms-original-file: 2026-11-01/SignalDefinitions_ListByHealthModel.json                                                                     |

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
node dist/authenticationSettingsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/authenticationSettingsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authenticationsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/authenticationSettingsCreateOrUpdateSample.ts
[authenticationsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/authenticationSettingsDeleteSample.ts
[authenticationsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/authenticationSettingsGetSample.ts
[authenticationsettingslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/authenticationSettingsListByHealthModelSample.ts
[discoveryrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/discoveryRulesCreateOrUpdateSample.ts
[discoveryrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/discoveryRulesDeleteSample.ts
[discoveryrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/discoveryRulesGetSample.ts
[discoveryruleslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/discoveryRulesListByHealthModelSample.ts
[entitiesadddataannotationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesAddDataAnnotationSample.ts
[entitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesCreateOrUpdateSample.ts
[entitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesDeleteSample.ts
[entitiesgetdataannotationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesGetDataAnnotationsSample.ts
[entitiesgethistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesGetHistorySample.ts
[entitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesGetSample.ts
[entitiesgetsignalhistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesGetSignalHistorySample.ts
[entitiesgetsignalrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesGetSignalRecommendationsSample.ts
[entitiesingesthealthreportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesIngestHealthReportSample.ts
[entitieslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/entitiesListByHealthModelSample.ts
[healthmodelscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/healthModelsCreateSample.ts
[healthmodelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/healthModelsDeleteSample.ts
[healthmodelsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/healthModelsGetSample.ts
[healthmodelslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/healthModelsListByResourceGroupSample.ts
[healthmodelslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/healthModelsListBySubscriptionSample.ts
[healthmodelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/healthModelsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/operationsListSample.ts
[relationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/relationshipsCreateOrUpdateSample.ts
[relationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/relationshipsDeleteSample.ts
[relationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/relationshipsGetSample.ts
[relationshipslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/relationshipsListByHealthModelSample.ts
[signaldefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/signalDefinitionsCreateOrUpdateSample.ts
[signaldefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/signalDefinitionsDeleteSample.ts
[signaldefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/signalDefinitionsGetSample.ts
[signaldefinitionslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/typescript/src/signalDefinitionsListByHealthModelSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-cloudhealth
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cloudhealth/arm-cloudhealth/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
