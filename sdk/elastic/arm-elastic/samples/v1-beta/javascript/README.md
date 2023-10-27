# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [allTrafficFiltersListSample.js][alltrafficfilterslistsample]                           | Get the list of all traffic filters for the account. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/AllTrafficFilters_list.json                                                                      |
| [associateTrafficFilterAssociateSample.js][associatetrafficfilterassociatesample]       | Associate traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/AssociateTrafficFilter_Update.json                                                                 |
| [createAndAssociateIPFilterCreateSample.js][createandassociateipfiltercreatesample]     | Create and Associate IP traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/IPTrafficFilter_Create.json                                                          |
| [createAndAssociatePlFilterCreateSample.js][createandassociateplfiltercreatesample]     | Create and Associate private link traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/PrivateLinkTrafficFilters_Create.json                                      |
| [deploymentInfoListSample.js][deploymentinfolistsample]                                 | Fetch information regarding Elastic cloud deployment corresponding to the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/DeploymentInfo_List.json                          |
| [detachAndDeleteTrafficFilterDeleteSample.js][detachanddeletetrafficfilterdeletesample] | Detach and Delete traffic filter from the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/DetachAndDeleteTrafficFilter_Delete.json                                                  |
| [detachTrafficFilterUpdateSample.js][detachtrafficfilterupdatesample]                   | Detach traffic filter for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/DetachTrafficFilters_Update.json                                                                      |
| [elasticVersionsListSample.js][elasticversionslistsample]                               | Get a list of available versions for a region. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/ElasticVersions_List.json                                                                              |
| [externalUserCreateOrUpdateSample.js][externalusercreateorupdatesample]                 | Create User inside elastic deployment which are used by customers to perform operations on the elastic deployment x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/ExternalUserInfo.json               |
| [listAssociatedTrafficFiltersListSample.js][listassociatedtrafficfilterslistsample]     | Get the list of all associated traffic filters for the given deployment. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/AssociatedFiltersForDeployment_list.json                                     |
| [monitorUpgradeSample.js][monitorupgradesample]                                         | Upgradable version for a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitor_Upgrade.json                                                                                       |
| [monitoredResourcesListSample.js][monitoredresourceslistsample]                         | List the resources currently being monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/MonitoredResources_List.json                                            |
| [monitorsCreateSample.js][monitorscreatesample]                                         | Create a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitors_Create.json                                                                                                       |
| [monitorsDeleteSample.js][monitorsdeletesample]                                         | Delete a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitors_Delete.json                                                                                                       |
| [monitorsGetSample.js][monitorsgetsample]                                               | Get the properties of a specific monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitors_Get.json                                                                                  |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample]               | List all monitors under the specified resource group. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitors_ListByResourceGroup.json                                                               |
| [monitorsListSample.js][monitorslistsample]                                             | List all monitors under the specified subscription. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitors_List.json                                                                                |
| [monitorsUpdateSample.js][monitorsupdatesample]                                         | Update a monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Monitors_Update.json                                                                                                       |
| [operationsListSample.js][operationslistsample]                                         | List all operations provided by Microsoft.Elastic. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Operations_List.json                                                                               |
| [organizationsGetApiKeySample.js][organizationsgetapikeysample]                         | Fetch User API Key from internal database, if it was generated and stored while creating the Elasticsearch Organization. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/Organizations_GetApiKey.json |
| [tagRulesCreateOrUpdateSample.js][tagrulescreateorupdatesample]                         | Create or update a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/TagRules_CreateOrUpdate.json                                                            |
| [tagRulesDeleteSample.js][tagrulesdeletesample]                                         | Delete a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/TagRules_Delete.json                                                                              |
| [tagRulesGetSample.js][tagrulesgetsample]                                               | Get a tag rule set for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/TagRules_Get.json                                                                                    |
| [tagRulesListSample.js][tagruleslistsample]                                             | List the tag rules for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/TagRules_List.json                                                                                   |
| [trafficFiltersDeleteSample.js][trafficfiltersdeletesample]                             | Delete traffic filter from the account. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/TrafficFilters_Delete.json                                                                                    |
| [upgradableVersionsDetailsSample.js][upgradableversionsdetailssample]                   | List of upgradable versions for a given monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/UpgradableVersions_Details.json                                                             |
| [vmCollectionUpdateSample.js][vmcollectionupdatesample]                                 | Update the vm details that will be monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/VMCollection_Update.json                                                |
| [vmHostListSample.js][vmhostlistsample]                                                 | List the vm resources currently being monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/VMHost_List.json                                                     |
| [vmIngestionDetailsSample.js][vmingestiondetailssample]                                 | List the vm ingestion details that will be monitored by the Elastic monitor resource. x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/preview/2023-02-01-preview/examples/VMIngestion_Details.json                                        |

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
npx cross-env ELASTIC_SUBSCRIPTION_ID="<elastic subscription id>" ELASTIC_RESOURCE_GROUP="<elastic resource group>" node allTrafficFiltersListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alltrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/allTrafficFiltersListSample.js
[associatetrafficfilterassociatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/associateTrafficFilterAssociateSample.js
[createandassociateipfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/createAndAssociateIPFilterCreateSample.js
[createandassociateplfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/createAndAssociatePlFilterCreateSample.js
[deploymentinfolistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/deploymentInfoListSample.js
[detachanddeletetrafficfilterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/detachAndDeleteTrafficFilterDeleteSample.js
[detachtrafficfilterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/detachTrafficFilterUpdateSample.js
[elasticversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/elasticVersionsListSample.js
[externalusercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/externalUserCreateOrUpdateSample.js
[listassociatedtrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/listAssociatedTrafficFiltersListSample.js
[monitorupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorUpgradeSample.js
[monitoredresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitoredResourcesListSample.js
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorsCreateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorsDeleteSample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorsGetSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorsListByResourceGroupSample.js
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorsListSample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/monitorsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/operationsListSample.js
[organizationsgetapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/organizationsGetApiKeySample.js
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/tagRulesCreateOrUpdateSample.js
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/tagRulesDeleteSample.js
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/tagRulesGetSample.js
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/tagRulesListSample.js
[trafficfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/trafficFiltersDeleteSample.js
[upgradableversionsdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/upgradableVersionsDetailsSample.js
[vmcollectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/vmCollectionUpdateSample.js
[vmhostlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/vmHostListSample.js
[vmingestiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v1-beta/javascript/vmIngestionDetailsSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-elastic?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elastic/arm-elastic/README.md
