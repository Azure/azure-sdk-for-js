# @azure/arm-datadog client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-datadog in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [billingInfoGetSample.js][billinginfogetsample]                                                     | get marketplace and organization info mapped to the given monitor. x-ms-original-file: 2025-12-26-preview/BillingInfo_Get.json                                                  |
| [creationSupportedGetSample.js][creationsupportedgetsample]                                         | informs if the current subscription is being already monitored for selected Datadog organization. x-ms-original-file: 2025-12-26-preview/CreationSupported_Get.json             |
| [creationSupportedListSample.js][creationsupportedlistsample]                                       | informs if the current subscription is being already monitored for selected Datadog organization. x-ms-original-file: 2025-12-26-preview/CreationSupported_List.json            |
| [datadogMonitorResourcesLatestLinkedSaaSSample.js][datadogmonitorresourceslatestlinkedsaassample]   | returns the latest SaaS linked to the Datadog organization of the underlying monitor. x-ms-original-file: 2025-12-26-preview/Monitors_LatestLinkedSaaS.json                     |
| [datadogMonitorResourcesLinkSaaSSample.js][datadogmonitorresourceslinksaassample]                   | links a new SaaS to the Datadog organization of the underlying monitor. x-ms-original-file: 2025-12-26-preview/Monitors_LinkSaaS.json                                           |
| [marketplaceAgreementsCreateOrUpdateSample.js][marketplaceagreementscreateorupdatesample]           | create Datadog marketplace agreement in the subscription. x-ms-original-file: 2025-12-26-preview/MarketplaceAgreements_Create.json                                              |
| [marketplaceAgreementsListSample.js][marketplaceagreementslistsample]                               | list Datadog marketplace agreements in the subscription. x-ms-original-file: 2025-12-26-preview/MarketplaceAgreements_List.json                                                 |
| [monitoredSubscriptionsCreateorUpdateSample.js][monitoredsubscriptionscreateorupdatesample]         | add the subscriptions that should be monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_CreateorUpdate.json               |
| [monitoredSubscriptionsDeleteSample.js][monitoredsubscriptionsdeletesample]                         | updates the subscriptions that are being monitored by the Datadog monitor resource x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Delete.json                    |
| [monitoredSubscriptionsGetSample.js][monitoredsubscriptionsgetsample]                               | list the subscriptions currently being monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Get.json                        |
| [monitoredSubscriptionsListSample.js][monitoredsubscriptionslistsample]                             | list the subscriptions currently being monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_List.json                       |
| [monitoredSubscriptionsUpdateSample.js][monitoredsubscriptionsupdatesample]                         | updates the subscriptions that are being monitored by the Datadog monitor resource x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Update.json                    |
| [monitorsCreateSample.js][monitorscreatesample]                                                     | create a monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Create.json                                                                                          |
| [monitorsDeleteSample.js][monitorsdeletesample]                                                     | delete a monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Delete.json                                                                                          |
| [monitorsGetDefaultApplicationKeySample.js][monitorsgetdefaultapplicationkeysample]                 | get the default application key. x-ms-original-file: 2025-12-26-preview/ApplicationKeys_GetDefaultKey.json                                                                      |
| [monitorsGetDefaultKeySample.js][monitorsgetdefaultkeysample]                                       | get the default api key. x-ms-original-file: 2025-12-26-preview/ApiKeys_GetDefaultKey.json                                                                                      |
| [monitorsGetSample.js][monitorsgetsample]                                                           | get the properties of a specific monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Get.json                                                                     |
| [monitorsListApiKeysSample.js][monitorslistapikeyssample]                                           | list the api keys for a given monitor resource. x-ms-original-file: 2025-12-26-preview/ApiKeys_List.json                                                                        |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample]                           | list all monitors under the specified resource group. x-ms-original-file: 2025-12-26-preview/Monitors_ListByResourceGroup.json                                                  |
| [monitorsListHostsSample.js][monitorslisthostssample]                                               | list the hosts for a given monitor resource. x-ms-original-file: 2025-12-26-preview/Hosts_List.json                                                                             |
| [monitorsListLinkedResourcesSample.js][monitorslistlinkedresourcessample]                           | list all Azure resources associated to the same Datadog organization as the target resource. x-ms-original-file: 2025-12-26-preview/LinkedResources_List.json                   |
| [monitorsListMonitoredResourcesSample.js][monitorslistmonitoredresourcessample]                     | list the resources currently being monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredResources_List.json                               |
| [monitorsListSample.js][monitorslistsample]                                                         | list all monitors under the specified subscription. x-ms-original-file: 2025-12-26-preview/Monitors_List.json                                                                   |
| [monitorsManageSreAgentConnectorsSample.js][monitorsmanagesreagentconnectorssample]                 | manages Datadog MCP connectors to add/remove for the SRE Agent. x-ms-original-file: 2025-12-26-preview/Monitors_ManageSreAgentConnectors.json                                   |
| [monitorsRefreshSetPasswordLinkSample.js][monitorsrefreshsetpasswordlinksample]                     | refresh the set password link and return a latest one. x-ms-original-file: 2025-12-26-preview/RefreshSetPassword_Get.json                                                       |
| [monitorsSetDefaultKeySample.js][monitorssetdefaultkeysample]                                       | set the default api key. x-ms-original-file: 2025-12-26-preview/ApiKeys_SetDefaultKey.json                                                                                      |
| [monitorsUpdateSample.js][monitorsupdatesample]                                                     | update a monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Update.json                                                                                          |
| [operationsListSample.js][operationslistsample]                                                     | list all operations provided by Microsoft.Datadog for the 2025-06-11 api version. x-ms-original-file: 2025-12-26-preview/Operations_List.json                                   |
| [organizationsResubscribeSample.js][organizationsresubscribesample]                                 | reinstate integration with your Datadog organization by choosing one of the available subscription plans. x-ms-original-file: 2025-12-26-preview/Organizations_Resubscribe.json |
| [saaSOperationGroupActivateResourceSample.js][saasoperationgroupactivateresourcesample]             | resolve the token to get the SaaS resource ID and activate the SaaS resource x-ms-original-file: 2025-12-26-preview/ActivateSaaS.json                                           |
| [singleSignOnConfigurationsCreateOrUpdateSample.js][singlesignonconfigurationscreateorupdatesample] | configures single-sign-on for this resource. x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_CreateOrUpdate.json                                              |
| [singleSignOnConfigurationsGetSample.js][singlesignonconfigurationsgetsample]                       | gets the datadog single sign-on resource for the given Monitor. x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_Get.json                                      |
| [singleSignOnConfigurationsListSample.js][singlesignonconfigurationslistsample]                     | list the single sign-on configurations for a given monitor resource. x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_List.json                                |
| [tagRulesCreateOrUpdateSample.js][tagrulescreateorupdatesample]                                     | create or update a tag rule set for a given monitor resource. x-ms-original-file: 2025-12-26-preview/TagRules_CreateOrUpdate.json                                               |
| [tagRulesGetSample.js][tagrulesgetsample]                                                           | get a tag rule set for a given monitor resource. x-ms-original-file: 2025-12-26-preview/TagRules_Get.json                                                                       |
| [tagRulesListSample.js][tagruleslistsample]                                                         | list the tag rules for a given monitor resource. x-ms-original-file: 2025-12-26-preview/TagRules_List.json                                                                      |

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
node billingInfoGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node billingInfoGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/billingInfoGetSample.js
[creationsupportedgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/creationSupportedGetSample.js
[creationsupportedlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/creationSupportedListSample.js
[datadogmonitorresourceslatestlinkedsaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/datadogMonitorResourcesLatestLinkedSaaSSample.js
[datadogmonitorresourceslinksaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/datadogMonitorResourcesLinkSaaSSample.js
[marketplaceagreementscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/marketplaceAgreementsCreateOrUpdateSample.js
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/marketplaceAgreementsListSample.js
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitoredSubscriptionsCreateorUpdateSample.js
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitoredSubscriptionsDeleteSample.js
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitoredSubscriptionsGetSample.js
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitoredSubscriptionsListSample.js
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitoredSubscriptionsUpdateSample.js
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsCreateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsDeleteSample.js
[monitorsgetdefaultapplicationkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsGetDefaultApplicationKeySample.js
[monitorsgetdefaultkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsGetDefaultKeySample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsGetSample.js
[monitorslistapikeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsListApiKeysSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsListByResourceGroupSample.js
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsListHostsSample.js
[monitorslistlinkedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsListLinkedResourcesSample.js
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsListMonitoredResourcesSample.js
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsListSample.js
[monitorsmanagesreagentconnectorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsManageSreAgentConnectorsSample.js
[monitorsrefreshsetpasswordlinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsRefreshSetPasswordLinkSample.js
[monitorssetdefaultkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsSetDefaultKeySample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/monitorsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/operationsListSample.js
[organizationsresubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/organizationsResubscribeSample.js
[saasoperationgroupactivateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/saaSOperationGroupActivateResourceSample.js
[singlesignonconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/singleSignOnConfigurationsCreateOrUpdateSample.js
[singlesignonconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/singleSignOnConfigurationsGetSample.js
[singlesignonconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/singleSignOnConfigurationsListSample.js
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/tagRulesCreateOrUpdateSample.js
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/tagRulesGetSample.js
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/javascript/tagRulesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-datadog?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/datadog/arm-datadog/README.md
