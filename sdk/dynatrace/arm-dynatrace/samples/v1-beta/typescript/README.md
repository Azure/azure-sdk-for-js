# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [monitorsCreateOrUpdateSample.ts][monitorscreateorupdatesample]                     | Create a MonitorResource x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_CreateOrUpdate_MaximumSet_Gen.json                                                                                  |
| [monitorsDeleteSample.ts][monitorsdeletesample]                                     | Delete a MonitorResource x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_Delete_MaximumSet_Gen.json                                                                                          |
| [monitorsGetAccountCredentialsSample.ts][monitorsgetaccountcredentialssample]       | Gets the user account credentials for a Monitor x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_GetAccountCredentials_MaximumSet_Gen.json                                                    |
| [monitorsGetSample.ts][monitorsgetsample]                                           | Get a MonitorResource x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_Get_MaximumSet_Gen.json                                                                                                |
| [monitorsGetSsoDetailsSample.ts][monitorsgetssodetailssample]                       | Gets the SSO configuration details from the partner. x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_GetSSODetails_MaximumSet_Gen.json                                                       |
| [monitorsGetVMHostPayloadSample.ts][monitorsgetvmhostpayloadsample]                 | Returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM. x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_GetVMHostPayload_MaximumSet_Gen.json |
| [monitorsListAppServicesSample.ts][monitorslistappservicessample]                   | Gets list of App Services with Dynatrace PaaS OneAgent enabled x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_ListAppServices_MaximumSet_Gen.json                                           |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample]           | List MonitorResource resources by resource group x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_ListByResourceGroup_MaximumSet_Gen.json                                                     |
| [monitorsListBySubscriptionIdSample.ts][monitorslistbysubscriptionidsample]         | List all MonitorResource by subscriptionId x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_ListBySubscriptionId_MaximumSet_Gen.json                                                          |
| [monitorsListHostsSample.ts][monitorslisthostssample]                               | List the compute resources currently being monitored by the Dynatrace resource. x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_ListHosts_MaximumSet_Gen.json                                |
| [monitorsListLinkableEnvironmentsSample.ts][monitorslistlinkableenvironmentssample] | Gets all the Dynatrace environments that a user can link a azure resource to x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_ListLinkableEnvironments_MaximumSet_Gen.json                    |
| [monitorsListMonitoredResourcesSample.ts][monitorslistmonitoredresourcessample]     | List the resources currently being monitored by the Dynatrace monitor resource. x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_ListMonitoredResources_MaximumSet_Gen.json                   |
| [monitorsUpdateSample.ts][monitorsupdatesample]                                     | Update a MonitorResource x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Monitors_Update_MaximumSet_Gen.json                                                                                          |
| [operationsListSample.ts][operationslistsample]                                     | List the operations for Dynatrace.Observability x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/Operations_List_MaximumSet_Gen.json                                                                   |
| [singleSignOnCreateOrUpdateSample.ts][singlesignoncreateorupdatesample]             | Create a DynatraceSingleSignOnResource x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/SingleSignOn_CreateOrUpdate_MaximumSet_Gen.json                                                                |
| [singleSignOnGetSample.ts][singlesignongetsample]                                   | Get a DynatraceSingleSignOnResource x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/SingleSignOn_Get_MaximumSet_Gen.json                                                                              |
| [singleSignOnListSample.ts][singlesignonlistsample]                                 | List all DynatraceSingleSignOnResource by monitorName x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/SingleSignOn_List_MaximumSet_Gen.json                                                           |
| [tagRulesCreateOrUpdateSample.ts][tagrulescreateorupdatesample]                     | Create a TagRule x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/TagRules_CreateOrUpdate_MaximumSet_Gen.json                                                                                          |
| [tagRulesDeleteSample.ts][tagrulesdeletesample]                                     | Delete a TagRule x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/TagRules_Delete_MaximumSet_Gen.json                                                                                                  |
| [tagRulesGetSample.ts][tagrulesgetsample]                                           | Get a TagRule x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/TagRules_Get_MaximumSet_Gen.json                                                                                                        |
| [tagRulesListSample.ts][tagruleslistsample]                                         | List all TagRule by monitorName x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/TagRules_List_MaximumSet_Gen.json                                                                                     |
| [tagRulesUpdateSample.ts][tagrulesupdatesample]                                     | Update a TagRule x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/preview/2021-09-01-preview/examples/TagRules_Update_MaximumSet_Gen.json                                                                                                  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/monitorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/monitorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[monitorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsCreateOrUpdateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsDeleteSample.ts
[monitorsgetaccountcredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsGetAccountCredentialsSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsGetSample.ts
[monitorsgetssodetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsGetSsoDetailsSample.ts
[monitorsgetvmhostpayloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsGetVMHostPayloadSample.ts
[monitorslistappservicessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsListAppServicesSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistbysubscriptionidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsListBySubscriptionIdSample.ts
[monitorslisthostssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsListHostsSample.ts
[monitorslistlinkableenvironmentssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsListLinkableEnvironmentsSample.ts
[monitorslistmonitoredresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsListMonitoredResourcesSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/monitorsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/operationsListSample.ts
[singlesignoncreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/singleSignOnCreateOrUpdateSample.ts
[singlesignongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/singleSignOnGetSample.ts
[singlesignonlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/singleSignOnListSample.ts
[tagrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/tagRulesCreateOrUpdateSample.ts
[tagrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/tagRulesDeleteSample.ts
[tagrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/tagRulesGetSample.ts
[tagruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/tagRulesListSample.ts
[tagrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dynatrace/arm-dynatrace/samples/v1-beta/typescript/src/tagRulesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dynatrace?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dynatrace/arm-dynatrace/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
