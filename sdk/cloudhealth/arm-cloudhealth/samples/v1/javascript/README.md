# @azure/arm-cloudhealth client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-cloudhealth in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [authenticationSettingsCreateOrUpdateSample.js][authenticationsettingscreateorupdatesample]       | create a AuthenticationSetting x-ms-original-file: 2026-11-01/AuthenticationSettings_CreateOrUpdate.json                                                                                   |
| [authenticationSettingsDeleteSample.js][authenticationsettingsdeletesample]                       | delete a AuthenticationSetting x-ms-original-file: 2026-11-01/AuthenticationSettings_Delete.json                                                                                           |
| [authenticationSettingsGetSample.js][authenticationsettingsgetsample]                             | get a AuthenticationSetting x-ms-original-file: 2026-11-01/AuthenticationSettings_Get.json                                                                                                 |
| [authenticationSettingsListByHealthModelSample.js][authenticationsettingslistbyhealthmodelsample] | list AuthenticationSetting resources by HealthModel x-ms-original-file: 2026-11-01/AuthenticationSettings_ListByHealthModel.json                                                           |
| [discoveryRulesCreateOrUpdateSample.js][discoveryrulescreateorupdatesample]                       | create a DiscoveryRule x-ms-original-file: 2026-11-01/DiscoveryRules_CreateOrUpdate.json                                                                                                   |
| [discoveryRulesDeleteSample.js][discoveryrulesdeletesample]                                       | delete a DiscoveryRule x-ms-original-file: 2026-11-01/DiscoveryRules_Delete.json                                                                                                           |
| [discoveryRulesGetSample.js][discoveryrulesgetsample]                                             | get a DiscoveryRule x-ms-original-file: 2026-11-01/DiscoveryRules_Get.json                                                                                                                 |
| [discoveryRulesListByHealthModelSample.js][discoveryruleslistbyhealthmodelsample]                 | list DiscoveryRule resources by HealthModel x-ms-original-file: 2026-11-01/DiscoveryRules_ListByHealthModel.json                                                                           |
| [entitiesAddDataAnnotationSample.js][entitiesadddataannotationsample]                             | add a data annotation to an entity x-ms-original-file: 2026-11-01/Entities_AddDataAnnotation.json                                                                                          |
| [entitiesCreateOrUpdateSample.js][entitiescreateorupdatesample]                                   | create a Entity x-ms-original-file: 2026-11-01/Entities_CreateOrUpdate.json                                                                                                                |
| [entitiesDeleteSample.js][entitiesdeletesample]                                                   | delete a Entity x-ms-original-file: 2026-11-01/Entities_Delete.json                                                                                                                        |
| [entitiesGetDataAnnotationsSample.js][entitiesgetdataannotationssample]                           | retrieve data annotations for an entity x-ms-original-file: 2026-11-01/Entities_GetDataAnnotations.json                                                                                    |
| [entitiesGetHistorySample.js][entitiesgethistorysample]                                           | retrieve the health state transition history for an entity x-ms-original-file: 2026-11-01/Entities_GetHistory.json                                                                         |
| [entitiesGetSample.js][entitiesgetsample]                                                         | get a Entity x-ms-original-file: 2026-11-01/Entities_Get.json                                                                                                                              |
| [entitiesGetSignalHistorySample.js][entitiesgetsignalhistorysample]                               | retrieve the time series history for a signal on an entity x-ms-original-file: 2026-11-01/Entities_GetSignalHistory.json                                                                   |
| [entitiesGetSignalRecommendationsSample.js][entitiesgetsignalrecommendationssample]               | get recommended signal configurations for a given Entity (only applicable for Entities representing Azure resources) x-ms-original-file: 2026-11-01/Entities_GetSignalRecommendations.json |
| [entitiesIngestHealthReportSample.js][entitiesingesthealthreportsample]                           | ingest a health report for a specific signal on an entity (the entity must already exist) x-ms-original-file: 2026-11-01/Entities_IngestHealthReport.json                                  |
| [entitiesListByHealthModelSample.js][entitieslistbyhealthmodelsample]                             | list Entity resources by HealthModel x-ms-original-file: 2026-11-01/Entities_ListByHealthModel.json                                                                                        |
| [healthModelsCreateSample.js][healthmodelscreatesample]                                           | create a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Create.json                                                                                                               |
| [healthModelsDeleteSample.js][healthmodelsdeletesample]                                           | delete a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Delete.json                                                                                                               |
| [healthModelsGetSample.js][healthmodelsgetsample]                                                 | get a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Get.json                                                                                                                     |
| [healthModelsListByResourceGroupSample.js][healthmodelslistbyresourcegroupsample]                 | list HealthModel resources by resource group x-ms-original-file: 2026-11-01/HealthModels_ListByResourceGroup.json                                                                          |
| [healthModelsListBySubscriptionSample.js][healthmodelslistbysubscriptionsample]                   | list HealthModel resources by subscription ID x-ms-original-file: 2026-11-01/HealthModels_ListBySubscription.json                                                                          |
| [healthModelsUpdateSample.js][healthmodelsupdatesample]                                           | update a HealthModel x-ms-original-file: 2026-11-01/HealthModels_Update.json                                                                                                               |
| [operationsListSample.js][operationslistsample]                                                   | list the operations for the provider x-ms-original-file: 2026-11-01/Operations_List.json                                                                                                   |
| [relationshipsCreateOrUpdateSample.js][relationshipscreateorupdatesample]                         | create a Relationship x-ms-original-file: 2026-11-01/Relationships_CreateOrUpdate.json                                                                                                     |
| [relationshipsDeleteSample.js][relationshipsdeletesample]                                         | delete a Relationship x-ms-original-file: 2026-11-01/Relationships_Delete.json                                                                                                             |
| [relationshipsGetSample.js][relationshipsgetsample]                                               | get a Relationship x-ms-original-file: 2026-11-01/Relationships_Get.json                                                                                                                   |
| [relationshipsListByHealthModelSample.js][relationshipslistbyhealthmodelsample]                   | list Relationship resources by HealthModel x-ms-original-file: 2026-11-01/Relationships_ListByHealthModel.json                                                                             |
| [signalDefinitionsCreateOrUpdateSample.js][signaldefinitionscreateorupdatesample]                 | create a SignalDefinition x-ms-original-file: 2026-11-01/SignalDefinitions_CreateOrUpdate.json                                                                                             |
| [signalDefinitionsDeleteSample.js][signaldefinitionsdeletesample]                                 | delete a SignalDefinition x-ms-original-file: 2026-11-01/SignalDefinitions_Delete.json                                                                                                     |
| [signalDefinitionsGetSample.js][signaldefinitionsgetsample]                                       | get a SignalDefinition x-ms-original-file: 2026-11-01/SignalDefinitions_Get.json                                                                                                           |
| [signalDefinitionsListByHealthModelSample.js][signaldefinitionslistbyhealthmodelsample]           | list SignalDefinition resources by HealthModel x-ms-original-file: 2026-11-01/SignalDefinitions_ListByHealthModel.json                                                                     |

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
node authenticationSettingsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node authenticationSettingsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authenticationsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/authenticationSettingsCreateOrUpdateSample.js
[authenticationsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/authenticationSettingsDeleteSample.js
[authenticationsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/authenticationSettingsGetSample.js
[authenticationsettingslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/authenticationSettingsListByHealthModelSample.js
[discoveryrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/discoveryRulesCreateOrUpdateSample.js
[discoveryrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/discoveryRulesDeleteSample.js
[discoveryrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/discoveryRulesGetSample.js
[discoveryruleslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/discoveryRulesListByHealthModelSample.js
[entitiesadddataannotationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesAddDataAnnotationSample.js
[entitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesCreateOrUpdateSample.js
[entitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesDeleteSample.js
[entitiesgetdataannotationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesGetDataAnnotationsSample.js
[entitiesgethistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesGetHistorySample.js
[entitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesGetSample.js
[entitiesgetsignalhistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesGetSignalHistorySample.js
[entitiesgetsignalrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesGetSignalRecommendationsSample.js
[entitiesingesthealthreportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesIngestHealthReportSample.js
[entitieslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/entitiesListByHealthModelSample.js
[healthmodelscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/healthModelsCreateSample.js
[healthmodelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/healthModelsDeleteSample.js
[healthmodelsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/healthModelsGetSample.js
[healthmodelslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/healthModelsListByResourceGroupSample.js
[healthmodelslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/healthModelsListBySubscriptionSample.js
[healthmodelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/healthModelsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/operationsListSample.js
[relationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/relationshipsCreateOrUpdateSample.js
[relationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/relationshipsDeleteSample.js
[relationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/relationshipsGetSample.js
[relationshipslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/relationshipsListByHealthModelSample.js
[signaldefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/signalDefinitionsCreateOrUpdateSample.js
[signaldefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/signalDefinitionsDeleteSample.js
[signaldefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/signalDefinitionsGetSample.js
[signaldefinitionslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1/javascript/signalDefinitionsListByHealthModelSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-cloudhealth
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cloudhealth/arm-cloudhealth/README.md
