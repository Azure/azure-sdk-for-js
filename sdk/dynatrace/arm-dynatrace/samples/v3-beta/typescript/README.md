# @azure/arm-dynatrace client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-dynatrace in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [creationSupportedGetSample.ts][creationsupportedgetsample]                                           | informs if the current subscription is being already monitored for selected Dynatrace environment. x-ms-original-file: 2024-04-24/CreationSupported_Get.json                                                  |
| [creationSupportedListSample.ts][creationsupportedlistsample]                                         | informs if the current subscription is being already monitored for selected Dynatrace environment. x-ms-original-file: 2024-04-24/CreationSupported_List.json                                                 |
| [monitoredSubscriptionsCreateOrUpdateSample.ts][monitoredsubscriptionscreateorupdatesample]           | add the subscriptions that should be monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/MonitoredSubscriptions_CreateOrUpdate.json                                                   |
| [monitoredSubscriptionsDeleteSample.ts][monitoredsubscriptionsdeletesample]                           | updates the subscriptions that are being monitored by the Dynatrace monitor resource x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Delete.json                                                        |
| [monitoredSubscriptionsGetSample.ts][monitoredsubscriptionsgetsample]                                 | list the subscriptions currently being monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Get.json                                                            |
| [monitoredSubscriptionsListSample.ts][monitoredsubscriptionslistsample]                               | list the subscriptions currently being monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/MonitoredSubscriptions_List.json                                                           |
| [monitoredSubscriptionsUpdateSample.ts][monitoredsubscriptionsupdatesample]                           | updates the subscriptions that are being monitored by the Dynatrace monitor resource x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Update.json                                                        |
| [monitorsCreateOrUpdateSample.ts][monitorscreateorupdatesample]                                       | create a MonitorResource x-ms-original-file: 2024-04-24/Monitors_CreateOrUpdate_MaximumSet_Gen.json                                                                                                           |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                                       | delete a MonitorResource x-ms-original-file: 2024-04-24/Monitors_Delete_MaximumSet_Gen.json                                                                                                                   |
| [monitorsGetAllConnectedResourcesCountSample.ts][monitorsgetallconnectedresourcescountsample]         | get the total number of connected resources for the given marketplace subscription Id x-ms-original-file: 2024-04-24/Monitors_GetAllConnectedResourcesCount_MaximumSet_Gen.json                               |
| [monitorsGetMarketplaceSaaSResourceDetailsSample.ts][monitorsgetmarketplacesaasresourcedetailssample] | get Marketplace SaaS resource details x-ms-original-file: 2024-04-24/Monitors_GetMarketplaceSaaSResourceDetails_MaximumSet_Gen.json                                                                           |
| [monitorsGetMetricStatusSample.ts][monitorsgetmetricstatussample]                                     | get metric status x-ms-original-file: 2024-04-24/Monitors_GetMetricStatus_MaximumSet_Gen.json                                                                                                                 |
| [monitorsGetSSODetailsSample.ts][monitorsgetssodetailssample]                                         | gets the SSO configuration details from the partner. x-ms-original-file: 2024-04-24/Monitors_GetSSODetails_MaximumSet_Gen.json                                                                                |
| [monitorsGetSample.ts][monitorsgetsample]                                                             | get a MonitorResource x-ms-original-file: 2024-04-24/Monitors_Get_MaximumSet_Gen.json                                                                                                                         |
| [monitorsGetVMHostPayloadSample.ts][monitorsgetvmhostpayloadsample]                                   | returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM. x-ms-original-file: 2024-04-24/Monitors_GetVMHostPayload_MaximumSet_Gen.json                          |
| [monitorsListAppServicesSample.ts][monitorslistappservicessample]                                     | gets list of App Services with Dynatrace PaaS OneAgent enabled x-ms-original-file: 2024-04-24/Monitors_ListAppServices_MaximumSet_Gen.json                                                                    |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]                             | list MonitorResource resources by resource group x-ms-original-file: 2024-04-24/Monitors_ListByResourceGroup_MaximumSet_Gen.json                                                                              |
| [monitorsListBySubscriptionIdSample.ts][monitorslistbysubscriptionidsample]                           | list all MonitorResource by subscriptionId x-ms-original-file: 2024-04-24/Monitors_ListBySubscriptionId_MaximumSet_Gen.json                                                                                   |
| [monitorsListHostsSample.ts][monitorslisthostssample]                                                 | list the VM/VMSS resources currently being monitored by the Dynatrace resource. x-ms-original-file: 2024-04-24/Monitors_ListHosts_MaximumSet_Gen.json                                                         |
| [monitorsListLinkableEnvironmentsSample.ts][monitorslistlinkableenvironmentssample]                   | gets all the Dynatrace environments that a user can link a azure resource to x-ms-original-file: 2024-04-24/Monitors_ListLinkableEnvironments_MaximumSet_Gen.json                                             |
| [monitorsListMonitoredResourcesSample.ts][monitorslistmonitoredresourcessample]                       | list the resources currently being monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/Monitors_ListMonitoredResources_MaximumSet_Gen.json                                            |
| [monitorsManageAgentInstallationSample.ts][monitorsmanageagentinstallationsample]                     | performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources. x-ms-original-file: 2024-04-24/Monitors_ManageAgentInstallation_MaximumSet_Gen.json |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                                       | update a MonitorResource x-ms-original-file: 2024-04-24/Monitors_Update_MaximumSet_Gen.json                                                                                                                   |
| [monitorsUpgradePlanSample.ts][monitorsupgradeplansample]                                             | upgrades the billing Plan for Dynatrace monitor resource. x-ms-original-file: 2024-04-24/Monitors_UpgradePlan_MaximumSet_Gen.json                                                                             |
| [operationsListSample.ts][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2024-04-24/Operations_List_MaximumSet_Gen.json                                                                                                       |
| [singleSignOnCreateOrUpdateSample.ts][singlesignoncreateorupdatesample]                               | create a DynatraceSingleSignOnResource x-ms-original-file: 2024-04-24/SingleSignOn_CreateOrUpdate_MaximumSet_Gen.json                                                                                         |
| [singleSignOnGetSample.ts][singlesignongetsample]                                                     | get a DynatraceSingleSignOnResource x-ms-original-file: 2024-04-24/SingleSignOn_Get_MaximumSet_Gen.json                                                                                                       |
| [singleSignOnListSample.ts][singlesignonlistsample]                                                   | list all DynatraceSingleSignOnResource by monitorName x-ms-original-file: 2024-04-24/SingleSignOn_List_MaximumSet_Gen.json                                                                                    |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                                       | create a TagRule x-ms-original-file: 2024-04-24/TagRules_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                   |
| [tagRulesDeleteSample.ts][tagrulesdeletesample]                                                       | delete a TagRule x-ms-original-file: 2024-04-24/TagRules_Delete_MaximumSet_Gen.json                                                                                                                           |
| [tagRulesGetSample.ts][tagrulesgetsample]                                                             | get a TagRule x-ms-original-file: 2024-04-24/TagRules_Get_MaximumSet_Gen.json                                                                                                                                 |
| [tagRulesListSample.ts][tagruleslistsample]                                                           | list all TagRule by monitorName x-ms-original-file: 2024-04-24/TagRules_List_MaximumSet_Gen.json                                                                                                              |

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
node dist/creationSupportedGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/creationSupportedGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[creationsupportedgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/creationSupportedGetSample.ts
[creationsupportedlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/creationSupportedListSample.ts
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitoredSubscriptionsCreateOrUpdateSample.ts
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitoredSubscriptionsDeleteSample.ts
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitoredSubscriptionsGetSample.ts
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitoredSubscriptionsListSample.ts
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitoredSubscriptionsUpdateSample.ts
[monitorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsCreateOrUpdateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsDeleteSample.ts
[monitorsgetallconnectedresourcescountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsGetAllConnectedResourcesCountSample.ts
[monitorsgetmarketplacesaasresourcedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsGetMarketplaceSaaSResourceDetailsSample.ts
[monitorsgetmetricstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsGetMetricStatusSample.ts
[monitorsgetssodetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsGetSSODetailsSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsGetSample.ts
[monitorsgetvmhostpayloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsGetVMHostPayloadSample.ts
[monitorslistappservicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsListAppServicesSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsListBySubscriptionIdSample.ts
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsListHostsSample.ts
[monitorslistlinkableenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsListLinkableEnvironmentsSample.ts
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsListMonitoredResourcesSample.ts
[monitorsmanageagentinstallationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsManageAgentInstallationSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsUpdateSample.ts
[monitorsupgradeplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/monitorsUpgradePlanSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/operationsListSample.ts
[singlesignoncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/singleSignOnCreateOrUpdateSample.ts
[singlesignongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/singleSignOnGetSample.ts
[singlesignonlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/singleSignOnListSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/tagRulesDeleteSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/tagRulesGetSample.ts
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/typescript/src/tagRulesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dynatrace?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dynatrace/arm-dynatrace/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
