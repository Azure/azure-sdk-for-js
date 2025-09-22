# @azure/arm-elastic client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-elastic in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [allTrafficFiltersListSample.ts][alltrafficfilterslistsample]                                                         | list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. x-ms-original-file: 2025-06-01/AllTrafficFilters_list.json                                 |
| [associateTrafficFilterAssociateSample.ts][associatetrafficfilterassociatesample]                                     | associate a traffic filter with your Elastic monitor resource to control and manage network traffic. x-ms-original-file: 2025-06-01/AssociateTrafficFilter_Update.json                                         |
| [billingInfoGetSample.ts][billinginfogetsample]                                                                       | retrieve marketplace and organization billing information mapped to the given Elastic monitor resource. x-ms-original-file: 2025-06-01/BillingInfo_Get.json                                                    |
| [connectedPartnerResourcesListSample.ts][connectedpartnerresourceslistsample]                                         | list all active deployments associated with the marketplace subscription linked to the given Elastic monitor resource. x-ms-original-file: 2025-06-01/ConnectedPartnerResources_List.json                      |
| [createAndAssociateIPFilterCreateSample.ts][createandassociateipfiltercreatesample]                                   | create and associate an IP filter with your Elastic monitor resource to control and manage network traffic. x-ms-original-file: 2025-06-01/IPTrafficFilter_Create.json                                         |
| [createAndAssociatePLFilterCreateSample.ts][createandassociateplfiltercreatesample]                                   | create and associate a PL filter with your Elastic monitor resource to control and manage network traffic. x-ms-original-file: 2025-06-01/PrivateLinkTrafficFilters_Create.json                                |
| [deploymentInfoListSample.ts][deploymentinfolistsample]                                                               | fetch detailed information about Elastic cloud deployments corresponding to the Elastic monitor resource. x-ms-original-file: 2025-06-01/DeploymentInfo_List.json                                              |
| [detachAndDeleteTrafficFilterDeleteSample.ts][detachanddeletetrafficfilterdeletesample]                               | detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. x-ms-original-file: 2025-06-01/DetachAndDeleteTrafficFilter_Delete.json    |
| [detachTrafficFilterUpdateSample.ts][detachtrafficfilterupdatesample]                                                 | detach an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities. x-ms-original-file: 2025-06-01/DetachTrafficFilters_Update.json                       |
| [elasticVersionsListSample.ts][elasticversionslistsample]                                                             | retrieve a list of all available Elastic versions for a specified region, helping you choose the best version for your deployment. x-ms-original-file: 2025-06-01/ElasticVersions_List.json                    |
| [externalUserCreateOrUpdateSample.ts][externalusercreateorupdatesample]                                               | create or update external user configurations for your Elastic monitor resource, enabling access and management by external users. x-ms-original-file: 2025-06-01/ExternalUserInfo.json                        |
| [listAssociatedTrafficFiltersListSample.ts][listassociatedtrafficfilterslistsample]                                   | list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control. x-ms-original-file: 2025-06-01/AssociatedFiltersForDeployment_list.json                    |
| [monitorUpgradeSample.ts][monitorupgradesample]                                                                       | upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/Monitor_Upgrade.json                                                   |
| [monitoredResourcesListSample.ts][monitoredresourceslistsample]                                                       | list all resources currently being monitored by the Elastic monitor resource, helping you manage observability. x-ms-original-file: 2025-06-01/MonitoredResources_List.json                                    |
| [monitoredSubscriptionsCreateorUpdateSample.ts][monitoredsubscriptionscreateorupdatesample]                           | add subscriptions to be monitored by the Elastic monitor resource, enabling observability and monitoring. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_CreateorUpdate.json                            |
| [monitoredSubscriptionsDeleteSample.ts][monitoredsubscriptionsdeletesample]                                           | delete subscriptions being monitored by the Elastic monitor resource, removing their observability and monitoring capabilities. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Delete.json              |
| [monitoredSubscriptionsGetSample.ts][monitoredsubscriptionsgetsample]                                                 | get detailed information about all subscriptions currently being monitored by the Elastic monitor resource. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Get.json                                     |
| [monitoredSubscriptionsListSample.ts][monitoredsubscriptionslistsample]                                               | list all subscriptions currently being monitored by the Elastic monitor resource, helping you manage observability. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_List.json                            |
| [monitoredSubscriptionsUpdateSample.ts][monitoredsubscriptionsupdatesample]                                           | update subscriptions to be monitored by the Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/MonitoredSubscriptions_Update.json                        |
| [monitorsCreateSample.ts][monitorscreatesample]                                                                       | create a new Elastic monitor resource in your Azure subscription, enabling observability and monitoring of your Azure resources through Elastic. x-ms-original-file: 2025-06-01/Monitors_Create.json           |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                                                       | delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities. x-ms-original-file: 2025-06-01/Monitors_Delete.json                          |
| [monitorsGetSample.ts][monitorsgetsample]                                                                             | get detailed properties of a specific Elastic monitor resource, helping you manage observability and performance. x-ms-original-file: 2025-06-01/Monitors_Get.json                                             |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]                                             | list all Elastic monitor resources within a specified resource group of the subscription, helping you audit and manage your monitoring setup. x-ms-original-file: 2025-06-01/Monitors_ListByResourceGroup.json |
| [monitorsListSample.ts][monitorslistsample]                                                                           | list all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup. x-ms-original-file: 2025-06-01/Monitors_List.json                                      |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                                                       | update an existing Elastic monitor resource in your Azure subscription, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/Monitors_Update.json                                    |
| [openAICreateOrUpdateSample.ts][openaicreateorupdatesample]                                                           | create or update an OpenAI integration rule for a given Elastic monitor resource, enabling advanced AI-driven observability and monitoring. x-ms-original-file: 2025-06-01/OpenAI_CreateOrUpdate.json          |
| [openAIDeleteSample.ts][openaideletesample]                                                                           | delete an OpenAI integration rule for a given Elastic monitor resource, removing AI-driven observability and monitoring capabilities. x-ms-original-file: 2025-06-01/OpenAI_Delete.json                        |
| [openAIGetSample.ts][openaigetsample]                                                                                 | get detailed information about OpenAI integration rules for a given Elastic monitor resource. x-ms-original-file: 2025-06-01/OpenAI_Get.json                                                                   |
| [openAIGetStatusSample.ts][openaigetstatussample]                                                                     | get the status of OpenAI integration for a given Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/OpenAI_GetStatus.json                                |
| [openAIListSample.ts][openailistsample]                                                                               | list all OpenAI integration rules for a given Elastic monitor resource, helping you manage AI-driven observability and monitoring. x-ms-original-file: 2025-06-01/OpenAI_List.json                             |
| [organizationsGetApiKeySample.ts][organizationsgetapikeysample]                                                       | fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization. x-ms-original-file: 2025-06-01/Organizations_GetApiKey.json           |
| [organizationsGetElasticToAzureSubscriptionMappingSample.ts][organizationsgetelastictoazuresubscriptionmappingsample] | >; /\*\* Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user. x-ms-original-file: 2025-06-01/Organizations_GetElasticToAzureSubscriptionMapping.json       |
| [organizationsResubscribeSample.ts][organizationsresubscribesample]                                                   | resubscribe the Elasticsearch Organization. x-ms-original-file: 2025-06-01/Organizations_Resubscribe.json                                                                                                      |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                                                       | create or update a tag rule set for a given Elastic monitor resource, enabling fine-grained control over observability based on resource tags. x-ms-original-file: 2025-06-01/TagRules_CreateOrUpdate.json     |
| [tagRulesDeleteSample.ts][tagrulesdeletesample]                                                                       | delete a tag rule set for a given Elastic monitor resource, removing fine-grained control over observability based on resource tags. x-ms-original-file: 2025-06-01/TagRules_Delete.json                       |
| [tagRulesGetSample.ts][tagrulesgetsample]                                                                             | get detailed information about a tag rule set for a given Elastic monitor resource. x-ms-original-file: 2025-06-01/TagRules_Get.json                                                                           |
| [tagRulesListSample.ts][tagruleslistsample]                                                                           | list all tag rules for a given Elastic monitor resource, helping you manage fine-grained control over observability based on resource tags. x-ms-original-file: 2025-06-01/TagRules_List.json                  |
| [trafficFiltersDeleteSample.ts][trafficfiltersdeletesample]                                                           | delete an existing traffic filter associated with your Elastic monitor resource, removing its network traffic control capabilities. x-ms-original-file: 2025-06-01/TrafficFilters_Delete.json                  |
| [upgradableVersionsDetailsSample.ts][upgradableversionsdetailssample]                                                 | list all upgradable versions for your Elastic monitor resource, helping you plan and execute upgrades. x-ms-original-file: 2025-06-01/UpgradableVersions_Details.json                                          |
| [vmCollectionUpdateSample.ts][vmcollectionupdatesample]                                                               | update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/VMCollection_Update.json                          |
| [vmHostListSample.ts][vmhostlistsample]                                                                               | list all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability. x-ms-original-file: 2025-06-01/VMHost_List.json                                             |
| [vmIngestionDetailsSample.ts][vmingestiondetailssample]                                                               | list detailed information about VM ingestion that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance. x-ms-original-file: 2025-06-01/VMIngestion_Details.json   |

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
npx dev-tool run vendored cross-env  node dist/allTrafficFiltersListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[alltrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/allTrafficFiltersListSample.ts
[associatetrafficfilterassociatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/associateTrafficFilterAssociateSample.ts
[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/billingInfoGetSample.ts
[connectedpartnerresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/connectedPartnerResourcesListSample.ts
[createandassociateipfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/createAndAssociateIPFilterCreateSample.ts
[createandassociateplfiltercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/createAndAssociatePLFilterCreateSample.ts
[deploymentinfolistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/deploymentInfoListSample.ts
[detachanddeletetrafficfilterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/detachAndDeleteTrafficFilterDeleteSample.ts
[detachtrafficfilterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/detachTrafficFilterUpdateSample.ts
[elasticversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/elasticVersionsListSample.ts
[externalusercreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/externalUserCreateOrUpdateSample.ts
[listassociatedtrafficfilterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/listAssociatedTrafficFiltersListSample.ts
[monitorupgradesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorUpgradeSample.ts
[monitoredresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitoredResourcesListSample.ts
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitoredSubscriptionsCreateorUpdateSample.ts
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitoredSubscriptionsDeleteSample.ts
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitoredSubscriptionsGetSample.ts
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitoredSubscriptionsListSample.ts
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitoredSubscriptionsUpdateSample.ts
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorsCreateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorsDeleteSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorsGetSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorsListSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/monitorsUpdateSample.ts
[openaicreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/openAICreateOrUpdateSample.ts
[openaideletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/openAIDeleteSample.ts
[openaigetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/openAIGetSample.ts
[openaigetstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/openAIGetStatusSample.ts
[openailistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/openAIListSample.ts
[organizationsgetapikeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/organizationsGetApiKeySample.ts
[organizationsgetelastictoazuresubscriptionmappingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/organizationsGetElasticToAzureSubscriptionMappingSample.ts
[organizationsresubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/organizationsResubscribeSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/tagRulesDeleteSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/tagRulesGetSample.ts
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/tagRulesListSample.ts
[trafficfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/trafficFiltersDeleteSample.ts
[upgradableversionsdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/upgradableVersionsDetailsSample.ts
[vmcollectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/vmCollectionUpdateSample.ts
[vmhostlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/vmHostListSample.ts
[vmingestiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elastic/arm-elastic/samples/v2/typescript/src/vmIngestionDetailsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-elastic?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elastic/arm-elastic/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
