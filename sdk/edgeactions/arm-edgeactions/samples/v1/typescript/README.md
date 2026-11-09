# @azure/arm-edgeactions client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-edgeactions in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [edgeActionExecutionFiltersCreateSample.ts][edgeactionexecutionfilterscreatesample]                     | create a EdgeActionExecutionFilter x-ms-original-file: 2026-10-01/EdgeActionExecutionFilters_Create.json                                                                                                                                                                                                                                                                                                                         |
| [edgeActionExecutionFiltersDeleteSample.ts][edgeactionexecutionfiltersdeletesample]                     | delete a EdgeActionExecutionFilter x-ms-original-file: 2026-10-01/EdgeActionExecutionFilters_Delete.json                                                                                                                                                                                                                                                                                                                         |
| [edgeActionExecutionFiltersGetSample.ts][edgeactionexecutionfiltersgetsample]                           | get a EdgeActionExecutionFilter x-ms-original-file: 2026-10-01/EdgeActionExecutionFilters_Get.json                                                                                                                                                                                                                                                                                                                               |
| [edgeActionExecutionFiltersListByEdgeActionSample.ts][edgeactionexecutionfilterslistbyedgeactionsample] | list EdgeActionExecutionFilter resources by EdgeAction x-ms-original-file: 2026-10-01/EdgeActionExecutionFilters_ListByEdgeAction.json                                                                                                                                                                                                                                                                                           |
| [edgeActionExecutionFiltersUpdateSample.ts][edgeactionexecutionfiltersupdatesample]                     | updates the properties and tags of an Edge Action execution filter. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. x-ms-original-file: 2026-10-01/EdgeActionExecutionFilters_Update.json                                                                                                                                         |
| [edgeActionVersionsCreateSample.ts][edgeactionversionscreatesample]                                     | create a EdgeActionVersion x-ms-original-file: 2026-10-01/EdgeActionVersions_Create.json                                                                                                                                                                                                                                                                                                                                         |
| [edgeActionVersionsDeleteSample.ts][edgeactionversionsdeletesample]                                     | delete a EdgeActionVersion x-ms-original-file: 2026-10-01/EdgeActionVersions_Delete.json                                                                                                                                                                                                                                                                                                                                         |
| [edgeActionVersionsDeployVersionCodeSample.ts][edgeactionversionsdeployversioncodesample]               | a long-running resource action. x-ms-original-file: 2026-10-01/EdgeActionVersions_DeployVersionCode.json                                                                                                                                                                                                                                                                                                                         |
| [edgeActionVersionsGetSample.ts][edgeactionversionsgetsample]                                           | get a EdgeActionVersion x-ms-original-file: 2026-10-01/EdgeActionVersions_Get.json                                                                                                                                                                                                                                                                                                                                               |
| [edgeActionVersionsGetVersionCodeSample.ts][edgeactionversionsgetversioncodesample]                     | get the version code for the edge action version. x-ms-original-file: 2026-10-01/EdgeActionVersions_GetVersionCode.json                                                                                                                                                                                                                                                                                                          |
| [edgeActionVersionsListByEdgeActionSample.ts][edgeactionversionslistbyedgeactionsample]                 | list EdgeActionVersion resources by EdgeAction x-ms-original-file: 2026-10-01/EdgeActionVersions_ListByEdgeAction.json                                                                                                                                                                                                                                                                                                           |
| [edgeActionVersionsSwapDefaultSample.ts][edgeactionversionsswapdefaultsample]                           | swap the default version for the edge action. x-ms-original-file: 2026-10-01/EdgeActionVersions_SwapDefault.json                                                                                                                                                                                                                                                                                                                 |
| [edgeActionVersionsUpdateSample.ts][edgeactionversionsupdatesample]                                     | updates the tags of an Edge Action version. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. Version properties are not changed. If deploymentType or isDefaultVersion is supplied, it must match the existing value; use swapDefault to change the default version. x-ms-original-file: 2026-10-01/EdgeActionVersions_Update.json |
| [edgeActionsCreateSample.ts][edgeactionscreatesample]                                                   | create a EdgeAction x-ms-original-file: 2026-10-01/EdgeActions_Create.json                                                                                                                                                                                                                                                                                                                                                       |
| [edgeActionsDeleteSample.ts][edgeactionsdeletesample]                                                   | delete a EdgeAction x-ms-original-file: 2026-10-01/EdgeActions_Delete.json                                                                                                                                                                                                                                                                                                                                                       |
| [edgeActionsGetSample.ts][edgeactionsgetsample]                                                         | get a EdgeAction x-ms-original-file: 2026-10-01/EdgeActions_Get.json                                                                                                                                                                                                                                                                                                                                                             |
| [edgeActionsListByResourceGroupSample.ts][edgeactionslistbyresourcegroupsample]                         | list EdgeAction resources by resource group x-ms-original-file: 2026-10-01/EdgeActions_ListByResourceGroup.json                                                                                                                                                                                                                                                                                                                  |
| [edgeActionsListBySubscriptionSample.ts][edgeactionslistbysubscriptionsample]                           | list EdgeAction resources by subscription ID x-ms-original-file: 2026-10-01/EdgeActions_ListBySubscription.json                                                                                                                                                                                                                                                                                                                  |
| [edgeActionsUpdateSample.ts][edgeactionsupdatesample]                                                   | updates the tags of an Edge Action. Omitted tags are preserved, an empty tags object clears all tags, and supplied tags replace the entire tag collection. Null tags are rejected. Do not include sku in PATCH requests; any supplied sku, including null or the existing value, is rejected. x-ms-original-file: 2026-10-01/EdgeActions_Update.json                                                                             |

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
node dist/edgeActionExecutionFiltersCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/edgeActionExecutionFiltersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[edgeactionexecutionfilterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionExecutionFiltersCreateSample.ts
[edgeactionexecutionfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionExecutionFiltersDeleteSample.ts
[edgeactionexecutionfiltersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionExecutionFiltersGetSample.ts
[edgeactionexecutionfilterslistbyedgeactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionExecutionFiltersListByEdgeActionSample.ts
[edgeactionexecutionfiltersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionExecutionFiltersUpdateSample.ts
[edgeactionversionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsCreateSample.ts
[edgeactionversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsDeleteSample.ts
[edgeactionversionsdeployversioncodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsDeployVersionCodeSample.ts
[edgeactionversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsGetSample.ts
[edgeactionversionsgetversioncodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsGetVersionCodeSample.ts
[edgeactionversionslistbyedgeactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsListByEdgeActionSample.ts
[edgeactionversionsswapdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsSwapDefaultSample.ts
[edgeactionversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionVersionsUpdateSample.ts
[edgeactionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionsCreateSample.ts
[edgeactionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionsDeleteSample.ts
[edgeactionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionsGetSample.ts
[edgeactionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionsListByResourceGroupSample.ts
[edgeactionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionsListBySubscriptionSample.ts
[edgeactionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1/typescript/src/edgeActionsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-edgeactions
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgeactions/arm-edgeactions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
