# @azure/arm-newrelicobservability client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-newrelicobservability in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsListSample.ts][accountslistsample]                                                   | lists all the New Relic accounts linked to your email address, helping you understand the existing accounts that have been created x-ms-original-file: 2025-05-01-preview/Accounts_List_MaximumSet_Gen.json                                                                                                                           |
| [billingInfoGetSample.ts][billinginfogetsample]                                               | a synchronous resource action. x-ms-original-file: 2025-05-01-preview/BillingInfo_Get.json                                                                                                                                                                                                                                            |
| [connectedPartnerResourcesListSample.ts][connectedpartnerresourceslistsample]                 | a synchronous resource action. x-ms-original-file: 2025-05-01-preview/ConnectedPartnerResources_List.json                                                                                                                                                                                                                             |
| [monitoredSubscriptionsCreateOrUpdateSample.ts][monitoredsubscriptionscreateorupdatesample]   | create a MonitoredSubscriptionProperties x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_CreateOrUpdate.json                                                                                                                                                                                                            |
| [monitoredSubscriptionsDeleteSample.ts][monitoredsubscriptionsdeletesample]                   | delete a MonitoredSubscriptionProperties x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_Delete.json                                                                                                                                                                                                                    |
| [monitoredSubscriptionsGetSample.ts][monitoredsubscriptionsgetsample]                         | get a MonitoredSubscriptionProperties x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_Get.json                                                                                                                                                                                                                          |
| [monitoredSubscriptionsListSample.ts][monitoredsubscriptionslistsample]                       | list MonitoredSubscriptionProperties resources by NewRelicMonitorResource x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_List.json                                                                                                                                                                                     |
| [monitoredSubscriptionsUpdateSample.ts][monitoredsubscriptionsupdatesample]                   | update a MonitoredSubscriptionProperties x-ms-original-file: 2025-05-01-preview/MonitoredSubscriptions_Update.json                                                                                                                                                                                                                    |
| [monitorsCreateOrUpdateSample.ts][monitorscreateorupdatesample]                               | creates a new or updates an existing New Relic monitor resource in your Azure subscription. This sets up the integration between Azure and your New Relic account, enabling observability and monitoring of your Azure resources through New Relic x-ms-original-file: 2025-05-01-preview/Monitors_CreateOrUpdate_MaximumSet_Gen.json |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                               | deletes an existing New Relic monitor resource from your Azure subscription, removing the integration and stopping the observability of your Azure resources through New Relic x-ms-original-file: 2025-05-01-preview/Monitors_Delete_MaximumSet_Gen.json                                                                             |
| [monitorsGetMetricRulesSample.ts][monitorsgetmetricrulessample]                               | retrieves the metric rules that are configured in the New Relic monitor resource x-ms-original-file: 2025-05-01-preview/Monitors_GetMetricRules_MaximumSet_Gen.json                                                                                                                                                                   |
| [monitorsGetMetricStatusSample.ts][monitorsgetmetricstatussample]                             | retrieves the metric status that are configured in the New Relic monitor resource x-ms-original-file: 2025-05-01-preview/Monitors_GetMetricStatus_MaximumSet_Gen.json                                                                                                                                                                 |
| [monitorsGetSample.ts][monitorsgetsample]                                                     | retrieves the properties and configuration details of a specific New Relic monitor resource, providing insight into its setup and status x-ms-original-file: 2025-05-01-preview/Monitors_Get_MaximumSet_Gen.json                                                                                                                      |
| [monitorsLatestLinkedSaaSSample.ts][monitorslatestlinkedsaassample]                           | returns the latest SaaS linked to the newrelic organization of the underlying monitor. x-ms-original-file: 2025-05-01-preview/Monitors_LatestLinkedSaaS_MaximumSet_Gen.json                                                                                                                                                           |
| [monitorsLinkSaaSSample.ts][monitorslinksaassample]                                           | links a new SaaS to the newrelic organization of the underlying monitor. x-ms-original-file: 2025-05-01-preview/Monitors_LinkSaaS.json                                                                                                                                                                                                |
| [monitorsListAppServicesSample.ts][monitorslistappservicessample]                             | lists the app service resources currently being monitored by the New Relic resource, helping you understand which app services are under monitoring x-ms-original-file: 2025-05-01-preview/Monitors_ListAppServices_MaximumSet_Gen.json                                                                                               |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]                     | retrieves a list of all New Relic monitor resources either a specific resource group x-ms-original-file: 2025-05-01-preview/Monitors_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                                                          |
| [monitorsListBySubscriptionSample.ts][monitorslistbysubscriptionsample]                       | lists all New Relic monitor resources either within a specific subscription x-ms-original-file: 2025-05-01-preview/Monitors_ListBySubscription_MaximumSet_Gen.json                                                                                                                                                                    |
| [monitorsListHostsSample.ts][monitorslisthostssample]                                         | lists all VM resources currently being monitored by the New Relic monitor resource, helping you manage observability x-ms-original-file: 2025-05-01-preview/Monitors_ListHosts_MaximumSet_Gen.json                                                                                                                                    |
| [monitorsListLinkedResourcesSample.ts][monitorslistlinkedresourcessample]                     | lists all Azure resources that are linked to the same New Relic organization as the specified monitor resource, helping you understand the scope of integration x-ms-original-file: 2025-05-01-preview/LinkedResources_List.json                                                                                                      |
| [monitorsListMonitoredResourcesSample.ts][monitorslistmonitoredresourcessample]               | lists all Azure resources that are currently being monitored by the specified New Relic monitor resource, providing insight into the coverage of your observability setup x-ms-original-file: 2025-05-01-preview/Monitors_ListMonitoredResources_MaximumSet_Gen.json                                                                  |
| [monitorsRefreshIngestionKeySample.ts][monitorsrefreshingestionkeysample]                     | refreshes the ingestion key for all monitors linked to the same account associated to the underlying monitor. x-ms-original-file: 2025-05-01-preview/Monitors_RefreshIngestionKey.json                                                                                                                                                |
| [monitorsResubscribeSample.ts][monitorsresubscribesample]                                     | a long-running resource action. x-ms-original-file: 2025-05-01-preview/Monitors_Resubscribe.json                                                                                                                                                                                                                                      |
| [monitorsSwitchBillingSample.ts][monitorsswitchbillingsample]                                 | switches the billing for the New Relic Monitor resource to be billed by Azure Marketplace x-ms-original-file: 2025-05-01-preview/Monitors_SwitchBilling_MaximumSet_Gen.json                                                                                                                                                           |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                               | updates an existing New Relic monitor resource from your Azure subscription x-ms-original-file: 2025-05-01-preview/Monitors_Update_MaximumSet_Gen.json                                                                                                                                                                                |
| [monitorsVmHostPayloadSample.ts][monitorsvmhostpayloadsample]                                 | returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details x-ms-original-file: 2025-05-01-preview/Monitors_VmHostPayload_MaximumSet_Gen.json                                                                                           |
| [operationsListSample.ts][operationslistsample]                                               | list the operations for the provider x-ms-original-file: 2025-05-01-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                                                                                       |
| [organizationsListSample.ts][organizationslistsample]                                         | lists all the New Relic organizations linked to your email address, helping you understand the existing organizations that have been created x-ms-original-file: 2025-05-01-preview/Organizations_List_MaximumSet_Gen.json                                                                                                            |
| [plansListSample.ts][planslistsample]                                                         | lists the plans data linked to your organization, providing an overview of the available plans x-ms-original-file: 2025-05-01-preview/Plans_List_MaximumSet_Gen.json                                                                                                                                                                  |
| [saaSActivateResourceSample.ts][saasactivateresourcesample]                                   | resolve the token to get the SaaS resource ID and activate the SaaS resource x-ms-original-file: 2025-05-01-preview/ActivateSaaS.json                                                                                                                                                                                                 |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                               | creates a new set of tag rules for a specific New Relic monitor resource, determining which Azure resources are monitored based on their tags x-ms-original-file: 2025-05-01-preview/TagRules_CreateOrUpdate_MaximumSet_Gen.json                                                                                                      |
| [tagRulesDeleteSample.ts][tagrulesdeletesample]                                               | deletes a tag rule set for a given New Relic monitor resource, removing fine-grained control over observability based on resource tags x-ms-original-file: 2025-05-01-preview/TagRules_Delete_MaximumSet_Gen.json                                                                                                                     |
| [tagRulesGetSample.ts][tagrulesgetsample]                                                     | retrieves the details of the tag rules for a specific New Relic monitor resource, providing insight into its setup and status x-ms-original-file: 2025-05-01-preview/TagRules_Get_MaximumSet_Gen.json                                                                                                                                 |
| [tagRulesListByNewRelicMonitorResourceSample.ts][tagruleslistbynewrelicmonitorresourcesample] | lists all tag rules associated with a specific New Relic monitor resource, helping you manage and audit the rules that control resource monitoring x-ms-original-file: 2025-05-01-preview/TagRules_ListByNewRelicMonitorResource_MaximumSet_Gen.json                                                                                  |
| [tagRulesUpdateSample.ts][tagrulesupdatesample]                                               | updates the tag rules for a specific New Relic monitor resource, allowing you to modify the rules that control which Azure resources are monitored x-ms-original-file: 2025-05-01-preview/TagRules_Update_MaximumSet_Gen.json                                                                                                         |

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
node dist/accountsListSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accountsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/accountsListSample.ts
[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/billingInfoGetSample.ts
[connectedpartnerresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/connectedPartnerResourcesListSample.ts
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitoredSubscriptionsCreateOrUpdateSample.ts
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitoredSubscriptionsDeleteSample.ts
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitoredSubscriptionsGetSample.ts
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitoredSubscriptionsListSample.ts
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitoredSubscriptionsUpdateSample.ts
[monitorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsCreateOrUpdateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsDeleteSample.ts
[monitorsgetmetricrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsGetMetricRulesSample.ts
[monitorsgetmetricstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsGetMetricStatusSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsGetSample.ts
[monitorslatestlinkedsaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsLatestLinkedSaaSSample.ts
[monitorslinksaassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsLinkSaaSSample.ts
[monitorslistappservicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsListAppServicesSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsListBySubscriptionSample.ts
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsListHostsSample.ts
[monitorslistlinkedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsListLinkedResourcesSample.ts
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsListMonitoredResourcesSample.ts
[monitorsrefreshingestionkeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsRefreshIngestionKeySample.ts
[monitorsresubscribesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsResubscribeSample.ts
[monitorsswitchbillingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsSwitchBillingSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsUpdateSample.ts
[monitorsvmhostpayloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/monitorsVmHostPayloadSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/operationsListSample.ts
[organizationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/organizationsListSample.ts
[planslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/plansListSample.ts
[saasactivateresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/saaSActivateResourceSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/tagRulesDeleteSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/tagRulesGetSample.ts
[tagruleslistbynewrelicmonitorresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/tagRulesListByNewRelicMonitorResourceSample.ts
[tagrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v2-beta/typescript/src/tagRulesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-newrelicobservability?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/newrelicobservability/arm-newrelicobservability/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
