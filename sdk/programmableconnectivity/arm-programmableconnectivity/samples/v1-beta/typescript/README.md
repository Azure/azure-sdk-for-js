# @azure/arm-programmableconnectivity client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-programmableconnectivity in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [gatewaysCreateOrUpdateSample.ts][gatewayscreateorupdatesample]                                       | create or update an APC Gateway. x-ms-original-file: 2024-01-15-preview/Gateways_CreateOrUpdate_MaximumSet_Gen.json                                           |
| [gatewaysDeleteSample.ts][gatewaysdeletesample]                                                       | delete a Gateway. x-ms-original-file: 2024-01-15-preview/Gateways_Delete_MinimumSet_Gen.json                                                                  |
| [gatewaysGetSample.ts][gatewaysgetsample]                                                             | get a Gateway resource by name. x-ms-original-file: 2024-01-15-preview/Gateways_Get_MaximumSet_Gen.json                                                       |
| [gatewaysListByResourceGroupSample.ts][gatewayslistbyresourcegroupsample]                             | list Gateway resources by resource group. x-ms-original-file: 2024-01-15-preview/Gateways_ListByResourceGroup_MaximumSet_Gen.json                             |
| [gatewaysListBySubscriptionSample.ts][gatewayslistbysubscriptionsample]                               | list Gateway resources by subscription ID. x-ms-original-file: 2024-01-15-preview/Gateways_ListBySubscription_MaximumSet_Gen.json                             |
| [gatewaysUpdateSample.ts][gatewaysupdatesample]                                                       | update Gateway tags. x-ms-original-file: 2024-01-15-preview/Gateways_Update_MaximumSet_Gen.json                                                               |
| [operationsListSample.ts][operationslistsample]                                                       | list the operations for the provider x-ms-original-file: 2024-01-15-preview/Operations_List_MaximumSet_Gen.json                                               |
| [operatorApiConnectionsCreateSample.ts][operatorapiconnectionscreatesample]                           | create an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Create_MaximumSet_Gen.json                                   |
| [operatorApiConnectionsDeleteSample.ts][operatorapiconnectionsdeletesample]                           | delete an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Delete_MinimumSet_Gen.json                                   |
| [operatorApiConnectionsGetSample.ts][operatorapiconnectionsgetsample]                                 | get an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Get_MaximumSet_Gen.json                                         |
| [operatorApiConnectionsListByResourceGroupSample.ts][operatorapiconnectionslistbyresourcegroupsample] | list OperatorApiConnection resources by resource group. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_ListByResourceGroup_MaximumSet_Gen.json |
| [operatorApiConnectionsListBySubscriptionSample.ts][operatorapiconnectionslistbysubscriptionsample]   | list OperatorApiConnection resources by subscription ID. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_ListBySubscription_MaximumSet_Gen.json |
| [operatorApiConnectionsUpdateSample.ts][operatorapiconnectionsupdatesample]                           | update an Operator API Connection. x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_Update_MaximumSet_Gen.json                                   |
| [operatorApiPlansGetSample.ts][operatorapiplansgetsample]                                             | get an OperatorApiPlan resource by name. x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_Get_MaximumSet_Gen.json                                      |
| [operatorApiPlansListBySubscriptionSample.ts][operatorapiplanslistbysubscriptionsample]               | list OperatorApiPlan resources by subscription ID. x-ms-original-file: 2024-01-15-preview/OperatorApiPlans_ListBySubscription_MaximumSet_Gen.json             |

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
node dist/gatewaysCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/gatewaysCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[gatewayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/gatewaysCreateOrUpdateSample.ts
[gatewaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/gatewaysDeleteSample.ts
[gatewaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/gatewaysGetSample.ts
[gatewayslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/gatewaysListByResourceGroupSample.ts
[gatewayslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/gatewaysListBySubscriptionSample.ts
[gatewaysupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/gatewaysUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operationsListSample.ts
[operatorapiconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiConnectionsCreateSample.ts
[operatorapiconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiConnectionsDeleteSample.ts
[operatorapiconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiConnectionsGetSample.ts
[operatorapiconnectionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiConnectionsListByResourceGroupSample.ts
[operatorapiconnectionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiConnectionsListBySubscriptionSample.ts
[operatorapiconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiConnectionsUpdateSample.ts
[operatorapiplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiPlansGetSample.ts
[operatorapiplanslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/programmableconnectivity/arm-programmableconnectivity/samples/v1-beta/typescript/src/operatorApiPlansListBySubscriptionSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-programmableconnectivity?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/programmableconnectivity/arm-programmableconnectivity/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
