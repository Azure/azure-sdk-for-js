# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [accountsListSample.js][accountslistsample]                                                   | List all the existing accounts x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Accounts_List_MaximumSet_Gen.json                                                                                  |
| [monitorsCreateOrUpdateSample.js][monitorscreateorupdatesample]                               | Create a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_CreateOrUpdate_MaximumSet_Gen.json                                                                      |
| [monitorsDeleteSample.js][monitorsdeletesample]                                               | Delete a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_Delete_MaximumSet_Gen.json                                                                              |
| [monitorsGetMetricRulesSample.js][monitorsgetmetricrulessample]                               | Get metric rules x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_GetMetricRules_MaximumSet_Gen.json                                                                                      |
| [monitorsGetMetricStatusSample.js][monitorsgetmetricstatussample]                             | Get metric status x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_GetMetricStatus_MaximumSet_Gen.json                                                                                    |
| [monitorsGetSample.js][monitorsgetsample]                                                     | Get a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_Get_MaximumSet_Gen.json                                                                                    |
| [monitorsListAppServicesSample.js][monitorslistappservicessample]                             | List the app service resources currently being monitored by the NewRelic resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_ListAppServices_MaximumSet_Gen.json                   |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample]                     | List NewRelicMonitorResource resources by resource group x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_ListByResourceGroup_MaximumSet_Gen.json                                         |
| [monitorsListBySubscriptionSample.js][monitorslistbysubscriptionsample]                       | List NewRelicMonitorResource resources by subscription ID x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_ListBySubscription_MaximumSet_Gen.json                                         |
| [monitorsListHostsSample.js][monitorslisthostssample]                                         | List the compute vm resources currently being monitored by the NewRelic resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_ListHosts_MaximumSet_Gen.json                          |
| [monitorsListMonitoredResourcesSample.js][monitorslistmonitoredresourcessample]               | List the resources currently being monitored by the NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_ListMonitoredResources_MaximumSet_Gen.json                |
| [monitorsSwitchBillingSample.js][monitorsswitchbillingsample]                                 | Switches the billing for NewRelic monitor resource. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_SwitchBilling_MaximumSet_Gen.json                                                    |
| [monitorsUpdateSample.js][monitorsupdatesample]                                               | Update a NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_Update_MaximumSet_Gen.json                                                                              |
| [monitorsVMHostPayloadSample.js][monitorsvmhostpayloadsample]                                 | Returns the payload that needs to be passed in the request body for installing NewRelic agent on a VM. x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Monitors_VmHostPayload_MaximumSet_Gen.json |
| [operationsListSample.js][operationslistsample]                                               | List the operations for the provider x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Operations_List_MaximumSet_Gen.json                                                                          |
| [organizationsListSample.js][organizationslistsample]                                         | List all the existing organizations x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Organizations_List_MaximumSet_Gen.json                                                                        |
| [plansListSample.js][planslistsample]                                                         | List plans data x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/Plans_List_MaximumSet_Gen.json                                                                                                    |
| [tagRulesCreateOrUpdateSample.js][tagrulescreateorupdatesample]                               | Create a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/TagRules_CreateOrUpdate_MaximumSet_Gen.json                                                                                      |
| [tagRulesDeleteSample.js][tagrulesdeletesample]                                               | Delete a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/TagRules_Delete_MaximumSet_Gen.json                                                                                              |
| [tagRulesGetSample.js][tagrulesgetsample]                                                     | Get a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/TagRules_Get_MaximumSet_Gen.json                                                                                                    |
| [tagRulesListByNewRelicMonitorResourceSample.js][tagruleslistbynewrelicmonitorresourcesample] | List TagRule resources by NewRelicMonitorResource x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/TagRules_ListByNewRelicMonitorResource_MaximumSet_Gen.json                                      |
| [tagRulesUpdateSample.js][tagrulesupdatesample]                                               | Update a TagRule x-ms-original-file: specification/newrelic/resource-manager/NewRelic.Observability/preview/2022-07-01-preview/examples/TagRules_Update_MaximumSet_Gen.json                                                                                              |

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
node accountsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env NEWRELICOBSERVABILITY_SUBSCRIPTION_ID="<newrelicobservability subscription id>" NEWRELICOBSERVABILITY_SUBSCRIPTION_ID="<newrelicobservability subscription id>" node accountsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/accountsListSample.js
[monitorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsCreateOrUpdateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsDeleteSample.js
[monitorsgetmetricrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsGetMetricRulesSample.js
[monitorsgetmetricstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsGetMetricStatusSample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsGetSample.js
[monitorslistappservicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsListAppServicesSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsListByResourceGroupSample.js
[monitorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsListBySubscriptionSample.js
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsListHostsSample.js
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsListMonitoredResourcesSample.js
[monitorsswitchbillingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsSwitchBillingSample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsUpdateSample.js
[monitorsvmhostpayloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/monitorsVMHostPayloadSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/operationsListSample.js
[organizationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/organizationsListSample.js
[planslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/plansListSample.js
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/tagRulesCreateOrUpdateSample.js
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/tagRulesDeleteSample.js
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/tagRulesGetSample.js
[tagruleslistbynewrelicmonitorresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/tagRulesListByNewRelicMonitorResourceSample.js
[tagrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/newrelicobservability/arm-newrelicobservability/samples/v1-beta/javascript/tagRulesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-newrelicobservability?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/newrelicobservability/arm-newrelicobservability/README.md
