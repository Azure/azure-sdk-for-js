# @azure/arm-dynatrace client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-dynatrace in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [creationSupportedGetSample.js][creationsupportedgetsample]                                           | informs if the current subscription is being already monitored for selected Dynatrace environment. x-ms-original-file: 2024-04-24/CreationSupported_Get.json                                                  |
| [creationSupportedListSample.js][creationsupportedlistsample]                                         | informs if the current subscription is being already monitored for selected Dynatrace environment. x-ms-original-file: 2024-04-24/CreationSupported_List.json                                                 |
| [monitoredSubscriptionsCreateOrUpdateSample.js][monitoredsubscriptionscreateorupdatesample]           | add the subscriptions that should be monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/MonitoredSubscriptions_CreateOrUpdate.json                                                   |
| [monitoredSubscriptionsDeleteSample.js][monitoredsubscriptionsdeletesample]                           | updates the subscriptions that are being monitored by the Dynatrace monitor resource x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Delete.json                                                        |
| [monitoredSubscriptionsGetSample.js][monitoredsubscriptionsgetsample]                                 | list the subscriptions currently being monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Get.json                                                            |
| [monitoredSubscriptionsListSample.js][monitoredsubscriptionslistsample]                               | list the subscriptions currently being monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/MonitoredSubscriptions_List.json                                                           |
| [monitoredSubscriptionsUpdateSample.js][monitoredsubscriptionsupdatesample]                           | updates the subscriptions that are being monitored by the Dynatrace monitor resource x-ms-original-file: 2024-04-24/MonitoredSubscriptions_Update.json                                                        |
| [monitorsCreateOrUpdateSample.js][monitorscreateorupdatesample]                                       | create a MonitorResource x-ms-original-file: 2024-04-24/Monitors_CreateOrUpdate_MaximumSet_Gen.json                                                                                                           |
| [monitorsDeleteSample.js][monitorsdeletesample]                                                       | delete a MonitorResource x-ms-original-file: 2024-04-24/Monitors_Delete_MaximumSet_Gen.json                                                                                                                   |
| [monitorsGetAllConnectedResourcesCountSample.js][monitorsgetallconnectedresourcescountsample]         | get the total number of connected resources for the given marketplace subscription Id x-ms-original-file: 2024-04-24/Monitors_GetAllConnectedResourcesCount_MaximumSet_Gen.json                               |
| [monitorsGetMarketplaceSaaSResourceDetailsSample.js][monitorsgetmarketplacesaasresourcedetailssample] | get Marketplace SaaS resource details x-ms-original-file: 2024-04-24/Monitors_GetMarketplaceSaaSResourceDetails_MaximumSet_Gen.json                                                                           |
| [monitorsGetMetricStatusSample.js][monitorsgetmetricstatussample]                                     | get metric status x-ms-original-file: 2024-04-24/Monitors_GetMetricStatus_MaximumSet_Gen.json                                                                                                                 |
| [monitorsGetSSODetailsSample.js][monitorsgetssodetailssample]                                         | gets the SSO configuration details from the partner. x-ms-original-file: 2024-04-24/Monitors_GetSSODetails_MaximumSet_Gen.json                                                                                |
| [monitorsGetSample.js][monitorsgetsample]                                                             | get a MonitorResource x-ms-original-file: 2024-04-24/Monitors_Get_MaximumSet_Gen.json                                                                                                                         |
| [monitorsGetVMHostPayloadSample.js][monitorsgetvmhostpayloadsample]                                   | returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM. x-ms-original-file: 2024-04-24/Monitors_GetVMHostPayload_MaximumSet_Gen.json                          |
| [monitorsListAppServicesSample.js][monitorslistappservicessample]                                     | gets list of App Services with Dynatrace PaaS OneAgent enabled x-ms-original-file: 2024-04-24/Monitors_ListAppServices_MaximumSet_Gen.json                                                                    |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample]                             | list MonitorResource resources by resource group x-ms-original-file: 2024-04-24/Monitors_ListByResourceGroup_MaximumSet_Gen.json                                                                              |
| [monitorsListBySubscriptionIdSample.js][monitorslistbysubscriptionidsample]                           | list all MonitorResource by subscriptionId x-ms-original-file: 2024-04-24/Monitors_ListBySubscriptionId_MaximumSet_Gen.json                                                                                   |
| [monitorsListHostsSample.js][monitorslisthostssample]                                                 | list the VM/VMSS resources currently being monitored by the Dynatrace resource. x-ms-original-file: 2024-04-24/Monitors_ListHosts_MaximumSet_Gen.json                                                         |
| [monitorsListLinkableEnvironmentsSample.js][monitorslistlinkableenvironmentssample]                   | gets all the Dynatrace environments that a user can link a azure resource to x-ms-original-file: 2024-04-24/Monitors_ListLinkableEnvironments_MaximumSet_Gen.json                                             |
| [monitorsListMonitoredResourcesSample.js][monitorslistmonitoredresourcessample]                       | list the resources currently being monitored by the Dynatrace monitor resource. x-ms-original-file: 2024-04-24/Monitors_ListMonitoredResources_MaximumSet_Gen.json                                            |
| [monitorsManageAgentInstallationSample.js][monitorsmanageagentinstallationsample]                     | performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources. x-ms-original-file: 2024-04-24/Monitors_ManageAgentInstallation_MaximumSet_Gen.json |
| [monitorsUpdateSample.js][monitorsupdatesample]                                                       | update a MonitorResource x-ms-original-file: 2024-04-24/Monitors_Update_MaximumSet_Gen.json                                                                                                                   |
| [monitorsUpgradePlanSample.js][monitorsupgradeplansample]                                             | upgrades the billing Plan for Dynatrace monitor resource. x-ms-original-file: 2024-04-24/Monitors_UpgradePlan_MaximumSet_Gen.json                                                                             |
| [operationsListSample.js][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2024-04-24/Operations_List_MaximumSet_Gen.json                                                                                                       |
| [singleSignOnCreateOrUpdateSample.js][singlesignoncreateorupdatesample]                               | create a DynatraceSingleSignOnResource x-ms-original-file: 2024-04-24/SingleSignOn_CreateOrUpdate_MaximumSet_Gen.json                                                                                         |
| [singleSignOnGetSample.js][singlesignongetsample]                                                     | get a DynatraceSingleSignOnResource x-ms-original-file: 2024-04-24/SingleSignOn_Get_MaximumSet_Gen.json                                                                                                       |
| [singleSignOnListSample.js][singlesignonlistsample]                                                   | list all DynatraceSingleSignOnResource by monitorName x-ms-original-file: 2024-04-24/SingleSignOn_List_MaximumSet_Gen.json                                                                                    |
| [tagRulesCreateOrUpdateSample.js][tagrulescreateorupdatesample]                                       | create a TagRule x-ms-original-file: 2024-04-24/TagRules_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                   |
| [tagRulesDeleteSample.js][tagrulesdeletesample]                                                       | delete a TagRule x-ms-original-file: 2024-04-24/TagRules_Delete_MaximumSet_Gen.json                                                                                                                           |
| [tagRulesGetSample.js][tagrulesgetsample]                                                             | get a TagRule x-ms-original-file: 2024-04-24/TagRules_Get_MaximumSet_Gen.json                                                                                                                                 |
| [tagRulesListSample.js][tagruleslistsample]                                                           | list all TagRule by monitorName x-ms-original-file: 2024-04-24/TagRules_List_MaximumSet_Gen.json                                                                                                              |

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
node creationSupportedGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node creationSupportedGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[creationsupportedgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/creationSupportedGetSample.js
[creationsupportedlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/creationSupportedListSample.js
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitoredSubscriptionsCreateOrUpdateSample.js
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitoredSubscriptionsDeleteSample.js
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitoredSubscriptionsGetSample.js
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitoredSubscriptionsListSample.js
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitoredSubscriptionsUpdateSample.js
[monitorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsCreateOrUpdateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsDeleteSample.js
[monitorsgetallconnectedresourcescountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsGetAllConnectedResourcesCountSample.js
[monitorsgetmarketplacesaasresourcedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsGetMarketplaceSaaSResourceDetailsSample.js
[monitorsgetmetricstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsGetMetricStatusSample.js
[monitorsgetssodetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsGetSSODetailsSample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsGetSample.js
[monitorsgetvmhostpayloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsGetVMHostPayloadSample.js
[monitorslistappservicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsListAppServicesSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsListByResourceGroupSample.js
[monitorslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsListBySubscriptionIdSample.js
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsListHostsSample.js
[monitorslistlinkableenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsListLinkableEnvironmentsSample.js
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsListMonitoredResourcesSample.js
[monitorsmanageagentinstallationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsManageAgentInstallationSample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsUpdateSample.js
[monitorsupgradeplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/monitorsUpgradePlanSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/operationsListSample.js
[singlesignoncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/singleSignOnCreateOrUpdateSample.js
[singlesignongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/singleSignOnGetSample.js
[singlesignonlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/singleSignOnListSample.js
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/tagRulesCreateOrUpdateSample.js
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/tagRulesDeleteSample.js
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/tagRulesGetSample.js
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v3-beta/javascript/tagRulesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dynatrace?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dynatrace/arm-dynatrace/README.md
