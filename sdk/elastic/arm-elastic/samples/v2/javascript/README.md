# @azure/arm-elastic client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-elastic in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [allTrafficFiltersListSample.js][alltrafficfilterslistsample]                                                         | list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. x-ms-original-file: 2025-06-01/AllTrafficFilters_list.json                                 |
| [associateTrafficFilterAssociateSample.js][associatetrafficfilterassociatesample]                                     | associate a traffic filter with your Elastic monitor resource to control and manage network traffic. x-ms-original-file: 2025-06-01/AssociateTrafficFilter_Update.json                                         |
| [billingInfoGetSample.js][billinginfogetsample]                                                                       | retrieve marketplace and organization billing information mapped to the given Elastic monitor resource. x-ms-original-file: 2025-06-01/BillingInfo_Get.json                                                    |
| [connectedPartnerResourcesListSample.js][connectedpartnerresourceslistsample]                                         | list all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource. x-ms-original-file: 2025-06-01/ConnectedPartnerResources_List.json                      |
| [createAndAssociateIPFilterCreateSample.js][createandassociateipfiltercreatesample]                                   | create and associate an IP filter with your Elastic monitor resource to control and manage network traffic. x-ms-original-file: 2025-06-01/IPTrafficFilter_Create.json                                         |
| [createAndAssociatePLFilterCreateSample.js][createandassociateplfiltercreatesample]                                   | create and associate a PL filter with your Elastic monitor resource to control and manage network traffic. x-ms-original-file: 2025-06-01/PrivateLinkTrafficFilters_Create.json                                |
| [deploymentInfoListSample.js][deploymentinfolistsample]                                                               | fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource. x-ms-original-file: 2025-06-01/DeploymentInfo_List.json                                              |
| [detachAndDeleteTrafficFilterDeleteSample.js][detachanddeletetrafficfilterdeletesample]                               | detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. x-ms-original-file: 2025-06-01/DetachAndDeleteTrafficFilter_Delete.json    |
| [detachTrafficFilterUpdateSample.js][detachtrafficfilterupdatesample]                                                 | detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. x-ms-original-file: 2025-06-01/DetachTrafficFilters_Update.json                       |
| [elasticVersionsListSample.js][elasticversionslistsample]                                                             | retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment. x-ms-original-file: 2025-06-01/ElasticVersions_List.json                    |
| [externalUserCreateOrUpdateSample.js][externalusercreateorupdatesample]                                               | create or update external user configurations for your Elastic monitor resource, enabling access and management by external users. x-ms-original-file: 2025-06-01/ExternalUserInfo.json                        |
| [listAssociatedTrafficFiltersListSample.js][listassociatedtrafficfilterslistsample]                                   | list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. x-ms-original-file: 2025-06-01/AssociatedFiltersForDeployment_list.json                    |
| [monitorUpgradeSample.js][monitorupgradesample]                                                                       | upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/Monitor_Upgrade.json                                                   |
| [monitoredResourcesListSample.js][monitoredresourceslistsample]                                                       | list all resources currently being monitored by the Elastic monitor resource, helping you manage observability. x-ms-original-file: 2025-06-01/MonitoredResources_List.json                                    |
| [monitoredSubscriptionsCreateorUpdateSample.js][monitoredsubscriptionscreateorupdatesample]                           | add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_CreateorUpdate.json                            |
| [monitoredSubscriptionsDeleteSample.js][monitoredsubscriptionsdeletesample]                                           | delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Delete.json              |
| [monitoredSubscriptionsGetSample.js][monitoredsubscriptionsgetsample]                                                 | get detailed information about all subscriptions currently being monitored by the Elastic monitor resource. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Get.json                                     |
| [monitoredSubscriptionsListSample.js][monitoredsubscriptionslistsample]                                               | list all subscriptions currently being monitored by the Elastic monitor resource, helping you manage observability. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_List.json                            |
| [monitoredSubscriptionsUpdateSample.js][monitoredsubscriptionsupdatesample]                                           | update subscriptions to be monitored by the Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Update.json                        |
| [monitorsCreateSample.js][monitorscreatesample]                                                                       | create a new Elastic monitor resource in your Azure subscription, enabling observability and monitoring of your Azure resources through Elastic. x-ms-original-file: 2025-06-01/Monitors_Create.json           |
| [monitorsDeleteSample.js][monitorsdeletesample]                                                                       | delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities. x-ms-original-file: 2025-06-01/Monitors_Delete.json                          |
| [monitorsGetSample.js][monitorsgetsample]                                                                             | get detailed properties of a specific Elastic monitor resource, helping you manage observability and performance. x-ms-original-file: 2025-06-01/Monitors_Get.json                                             |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample]                                             | list all Elastic monitor resources within a specified resource group of the subscription, helping you audit and manage your monitoring setup. x-ms-original-file: 2025-06-01/Monitors_ListByResourceGroup.json |
| [monitorsListSample.js][monitorslistsample]                                                                           | list all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup. x-ms-original-file: 2025-06-01/Monitors_List.json                                      |
| [monitorsUpdateSample.js][monitorsupdatesample]                                                                       | update an existing Elastic monitor resource in your Azure subscription, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/Monitors_Update.json                                    |
| [openAICreateOrUpdateSample.js][openaicreateorupdatesample]                                                           | create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring. x-ms-original-file: 2025-06-01/OpenAI_CreateOrUpdate.json          |
| [openAIDeleteSample.js][openaideletesample]                                                                           | delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities. x-ms-original-file: 2025-06-01/OpenAI_Delete.json                        |
| [openAIGetSample.js][openaigetsample]                                                                                 | get detailed information about OpenAI integration rules for a given Elastic monitor resource. x-ms-original-file: 2025-06-01/OpenAI_Get.json                                                                   |
| [openAIGetStatusSample.js][openaigetstatussample]                                                                     | get the status of OpenAI integration for a given Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/OpenAI_GetStatus.json                                |
| [openAIListSample.js][openailistsample]                                                                               | list all OpenAI integration rules for a given Elastic monitor resource, helping you manage AI-driven observability and monitoring. x-ms-original-file: 2025-06-01/OpenAI_List.json                             |
| [organizationsGetApiKeySample.js][organizationsgetapikeysample]                                                       | fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization. x-ms-original-file: 2025-06-01/Organizations_GetApiKey.json           |
| [organizationsGetElasticToAzureSubscriptionMappingSample.js][organizationsgetelastictoazuresubscriptionmappingsample] | >; /\*\* Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user. x-ms-original-file: 2025-06-01/Organizations_GetElasticToAzureSubscriptionMapping.json       |
| [organizationsResubscribeSample.js][organizationsresubscribesample]                                                   | resubscribe the Elasticsearch Organization. x-ms-original-file: 2025-06-01/Organizations_Resubscribe.json                                                                                                      |
| [tagRulesCreateOrUpdateSample.js][tagrulescreateorupdatesample]                                                       | create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags. x-ms-original-file: 2025-06-01/TagRules_CreateOrUpdate.json     |
| [tagRulesDeleteSample.js][tagrulesdeletesample]                                                                       | delete a tag rule set for a given Elastic monitor resource, removing fine-grained control over observability based on resource tags. x-ms-original-file: 2025-06-01/TagRules_Delete.json                       |
| [tagRulesGetSample.js][tagrulesgetsample]                                                                             | get detailed information about a tag rule set for a given Elastic monitor resource. x-ms-original-file: 2025-06-01/TagRules_Get.json                                                                           |
| [tagRulesListSample.js][tagruleslistsample]                                                                           | list all tag rules for a given Elastic monitor resource, helping you manage fine-grained control over observability based on resource tags. x-ms-original-file: 2025-06-01/TagRules_List.json                  |
| [trafficFiltersDeleteSample.js][trafficfiltersdeletesample]                                                           | delete an existing traffic filter associated with your Elastic monitor resource, removing its network traffic control capabilities. x-ms-original-file: 2025-06-01/TrafficFilters_Delete.json                  |
| [upgradableVersionsDetailsSample.js][upgradableversionsdetailssample]                                                 | list all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades. x-ms-original-file: 2025-06-01/UpgradableVersions_Details.json                                          |
| [vmCollectionUpdateSample.js][vmcollectionupdatesample]                                                               | update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/VMCollection_Update.json                          |
| [vmHostListSample.js][vmhostlistsample]                                                                               | list all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability. x-ms-original-file: 2025-06-01/VMHost_List.json                                             |
| [vmIngestionDetailsSample.js][vmingestiondetailssample]                                                               | list detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/VMIngestion_Details.json   |

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
npx dev-tool run vendored cross-env  node allTrafficFiltersListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alltrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/allTrafficFiltersListSample.js
[associatetrafficfilterassociatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/associateTrafficFilterAssociateSample.js
[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/billingInfoGetSample.js
[connectedpartnerresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/connectedPartnerResourcesListSample.js
[createandassociateipfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/createAndAssociateIPFilterCreateSample.js
[createandassociateplfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/createAndAssociatePLFilterCreateSample.js
[deploymentinfolistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/deploymentInfoListSample.js
[detachanddeletetrafficfilterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/detachAndDeleteTrafficFilterDeleteSample.js
[detachtrafficfilterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/detachTrafficFilterUpdateSample.js
[elasticversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/elasticVersionsListSample.js
[externalusercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/externalUserCreateOrUpdateSample.js
[listassociatedtrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/listAssociatedTrafficFiltersListSample.js
[monitorupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorUpgradeSample.js
[monitoredresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitoredResourcesListSample.js
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitoredSubscriptionsCreateorUpdateSample.js
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitoredSubscriptionsDeleteSample.js
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitoredSubscriptionsGetSample.js
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitoredSubscriptionsListSample.js
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitoredSubscriptionsUpdateSample.js
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorsCreateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorsDeleteSample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorsGetSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorsListByResourceGroupSample.js
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorsListSample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/monitorsUpdateSample.js
[openaicreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/openAICreateOrUpdateSample.js
[openaideletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/openAIDeleteSample.js
[openaigetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/openAIGetSample.js
[openaigetstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/openAIGetStatusSample.js
[openailistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/openAIListSample.js
[organizationsgetapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/organizationsGetApiKeySample.js
[organizationsgetelastictoazuresubscriptionmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/organizationsGetElasticToAzureSubscriptionMappingSample.js
[organizationsresubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/organizationsResubscribeSample.js
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/tagRulesCreateOrUpdateSample.js
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/tagRulesDeleteSample.js
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/tagRulesGetSample.js
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/tagRulesListSample.js
[trafficfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/trafficFiltersDeleteSample.js
[upgradableversionsdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/upgradableVersionsDetailsSample.js
[vmcollectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/vmCollectionUpdateSample.js
[vmhostlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/vmHostListSample.js
[vmingestiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/javascript/vmIngestionDetailsSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-elastic?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elastic/arm-elastic/README.md
