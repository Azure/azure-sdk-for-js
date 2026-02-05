# @azure/arm-programmableconnectivity client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-programmableconnectivity in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [gatewaysCreateOrUpdateSample.js][gatewayscreateorupdatesample]                                       | create or update an APC Gateway. x-ms-original-file: 2024-01-15-preview/Gateways_CreateOrUpdate_MaximumSet_Gen.json                                           |
| [gatewaysDeleteSample.js][gatewaysdeletesample]                                                       | delete a Gateway. x-ms-original-file: 2024-01-15-preview/Gateways_Delete_MinimumSet_Gen.json                                                                  |
| [gatewaysGetSample.js][gatewaysgetsample]                                                             | get a Gateway resource by name. x-ms-original-file: 2024-01-15-preview/Gateways_Get_MaximumSet_Gen.json                                                       |
| [gatewaysListByResourceGroupSample.js][gatewayslistbyresourcegroupsample]                             | list Gateway resources by resource group. x-ms-original-file: 2024-01-15-preview/Gateways_ListByResourceGroup_MaximumSet_Gen.json                             |
| [gatewaysListBySubscriptionSample.js][gatewayslistbysubscriptionsample]                               | list Gateway resources by subscription ID. x-ms-original-file: 2024-01-15-preview/Gateways_ListBySubscription_MaximumSet_Gen.json                             |
| [gatewaysUpdateSample.js][gatewaysupdatesample]                                                       | update Gateway tags. x-ms-original-file: 2024-01-15-preview/Gateways_Update_MaximumSet_Gen.json                                                               |
| [operationsListSample.js][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2024-01-15-preview/Operations_List_MaximumSet_Gen.json                                               |
| [operatorApiConnectionsCreateSample.js][operatorapiconnectionscreatesample]                           | create an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Create_MaximumSet_Gen.json                                   |
| [operatorApiConnectionsDeleteSample.js][operatorapiconnectionsdeletesample]                           | delete an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Delete_MinimumSet_Gen.json                                   |
| [operatorApiConnectionsGetSample.js][operatorapiconnectionsgetsample]                                 | get an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Get_MaximumSet_Gen.json                                         |
| [operatorApiConnectionsListByResourceGroupSample.js][operatorapiconnectionslistbyresourcegroupsample] | list OperatorApiConnection resources by resource group. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_ListByResourceGroup_MaximumSet_Gen.json |
| [operatorApiConnectionsListBySubscriptionSample.js][operatorapiconnectionslistbysubscriptionsample]   | list OperatorApiConnection resources by subscription ID. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_ListBySubscription_MaximumSet_Gen.json |
| [operatorApiConnectionsUpdateSample.js][operatorapiconnectionsupdatesample]                           | update an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Update_MaximumSet_Gen.json                                   |
| [operatorApiPlansGetSample.js][operatorapiplansgetsample]                                             | get an OperatorApiPlan resource by name. x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_Get_MaximumSet_Gen.json                                      |
| [operatorApiPlansListBySubscriptionSample.js][operatorapiplanslistbysubscriptionsample]               | list OperatorApiPlan resources by subscription ID. x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_ListBySubscription_MaximumSet_Gen.json             |

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
node gatewaysCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node gatewaysCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[gatewayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/gatewaysCreateOrUpdateSample.js
[gatewaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/gatewaysDeleteSample.js
[gatewaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/gatewaysGetSample.js
[gatewayslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/gatewaysListByResourceGroupSample.js
[gatewayslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/gatewaysListBySubscriptionSample.js
[gatewaysupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/gatewaysUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operationsListSample.js
[operatorapiconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiConnectionsCreateSample.js
[operatorapiconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiConnectionsDeleteSample.js
[operatorapiconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiConnectionsGetSample.js
[operatorapiconnectionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiConnectionsListByResourceGroupSample.js
[operatorapiconnectionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiConnectionsListBySubscriptionSample.js
[operatorapiconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiConnectionsUpdateSample.js
[operatorapiplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiPlansGetSample.js
[operatorapiplanslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/javascript/operatorApiPlansListBySubscriptionSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-programmableconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/programmableconnectivity/arm-programmableconnectivity/README.md
