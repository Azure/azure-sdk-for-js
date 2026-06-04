# @azure/arm-datadog client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-datadog in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [billingInfoGetSample.ts][billinginfogetsample]                                                     | get marketplace and organization info mapped to the given monitor. x-ms-original-file: 2025-12-26-preview/BillingInfo_Get.json                                                  |
| [creationSupportedGetSample.ts][creationsupportedgetsample]                                         | informs if the current subscription is being already monitored for selected Datadog organization. x-ms-original-file: 2025-12-26-preview/CreationSupported_Get.json             |
| [creationSupportedListSample.ts][creationsupportedlistsample]                                       | informs if the current subscription is being already monitored for selected Datadog organization. x-ms-original-file: 2025-12-26-preview/CreationSupported_List.json            |
| [datadogMonitorResourcesLatestLinkedSaaSSample.ts][datadogmonitorresourceslatestlinkedsaassample]   | returns the latest SaaS linked to the Datadog organization of the underlying monitor. x-ms-original-file: 2025-12-26-preview/Monitors_LatestLinkedSaaS.json                     |
| [datadogMonitorResourcesLinkSaaSSample.ts][datadogmonitorresourceslinksaassample]                   | links a new SaaS to the Datadog organization of the underlying monitor. x-ms-original-file: 2025-12-26-preview/Monitors_LinkSaaS.json                                           |
| [marketplaceAgreementsCreateOrUpdateSample.ts][marketplaceagreementscreateorupdatesample]           | create Datadog marketplace agreement in the subscription. x-ms-original-file: 2025-12-26-preview/MarketplaceAgreements_Create.json                                              |
| [marketplaceAgreementsListSample.ts][marketplaceagreementslistsample]                               | list Datadog marketplace agreements in the subscription. x-ms-original-file: 2025-12-26-preview/MarketplaceAgreements_List.json                                                 |
| [monitoredSubscriptionsCreateorUpdateSample.ts][monitoredsubscriptionscreateorupdatesample]         | add the subscriptions that should be monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_CreateorUpdate.json               |
| [monitoredSubscriptionsDeleteSample.ts][monitoredsubscriptionsdeletesample]                         | updates the subscriptions that are being monitored by the Datadog monitor resource x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Delete.json                    |
| [monitoredSubscriptionsGetSample.ts][monitoredsubscriptionsgetsample]                               | list the subscriptions currently being monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Get.json                        |
| [monitoredSubscriptionsListSample.ts][monitoredsubscriptionslistsample]                             | list the subscriptions currently being monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_List.json                       |
| [monitoredSubscriptionsUpdateSample.ts][monitoredsubscriptionsupdatesample]                         | updates the subscriptions that are being monitored by the Datadog monitor resource x-ms-original-file: 2025-12-26-preview/MonitoredSubscriptions_Update.json                    |
| [monitorsCreateSample.ts][monitorscreatesample]                                                     | create a monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Create.json                                                                                          |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                                     | delete a monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Delete.json                                                                                          |
| [monitorsGetDefaultApplicationKeySample.ts][monitorsgetdefaultapplicationkeysample]                 | get the default application key. x-ms-original-file: 2025-12-26-preview/ApplicationKeys_GetDefaultKey.json                                                                      |
| [monitorsGetDefaultKeySample.ts][monitorsgetdefaultkeysample]                                       | get the default api key. x-ms-original-file: 2025-12-26-preview/ApiKeys_GetDefaultKey.json                                                                                      |
| [monitorsGetSample.ts][monitorsgetsample]                                                           | get the properties of a specific monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Get.json                                                                     |
| [monitorsListApiKeysSample.ts][monitorslistapikeyssample]                                           | list the api keys for a given monitor resource. x-ms-original-file: 2025-12-26-preview/ApiKeys_List.json                                                                        |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]                           | list all monitors under the specified resource group. x-ms-original-file: 2025-12-26-preview/Monitors_ListByResourceGroup.json                                                  |
| [monitorsListHostsSample.ts][monitorslisthostssample]                                               | list the hosts for a given monitor resource. x-ms-original-file: 2025-12-26-preview/Hosts_List.json                                                                             |
| [monitorsListLinkedResourcesSample.ts][monitorslistlinkedresourcessample]                           | list all Azure resources associated to the same Datadog organization as the target resource. x-ms-original-file: 2025-12-26-preview/LinkedResources_List.json                   |
| [monitorsListMonitoredResourcesSample.ts][monitorslistmonitoredresourcessample]                     | list the resources currently being monitored by the Datadog monitor resource. x-ms-original-file: 2025-12-26-preview/MonitoredResources_List.json                               |
| [monitorsListSample.ts][monitorslistsample]                                                         | list all monitors under the specified subscription. x-ms-original-file: 2025-12-26-preview/Monitors_List.json                                                                   |
| [monitorsManageSreAgentConnectorsSample.ts][monitorsmanagesreagentconnectorssample]                 | manages Datadog MCP connectors to add/remove for the SRE Agent. x-ms-original-file: 2025-12-26-preview/Monitors_ManageSreAgentConnectors.json                                   |
| [monitorsRefreshSetPasswordLinkSample.ts][monitorsrefreshsetpasswordlinksample]                     | refresh the set password link and return a latest one. x-ms-original-file: 2025-12-26-preview/RefreshSetPassword_Get.json                                                       |
| [monitorsSetDefaultKeySample.ts][monitorssetdefaultkeysample]                                       | set the default api key. x-ms-original-file: 2025-12-26-preview/ApiKeys_SetDefaultKey.json                                                                                      |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                                     | update a monitor resource. x-ms-original-file: 2025-12-26-preview/Monitors_Update.json                                                                                          |
| [operationsListSample.ts][operationslistsample]                                                     | list all operations provided by Microsoft.Datadog for the 2025-06-11 api version. x-ms-original-file: 2025-12-26-preview/Operations_List.json                                   |
| [organizationsResubscribeSample.ts][organizationsresubscribesample]                                 | reinstate integration with your Datadog organization by choosing one of the available subscription plans. x-ms-original-file: 2025-12-26-preview/Organizations_Resubscribe.json |
| [saaSOperationGroupActivateResourceSample.ts][saasoperationgroupactivateresourcesample]             | resolve the token to get the SaaS resource ID and activate the SaaS resource x-ms-original-file: 2025-12-26-preview/ActivateSaaS.json                                           |
| [singleSignOnConfigurationsCreateOrUpdateSample.ts][singlesignonconfigurationscreateorupdatesample] | configures single-sign-on for this resource. x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_CreateOrUpdate.json                                              |
| [singleSignOnConfigurationsGetSample.ts][singlesignonconfigurationsgetsample]                       | gets the datadog single sign-on resource for the given Monitor. x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_Get.json                                      |
| [singleSignOnConfigurationsListSample.ts][singlesignonconfigurationslistsample]                     | list the single sign-on configurations for a given monitor resource. x-ms-original-file: 2025-12-26-preview/SingleSignOnConfigurations_List.json                                |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                                     | create or update a tag rule set for a given monitor resource. x-ms-original-file: 2025-12-26-preview/TagRules_CreateOrUpdate.json                                               |
| [tagRulesGetSample.ts][tagrulesgetsample]                                                           | get a tag rule set for a given monitor resource. x-ms-original-file: 2025-12-26-preview/TagRules_Get.json                                                                       |
| [tagRulesListSample.ts][tagruleslistsample]                                                         | list the tag rules for a given monitor resource. x-ms-original-file: 2025-12-26-preview/TagRules_List.json                                                                      |

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
node dist/billingInfoGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/billingInfoGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/billingInfoGetSample.ts
[creationsupportedgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/creationSupportedGetSample.ts
[creationsupportedlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/creationSupportedListSample.ts
[datadogmonitorresourceslatestlinkedsaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/datadogMonitorResourcesLatestLinkedSaaSSample.ts
[datadogmonitorresourceslinksaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/datadogMonitorResourcesLinkSaaSSample.ts
[marketplaceagreementscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/marketplaceAgreementsCreateOrUpdateSample.ts
[marketplaceagreementslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/marketplaceAgreementsListSample.ts
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitoredSubscriptionsCreateorUpdateSample.ts
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitoredSubscriptionsDeleteSample.ts
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitoredSubscriptionsGetSample.ts
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitoredSubscriptionsListSample.ts
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitoredSubscriptionsUpdateSample.ts
[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsCreateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsDeleteSample.ts
[monitorsgetdefaultapplicationkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsGetDefaultApplicationKeySample.ts
[monitorsgetdefaultkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsGetDefaultKeySample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsGetSample.ts
[monitorslistapikeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsListApiKeysSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsListHostsSample.ts
[monitorslistlinkedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsListLinkedResourcesSample.ts
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsListMonitoredResourcesSample.ts
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsListSample.ts
[monitorsmanagesreagentconnectorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsManageSreAgentConnectorsSample.ts
[monitorsrefreshsetpasswordlinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsRefreshSetPasswordLinkSample.ts
[monitorssetdefaultkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsSetDefaultKeySample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/monitorsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/operationsListSample.ts
[organizationsresubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/organizationsResubscribeSample.ts
[saasoperationgroupactivateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/saaSOperationGroupActivateResourceSample.ts
[singlesignonconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/singleSignOnConfigurationsCreateOrUpdateSample.ts
[singlesignonconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/singleSignOnConfigurationsGetSample.ts
[singlesignonconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/singleSignOnConfigurationsListSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/tagRulesGetSample.ts
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datadog/arm-datadog/samples/v4-beta/typescript/src/tagRulesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-datadog?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/datadog/arm-datadog/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
