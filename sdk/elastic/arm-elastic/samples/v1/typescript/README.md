# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [allTrafficFiltersListSample.ts][alltrafficfilterslistsample]                                                         | Get the list of all traffic filters for the account. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AllTrafficFilters_list.json                                                                      |
| [associateTrafficFilterAssociateSample.ts][associatetrafficfilterassociatesample]                                     | Associate traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AssociateTrafficFilter_Update.json                                                                 |
| [billingInfoGetSample.ts][billinginfogetsample]                                                                       | Get marketplace and organization info mapped to the given monitor. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/BillingInfo_Get.json                                                               |
| [connectedPartnerResourcesListSample.ts][connectedpartnerresourceslistsample]                                         | List of all active deployments that are associated with the marketplace subscription linked to the given monitor. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ConnectedPartnerResources_List.json |
| [createAndAssociateIPFilterCreateSample.ts][createandassociateipfiltercreatesample]                                   | Create and Associate IP traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/IPTrafficFilter_Create.json                                                          |
| [createAndAssociatePlFilterCreateSample.ts][createandassociateplfiltercreatesample]                                   | Create and Associate private link traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/PrivateLinkTrafficFilters_Create.json                                      |
| [deploymentInfoListSample.ts][deploymentinfolistsample]                                                               | Fetch information regarding Elastic cloud deployment corresponding to the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DeploymentInfo_List.json                          |
| [detachAndDeleteTrafficFilterDeleteSample.ts][detachanddeletetrafficfilterdeletesample]                               | Detach and Delete traffic filter from the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DetachAndDeleteTrafficFilter_Delete.json                                                  |
| [detachTrafficFilterUpdateSample.ts][detachtrafficfilterupdatesample]                                                 | Detach traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DetachTrafficFilters_Update.json                                                                      |
| [elasticVersionsListSample.ts][elasticversionslistsample]                                                             | Get a list of available versions for a region. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ElasticVersions_List.json                                                                              |
| [externalUserCreateOrUpdateSample.ts][externalusercreateorupdatesample]                                               | Create User inside elastic deployment which are used by customers to perform operations on the elastic deployment x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ExternalUserInfo.json               |
| [listAssociatedTrafficFiltersListSample.ts][listassociatedtrafficfilterslistsample]                                   | Get the list of all associated traffic filters for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AssociatedFiltersForDeployment_list.json                                     |
| [monitorUpgradeSample.ts][monitorupgradesample]                                                                       | Upgradable version for a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitor_Upgrade.json                                                                                       |
| [monitoredResourcesListSample.ts][monitoredresourceslistsample]                                                       | List the resources currently being monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/MonitoredResources_List.json                                            |
| [monitorsCreateSample.ts][monitorscreatesample]                                                                       | Create a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Create.json                                                                                                       |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                                                       | Delete a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Delete.json                                                                                                       |
| [monitorsGetSample.ts][monitorsgetsample]                                                                             | Get the properties of a specific monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Get.json                                                                                  |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]                                             | List all monitors under the specified resource group. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_ListByResourceGroup.json                                                               |
| [monitorsListSample.ts][monitorslistsample]                                                                           | List all monitors under the specified subscription. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_List.json                                                                                |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                                                       | Update a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Update.json                                                                                                       |
| [openAiCreateOrUpdateSample.ts][openaicreateorupdatesample]                                                           | Create or update a OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_CreateOrUpdate.json                                                   |
| [openAiDeleteSample.ts][openaideletesample]                                                                           | Delete OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_Delete.json                                                                       |
| [openAiGetSample.ts][openaigetsample]                                                                                 | Get OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_Get.json                                                                             |
| [openAiGetStatusSample.ts][openaigetstatussample]                                                                     | Get OpenAI integration status for a given integration. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_GetStatus.json                                                                          |
| [openAiListSample.ts][openailistsample]                                                                               | List OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_List.json                                                                           |
| [operationsListSample.ts][operationslistsample]                                                                       | List all operations provided by Microsoft.Elastic. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Operations_List.json                                                                               |
| [organizationsGetApiKeySample.ts][organizationsgetapikeysample]                                                       | Fetch User API Key from internal database, if it was generated and stored while creating the Elasticsearch Organization. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Organizations_GetApiKey.json |
| [organizationsGetElasticToAzureSubscriptionMappingSample.ts][organizationsgetelastictoazuresubscriptionmappingsample] | Get Elastic Organization To Azure Subscription Mapping details for the logged-in user. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Organizations_GetElasticToAzureSubscriptionMapping.json        |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                                                       | Create or update a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_CreateOrUpdate.json                                                            |
| [tagRulesDeleteSample.ts][tagrulesdeletesample]                                                                       | Delete a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_Delete.json                                                                              |
| [tagRulesGetSample.ts][tagrulesgetsample]                                                                             | Get a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_Get.json                                                                                    |
| [tagRulesListSample.ts][tagruleslistsample]                                                                           | List the tag rules for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_List.json                                                                                   |
| [trafficFiltersDeleteSample.ts][trafficfiltersdeletesample]                                                           | Delete traffic filter from the account. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TrafficFilters_Delete.json                                                                                    |
| [upgradableVersionsDetailsSample.ts][upgradableversionsdetailssample]                                                 | List of upgradable versions for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/UpgradableVersions_Details.json                                                             |
| [vmCollectionUpdateSample.ts][vmcollectionupdatesample]                                                               | Update the vm details that will be monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/VMCollection_Update.json                                                |
| [vmHostListSample.ts][vmhostlistsample]                                                                               | List the vm resources currently being monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/VMHost_List.json                                                     |
| [vmIngestionDetailsSample.ts][vmingestiondetailssample]                                                               | List the vm ingestion details that will be monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/VMIngestion_Details.json                                        |

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
node dist/allTrafficFiltersListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ELASTIC_SUBSCRIPTION_ID="<elastic subscription id>" ELASTIC_RESOURCE_GROUP="<elastic resource group>" node dist/allTrafficFiltersListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alltrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/allTrafficFiltersListSample.ts
[associatetrafficfilterassociatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/associateTrafficFilterAssociateSample.ts
[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/billingInfoGetSample.ts
[connectedpartnerresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/connectedPartnerResourcesListSample.ts
[createandassociateipfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/createAndAssociateIPFilterCreateSample.ts
[createandassociateplfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/createAndAssociatePlFilterCreateSample.ts
[deploymentinfolistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/deploymentInfoListSample.ts
[detachanddeletetrafficfilterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/detachAndDeleteTrafficFilterDeleteSample.ts
[detachtrafficfilterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/detachTrafficFilterUpdateSample.ts
[elasticversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/elasticVersionsListSample.ts
[externalusercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/externalUserCreateOrUpdateSample.ts
[listassociatedtrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/listAssociatedTrafficFiltersListSample.ts
[monitorupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorUpgradeSample.ts
[monitoredresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitoredResourcesListSample.ts
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorsCreateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorsDeleteSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorsGetSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorsListSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/monitorsUpdateSample.ts
[openaicreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/openAiCreateOrUpdateSample.ts
[openaideletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/openAiDeleteSample.ts
[openaigetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/openAiGetSample.ts
[openaigetstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/openAiGetStatusSample.ts
[openailistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/openAiListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/operationsListSample.ts
[organizationsgetapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/organizationsGetApiKeySample.ts
[organizationsgetelastictoazuresubscriptionmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/organizationsGetElasticToAzureSubscriptionMappingSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/tagRulesDeleteSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/tagRulesGetSample.ts
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/tagRulesListSample.ts
[trafficfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/trafficFiltersDeleteSample.ts
[upgradableversionsdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/upgradableVersionsDetailsSample.ts
[vmcollectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/vmCollectionUpdateSample.ts
[vmhostlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/vmHostListSample.ts
[vmingestiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/typescript/src/vmIngestionDetailsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-elastic?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elastic/arm-elastic/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
