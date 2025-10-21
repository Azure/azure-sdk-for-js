# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsListSample.ts][accountslistsample]                                                   | List all the existing accounts x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Accounts_List_MaximumSet_Gen.json                                                                                      |
| [billingInfoGetSample.ts][billinginfogetsample]                                               | Get marketplace info mapped to the given monitor. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/BillingInfo_Get.json                                                                                |
| [connectedPartnerResourcesListSample.ts][connectedpartnerresourceslistsample]                 | List of all active deployments that are associated with the marketplace subscription linked to the given monitor. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/ConnectedPartnerResources_List.json |
| [monitoredSubscriptionsCreateorUpdateSample.ts][monitoredsubscriptionscreateorupdatesample]   | Add the subscriptions that should be monitored by the NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/MonitoredSubscriptions_CreateorUpdate.json                           |
| [monitoredSubscriptionsDeleteSample.ts][monitoredsubscriptionsdeletesample]                   | Updates the subscriptions that are being monitored by the NewRelic monitor resource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/MonitoredSubscriptions_Delete.json                                |
| [monitoredSubscriptionsGetSample.ts][monitoredsubscriptionsgetsample]                         | List the subscriptions currently being monitored by the NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/MonitoredSubscriptions_Get.json                                    |
| [monitoredSubscriptionsListSample.ts][monitoredsubscriptionslistsample]                       | List the subscriptions currently being monitored by the NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/MonitoredSubscriptions_List.json                                   |
| [monitoredSubscriptionsUpdateSample.ts][monitoredsubscriptionsupdatesample]                   | Updates the subscriptions that are being monitored by the NewRelic monitor resource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/MonitoredSubscriptions_Update.json                                |
| [monitorsCreateOrUpdateSample.ts][monitorscreateorupdatesample]                               | Create a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_CreateOrUpdate_MaximumSet_Gen.json                                                                          |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                               | Delete a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_Delete_MaximumSet_Gen.json                                                                                  |
| [monitorsGetMetricRulesSample.ts][monitorsgetmetricrulessample]                               | Get metric rules x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_GetMetricRules_MaximumSet_Gen.json                                                                                          |
| [monitorsGetMetricStatusSample.ts][monitorsgetmetricstatussample]                             | Get metric status x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_GetMetricStatus_MaximumSet_Gen.json                                                                                        |
| [monitorsGetSample.ts][monitorsgetsample]                                                     | Get a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_Get_MaximumSet_Gen.json                                                                                        |
| [monitorsListAppServicesSample.ts][monitorslistappservicessample]                             | List the app service resources currently being monitored by the NewRelic resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_ListAppServices_MaximumSet_Gen.json                       |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]                     | List NewRelicMonitorResource resources by resource group x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_ListByResourceGroup_MaximumSet_Gen.json                                             |
| [monitorsListBySubscriptionSample.ts][monitorslistbysubscriptionsample]                       | List NewRelicMonitorResource resources by subscription ID x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_ListBySubscription_MaximumSet_Gen.json                                             |
| [monitorsListHostsSample.ts][monitorslisthostssample]                                         | List the compute vm resources currently being monitored by the NewRelic resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_ListHosts_MaximumSet_Gen.json                              |
| [monitorsListLinkedResourcesSample.ts][monitorslistlinkedresourcessample]                     | List all Azure resources associated to the same NewRelic organization and account as the target resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/LinkedResources_List.json                   |
| [monitorsListMonitoredResourcesSample.ts][monitorslistmonitoredresourcessample]               | List the resources currently being monitored by the NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_ListMonitoredResources_MaximumSet_Gen.json                    |
| [monitorsSwitchBillingSample.ts][monitorsswitchbillingsample]                                 | Switches the billing for NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_SwitchBilling_MaximumSet_Gen.json                                                        |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                               | Update a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_Update_MaximumSet_Gen.json                                                                                  |
| [monitorsVMHostPayloadSample.ts][monitorsvmhostpayloadsample]                                 | Returns the payload that needs to be passed in the request body for installing NewRelic agent on a VM. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Monitors_VmHostPayload_MaximumSet_Gen.json     |
| [operationsListSample.ts][operationslistsample]                                               | List the operations for the provider x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Operations_List_MaximumSet_Gen.json                                                                              |
| [organizationsListSample.ts][organizationslistsample]                                         | List all the existing organizations x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Organizations_List_MaximumSet_Gen.json                                                                            |
| [plansListSample.ts][planslistsample]                                                         | List plans data x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/Plans_List_MaximumSet_Gen.json                                                                                                        |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                               | Create a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_CreateOrUpdate_MaximumSet_Gen.json                                                                                          |
| [tagRulesDeleteSample.ts][tagrulesdeletesample]                                               | Delete a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_Delete_MaximumSet_Gen.json                                                                                                  |
| [tagRulesGetSample.ts][tagrulesgetsample]                                                     | Get a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_Get_MaximumSet_Gen.json                                                                                                        |
| [tagRulesListByNewRelicMonitorResourceSample.ts][tagruleslistbynewrelicmonitorresourcesample] | List TagRule resources by NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_ListByNewRelicMonitorResource_MaximumSet_Gen.json                                          |
| [tagRulesUpdateSample.ts][tagrulesupdatesample]                                               | Update a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/stable/2024-01-01/examples/TagRules_Update_MaximumSet_Gen.json                                                                                                  |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env NEWRELICOBSERVABILITY_SUBSCRIPTION_ID="<newrelicobservability subscription id>" node dist/accountsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/accountsListSample.ts
[billinginfogetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/billingInfoGetSample.ts
[connectedpartnerresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/connectedPartnerResourcesListSample.ts
[monitoredsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitoredSubscriptionsCreateorUpdateSample.ts
[monitoredsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitoredSubscriptionsDeleteSample.ts
[monitoredsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitoredSubscriptionsGetSample.ts
[monitoredsubscriptionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitoredSubscriptionsListSample.ts
[monitoredsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitoredSubscriptionsUpdateSample.ts
[monitorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsCreateOrUpdateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsDeleteSample.ts
[monitorsgetmetricrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsGetMetricRulesSample.ts
[monitorsgetmetricstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsGetMetricStatusSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsGetSample.ts
[monitorslistappservicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsListAppServicesSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsListBySubscriptionSample.ts
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsListHostsSample.ts
[monitorslistlinkedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsListLinkedResourcesSample.ts
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsListMonitoredResourcesSample.ts
[monitorsswitchbillingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsSwitchBillingSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsUpdateSample.ts
[monitorsvmhostpayloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/monitorsVMHostPayloadSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/operationsListSample.ts
[organizationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/organizationsListSample.ts
[planslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/plansListSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/tagRulesDeleteSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/tagRulesGetSample.ts
[tagruleslistbynewrelicmonitorresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/tagRulesListByNewRelicMonitorResourceSample.ts
[tagrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1/typescript/src/tagRulesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-newrelicobservability?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/newrelicobservability/arm-newrelicobservability/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
