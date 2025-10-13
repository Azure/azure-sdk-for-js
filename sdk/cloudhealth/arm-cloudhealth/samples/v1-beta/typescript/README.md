# @azure/arm-cloudhealth client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-cloudhealth in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [authenticationSettingsCreateOrUpdateSample.ts][authenticationsettingscreateorupdatesample]       | create a AuthenticationSetting x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_CreateOrUpdate.json                         |
| [authenticationSettingsDeleteSample.ts][authenticationsettingsdeletesample]                       | delete a AuthenticationSetting x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_Delete.json                                 |
| [authenticationSettingsGetSample.ts][authenticationsettingsgetsample]                             | get a AuthenticationSetting x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_Get.json                                       |
| [authenticationSettingsListByHealthModelSample.ts][authenticationsettingslistbyhealthmodelsample] | list AuthenticationSetting resources by HealthModel x-ms-original-file: 2025-05-01-preview/AuthenticationSettings_ListByHealthModel.json |
| [discoveryRulesCreateOrUpdateSample.ts][discoveryrulescreateorupdatesample]                       | create a DiscoveryRule x-ms-original-file: 2025-05-01-preview/DiscoveryRules_CreateOrUpdate.json                                         |
| [discoveryRulesDeleteSample.ts][discoveryrulesdeletesample]                                       | delete a DiscoveryRule x-ms-original-file: 2025-05-01-preview/DiscoveryRules_Delete.json                                                 |
| [discoveryRulesGetSample.ts][discoveryrulesgetsample]                                             | get a DiscoveryRule x-ms-original-file: 2025-05-01-preview/DiscoveryRules_Get.json                                                       |
| [discoveryRulesListByHealthModelSample.ts][discoveryruleslistbyhealthmodelsample]                 | list DiscoveryRule resources by HealthModel x-ms-original-file: 2025-05-01-preview/DiscoveryRules_ListByHealthModel.json                 |
| [entitiesCreateOrUpdateSample.ts][entitiescreateorupdatesample]                                   | create a Entity x-ms-original-file: 2025-05-01-preview/Entities_CreateOrUpdate.json                                                      |
| [entitiesDeleteSample.ts][entitiesdeletesample]                                                   | delete a Entity x-ms-original-file: 2025-05-01-preview/Entities_Delete.json                                                              |
| [entitiesGetSample.ts][entitiesgetsample]                                                         | get a Entity x-ms-original-file: 2025-05-01-preview/Entities_Get.json                                                                    |
| [entitiesListByHealthModelSample.ts][entitieslistbyhealthmodelsample]                             | list Entity resources by HealthModel x-ms-original-file: 2025-05-01-preview/Entities_ListByHealthModel.json                              |
| [healthModelsCreateSample.ts][healthmodelscreatesample]                                           | create a HealthModel x-ms-original-file: 2025-05-01-preview/HealthModels_Create.json                                                     |
| [healthModelsDeleteSample.ts][healthmodelsdeletesample]                                           | delete a HealthModel x-ms-original-file: 2025-05-01-preview/HealthModels_Delete.json                                                     |
| [healthModelsGetSample.ts][healthmodelsgetsample]                                                 | get a HealthModel x-ms-original-file: 2025-05-01-preview/HealthModels_Get.json                                                           |
| [healthModelsListByResourceGroupSample.ts][healthmodelslistbyresourcegroupsample]                 | list HealthModel resources by resource group x-ms-original-file: 2025-05-01-preview/HealthModels_ListByResourceGroup.json                |
| [healthModelsListBySubscriptionSample.ts][healthmodelslistbysubscriptionsample]                   | list HealthModel resources by subscription ID x-ms-original-file: 2025-05-01-preview/HealthModels_ListBySubscription.json                |
| [healthModelsUpdateSample.ts][healthmodelsupdatesample]                                           | update a HealthModel x-ms-original-file: 2025-05-01-preview/HealthModels_Update.json                                                     |
| [operationsListSample.ts][operationslistsample]                                                   | list the operations for the provider x-ms-original-file: 2025-05-01-preview/Operations_List.json                                         |
| [relationshipsCreateOrUpdateSample.ts][relationshipscreateorupdatesample]                         | create a Relationship x-ms-original-file: 2025-05-01-preview/Relationships_CreateOrUpdate.json                                           |
| [relationshipsDeleteSample.ts][relationshipsdeletesample]                                         | delete a Relationship x-ms-original-file: 2025-05-01-preview/Relationships_Delete.json                                                   |
| [relationshipsGetSample.ts][relationshipsgetsample]                                               | get a Relationship x-ms-original-file: 2025-05-01-preview/Relationships_Get.json                                                         |
| [relationshipsListByHealthModelSample.ts][relationshipslistbyhealthmodelsample]                   | list Relationship resources by HealthModel x-ms-original-file: 2025-05-01-preview/Relationships_ListByHealthModel.json                   |
| [signalDefinitionsCreateOrUpdateSample.ts][signaldefinitionscreateorupdatesample]                 | create a SignalDefinition x-ms-original-file: 2025-05-01-preview/SignalDefinitions_CreateOrUpdate.json                                   |
| [signalDefinitionsDeleteSample.ts][signaldefinitionsdeletesample]                                 | delete a SignalDefinition x-ms-original-file: 2025-05-01-preview/SignalDefinitions_Delete.json                                           |
| [signalDefinitionsGetSample.ts][signaldefinitionsgetsample]                                       | get a SignalDefinition x-ms-original-file: 2025-05-01-preview/SignalDefinitions_Get.json                                                 |
| [signalDefinitionsListByHealthModelSample.ts][signaldefinitionslistbyhealthmodelsample]           | list SignalDefinition resources by HealthModel x-ms-original-file: 2025-05-01-preview/SignalDefinitions_ListByHealthModel.json           |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/authenticationSettingsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[authenticationsettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/authenticationSettingsCreateOrUpdateSample.ts
[authenticationsettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/authenticationSettingsDeleteSample.ts
[authenticationsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/authenticationSettingsGetSample.ts
[authenticationsettingslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/authenticationSettingsListByHealthModelSample.ts
[discoveryrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/discoveryRulesCreateOrUpdateSample.ts
[discoveryrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/discoveryRulesDeleteSample.ts
[discoveryrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/discoveryRulesGetSample.ts
[discoveryruleslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/discoveryRulesListByHealthModelSample.ts
[entitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/entitiesCreateOrUpdateSample.ts
[entitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/entitiesDeleteSample.ts
[entitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/entitiesGetSample.ts
[entitieslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/entitiesListByHealthModelSample.ts
[healthmodelscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/healthModelsCreateSample.ts
[healthmodelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/healthModelsDeleteSample.ts
[healthmodelsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/healthModelsGetSample.ts
[healthmodelslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/healthModelsListByResourceGroupSample.ts
[healthmodelslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/healthModelsListBySubscriptionSample.ts
[healthmodelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/healthModelsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/operationsListSample.ts
[relationshipscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/relationshipsCreateOrUpdateSample.ts
[relationshipsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/relationshipsDeleteSample.ts
[relationshipsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/relationshipsGetSample.ts
[relationshipslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/relationshipsListByHealthModelSample.ts
[signaldefinitionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/signalDefinitionsCreateOrUpdateSample.ts
[signaldefinitionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/signalDefinitionsDeleteSample.ts
[signaldefinitionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/signalDefinitionsGetSample.ts
[signaldefinitionslistbyhealthmodelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cloudhealth/arm-cloudhealth/samples/v1-beta/typescript/src/signalDefinitionsListByHealthModelSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-cloudhealth?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cloudhealth/arm-cloudhealth/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
