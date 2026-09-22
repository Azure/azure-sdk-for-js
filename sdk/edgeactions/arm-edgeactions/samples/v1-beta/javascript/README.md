# @azure/arm-edgeactions client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-edgeactions in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [edgeActionExecutionFiltersCreateSample.js][edgeactionexecutionfilterscreatesample]                     | create a EdgeActionExecutionFilter x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Create.json                               |
| [edgeActionExecutionFiltersDeleteSample.js][edgeactionexecutionfiltersdeletesample]                     | delete a EdgeActionExecutionFilter x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Delete.json                               |
| [edgeActionExecutionFiltersGetSample.js][edgeactionexecutionfiltersgetsample]                           | get a EdgeActionExecutionFilter x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Get.json                                     |
| [edgeActionExecutionFiltersListByEdgeActionSample.js][edgeactionexecutionfilterslistbyedgeactionsample] | list EdgeActionExecutionFilter resources by EdgeAction x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_ListByEdgeAction.json |
| [edgeActionExecutionFiltersUpdateSample.js][edgeactionexecutionfiltersupdatesample]                     | update a EdgeActionExecutionFilter x-ms-original-file: 2025-12-01-preview/EdgeActionExecutionFilters_Update.json                               |
| [edgeActionVersionsCreateSample.js][edgeactionversionscreatesample]                                     | create a EdgeActionVersion x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Create.json                                               |
| [edgeActionVersionsDeleteSample.js][edgeactionversionsdeletesample]                                     | delete a EdgeActionVersion x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Delete.json                                               |
| [edgeActionVersionsDeployVersionCodeSample.js][edgeactionversionsdeployversioncodesample]               | a long-running resource action. x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_DeployVersionCode.json                               |
| [edgeActionVersionsGetSample.js][edgeactionversionsgetsample]                                           | get a EdgeActionVersion x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Get.json                                                     |
| [edgeActionVersionsGetVersionCodeSample.js][edgeactionversionsgetversioncodesample]                     | get the version code for the edge action version. x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_GetVersionCode.json                |
| [edgeActionVersionsListByEdgeActionSample.js][edgeactionversionslistbyedgeactionsample]                 | list EdgeActionVersion resources by EdgeAction x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_ListByEdgeAction.json                 |
| [edgeActionVersionsSwapDefaultSample.js][edgeactionversionsswapdefaultsample]                           | swap the default version for the edge action. x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_SwapDefault.json                       |
| [edgeActionVersionsUpdateSample.js][edgeactionversionsupdatesample]                                     | update a EdgeActionVersion x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_Update.json                                               |
| [edgeActionsCreateSample.js][edgeactionscreatesample]                                                   | create a EdgeAction x-ms-original-file: 2025-12-01-preview/EdgeActions_Create.json                                                             |
| [edgeActionsDeleteSample.js][edgeactionsdeletesample]                                                   | delete a EdgeAction x-ms-original-file: 2025-12-01-preview/EdgeActions_Delete.json                                                             |
| [edgeActionsGetSample.js][edgeactionsgetsample]                                                         | get a EdgeAction x-ms-original-file: 2025-12-01-preview/EdgeActions_Get.json                                                                   |
| [edgeActionsListByResourceGroupSample.js][edgeactionslistbyresourcegroupsample]                         | list EdgeAction resources by resource group x-ms-original-file: 2025-12-01-preview/EdgeActions_ListByResourceGroup.json                        |
| [edgeActionsListBySubscriptionSample.js][edgeactionslistbysubscriptionsample]                           | list EdgeAction resources by subscription ID x-ms-original-file: 2025-12-01-preview/EdgeActions_ListBySubscription.json                        |
| [edgeActionsUpdateSample.js][edgeactionsupdatesample]                                                   | update a EdgeAction x-ms-original-file: 2025-12-01-preview/EdgeActions_Update.json                                                             |

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
node edgeActionExecutionFiltersCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node edgeActionExecutionFiltersCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[edgeactionexecutionfilterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionExecutionFiltersCreateSample.js
[edgeactionexecutionfiltersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionExecutionFiltersDeleteSample.js
[edgeactionexecutionfiltersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionExecutionFiltersGetSample.js
[edgeactionexecutionfilterslistbyedgeactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionExecutionFiltersListByEdgeActionSample.js
[edgeactionexecutionfiltersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionExecutionFiltersUpdateSample.js
[edgeactionversionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsCreateSample.js
[edgeactionversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsDeleteSample.js
[edgeactionversionsdeployversioncodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsDeployVersionCodeSample.js
[edgeactionversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsGetSample.js
[edgeactionversionsgetversioncodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsGetVersionCodeSample.js
[edgeactionversionslistbyedgeactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsListByEdgeActionSample.js
[edgeactionversionsswapdefaultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsSwapDefaultSample.js
[edgeactionversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionVersionsUpdateSample.js
[edgeactionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionsCreateSample.js
[edgeactionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionsDeleteSample.js
[edgeactionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionsGetSample.js
[edgeactionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionsListByResourceGroupSample.js
[edgeactionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionsListBySubscriptionSample.js
[edgeactionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/edgeactions/arm-edgeactions/samples/v1-beta/javascript/edgeActionsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-edgeactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/edgeactions/arm-edgeactions/README.md
