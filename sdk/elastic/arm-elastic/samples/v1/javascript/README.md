# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [allTrafficFiltersListSample.js][alltrafficfilterslistsample]                                                         | Get the list of all traffic filters for the account. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AllTrafficFilters_list.json                                                                      |
| [associateTrafficFilterAssociateSample.js][associatetrafficfilterassociatesample]                                     | Associate traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AssociateTrafficFilter_Update.json                                                                 |
| [billingInfoGetSample.js][billinginfogetsample]                                                                       | Get marketplace and organization info mapped to the given monitor. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/BillingInfo_Get.json                                                               |
| [connectedPartnerResourcesListSample.js][connectedpartnerresourceslistsample]                                         | List of all active deployments that are associated with the marketplace subscription linked to the given monitor. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ConnectedPartnerResources_List.json |
| [createAndAssociateIPFilterCreateSample.js][createandassociateipfiltercreatesample]                                   | Create and Associate IP traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/IPTrafficFilter_Create.json                                                          |
| [createAndAssociatePlFilterCreateSample.js][createandassociateplfiltercreatesample]                                   | Create and Associate private link traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/PrivateLinkTrafficFilters_Create.json                                      |
| [deploymentInfoListSample.js][deploymentinfolistsample]                                                               | Fetch information regarding Elastic cloud deployment corresponding to the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DeploymentInfo_List.json                          |
| [detachAndDeleteTrafficFilterDeleteSample.js][detachanddeletetrafficfilterdeletesample]                               | Detach and Delete traffic filter from the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DetachAndDeleteTrafficFilter_Delete.json                                                  |
| [detachTrafficFilterUpdateSample.js][detachtrafficfilterupdatesample]                                                 | Detach traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/DetachTrafficFilters_Update.json                                                                      |
| [elasticVersionsListSample.js][elasticversionslistsample]                                                             | Get a list of available versions for a region. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ElasticVersions_List.json                                                                              |
| [externalUserCreateOrUpdateSample.js][externalusercreateorupdatesample]                                               | Create User inside elastic deployment which are used by customers to perform operations on the elastic deployment x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/ExternalUserInfo.json               |
| [listAssociatedTrafficFiltersListSample.js][listassociatedtrafficfilterslistsample]                                   | Get the list of all associated traffic filters for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/AssociatedFiltersForDeployment_list.json                                     |
| [monitorUpgradeSample.js][monitorupgradesample]                                                                       | Upgradable version for a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitor_Upgrade.json                                                                                       |
| [monitoredResourcesListSample.js][monitoredresourceslistsample]                                                       | List the resources currently being monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/MonitoredResources_List.json                                            |
| [monitorsCreateSample.js][monitorscreatesample]                                                                       | Create a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Create.json                                                                                                       |
| [monitorsDeleteSample.js][monitorsdeletesample]                                                                       | Delete a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Delete.json                                                                                                       |
| [monitorsGetSample.js][monitorsgetsample]                                                                             | Get the properties of a specific monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Get.json                                                                                  |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample]                                             | List all monitors under the specified resource group. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_ListByResourceGroup.json                                                               |
| [monitorsListSample.js][monitorslistsample]                                                                           | List all monitors under the specified subscription. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_List.json                                                                                |
| [monitorsUpdateSample.js][monitorsupdatesample]                                                                       | Update a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Monitors_Update.json                                                                                                       |
| [openAiCreateOrUpdateSample.js][openaicreateorupdatesample]                                                           | Create or update a OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_CreateOrUpdate.json                                                   |
| [openAiDeleteSample.js][openaideletesample]                                                                           | Delete OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_Delete.json                                                                       |
| [openAiGetSample.js][openaigetsample]                                                                                 | Get OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_Get.json                                                                             |
| [openAiGetStatusSample.js][openaigetstatussample]                                                                     | Get OpenAI integration status for a given integration. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_GetStatus.json                                                                          |
| [openAiListSample.js][openailistsample]                                                                               | List OpenAI integration rule for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/OpenAI_List.json                                                                           |
| [operationsListSample.js][operationslistsample]                                                                       | List all operations provided by Microsoft.Elastic. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Operations_List.json                                                                               |
| [organizationsGetApiKeySample.js][organizationsgetapikeysample]                                                       | Fetch User API Key from internal database, if it was generated and stored while creating the Elasticsearch Organization. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Organizations_GetApiKey.json |
| [organizationsGetElasticToAzureSubscriptionMappingSample.js][organizationsgetelastictoazuresubscriptionmappingsample] | Get Elastic Organization To Azure Subscription Mapping details for the logged-in user. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/Organizations_GetElasticToAzureSubscriptionMapping.json        |
| [tagRulesCreateOrUpdateSample.js][tagrulescreateorupdatesample]                                                       | Create or update a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_CreateOrUpdate.json                                                            |
| [tagRulesDeleteSample.js][tagrulesdeletesample]                                                                       | Delete a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_Delete.json                                                                              |
| [tagRulesGetSample.js][tagrulesgetsample]                                                                             | Get a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_Get.json                                                                                    |
| [tagRulesListSample.js][tagruleslistsample]                                                                           | List the tag rules for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TagRules_List.json                                                                                   |
| [trafficFiltersDeleteSample.js][trafficfiltersdeletesample]                                                           | Delete traffic filter from the account. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/TrafficFilters_Delete.json                                                                                    |
| [upgradableVersionsDetailsSample.js][upgradableversionsdetailssample]                                                 | List of upgradable versions for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/UpgradableVersions_Details.json                                                             |
| [vmCollectionUpdateSample.js][vmcollectionupdatesample]                                                               | Update the vm details that will be monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/VMCollection_Update.json                                                |
| [vmHostListSample.js][vmhostlistsample]                                                                               | List the vm resources currently being monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/VMHost_List.json                                                     |
| [vmIngestionDetailsSample.js][vmingestiondetailssample]                                                               | List the vm ingestion details that will be monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2024-03-01/examples/VMIngestion_Details.json                                        |

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
node allTrafficFiltersListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env ELASTIC_SUBSCRIPTION_ID="<elastic subscription id>" ELASTIC_RESOURCE_GROUP="<elastic resource group>" node allTrafficFiltersListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alltrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/allTrafficFiltersListSample.js
[associatetrafficfilterassociatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/associateTrafficFilterAssociateSample.js
[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/billingInfoGetSample.js
[connectedpartnerresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/connectedPartnerResourcesListSample.js
[createandassociateipfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/createAndAssociateIPFilterCreateSample.js
[createandassociateplfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/createAndAssociatePlFilterCreateSample.js
[deploymentinfolistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/deploymentInfoListSample.js
[detachanddeletetrafficfilterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/detachAndDeleteTrafficFilterDeleteSample.js
[detachtrafficfilterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/detachTrafficFilterUpdateSample.js
[elasticversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/elasticVersionsListSample.js
[externalusercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/externalUserCreateOrUpdateSample.js
[listassociatedtrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/listAssociatedTrafficFiltersListSample.js
[monitorupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorUpgradeSample.js
[monitoredresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitoredResourcesListSample.js
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorsCreateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorsDeleteSample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorsGetSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorsListByResourceGroupSample.js
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorsListSample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/monitorsUpdateSample.js
[openaicreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/openAiCreateOrUpdateSample.js
[openaideletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/openAiDeleteSample.js
[openaigetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/openAiGetSample.js
[openaigetstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/openAiGetStatusSample.js
[openailistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/openAiListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/operationsListSample.js
[organizationsgetapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/organizationsGetApiKeySample.js
[organizationsgetelastictoazuresubscriptionmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/organizationsGetElasticToAzureSubscriptionMappingSample.js
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/tagRulesCreateOrUpdateSample.js
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/tagRulesDeleteSample.js
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/tagRulesGetSample.js
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/tagRulesListSample.js
[trafficfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/trafficFiltersDeleteSample.js
[upgradableversionsdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/upgradableVersionsDetailsSample.js
[vmcollectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/vmCollectionUpdateSample.js
[vmhostlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/vmHostListSample.js
[vmingestiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1/javascript/vmIngestionDetailsSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-elastic?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elastic/arm-elastic/README.md
