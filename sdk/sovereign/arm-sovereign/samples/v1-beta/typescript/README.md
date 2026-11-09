# @azure/arm-sovereign client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-sovereign in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsCheckNameAvailabilityLocalSample.ts][operationschecknameavailabilitylocalsample]                         | implements local CheckNameAvailability operations x-ms-original-file: 2026-10-31-preview/Operations_CheckNameAvailabilityLocal.json                                                                                         |
| [operationsCheckNameAvailabilitySample.ts][operationschecknameavailabilitysample]                                   | implements global CheckNameAvailability operations x-ms-original-file: 2026-10-31-preview/Operations_CheckNameAvailability.json                                                                                             |
| [operationsListSample.ts][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2026-10-31-preview/Operations_List.json                                                                                                                            |
| [sovereignViewOperationsComplianceDetailsSample.ts][sovereignviewoperationscompliancedetailssample]                 | gets compliance details for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceDetails.json                                                                              |
| [sovereignViewOperationsComplianceResourceDetailsSample.ts][sovereignviewoperationscomplianceresourcedetailssample] | gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceResourceDetails.json |
| [sovereignViewOperationsComplianceSummarySample.ts][sovereignviewoperationscompliancesummarysample]                 | gets the compliance summary for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceSummary.json                                                                          |
| [sovereignViewOperationsCreateSample.ts][sovereignviewoperationscreatesample]                                       | creates or updates the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Create.json                                                                                                  |
| [sovereignViewOperationsDeleteSample.ts][sovereignviewoperationsdeletesample]                                       | deletes the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Delete.json                                                                                                             |
| [sovereignViewOperationsFilterValuesSample.ts][sovereignviewoperationsfiltervaluessample]                           | gets filter values for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_FilterValues.json                                                                                        |
| [sovereignViewOperationsGetSample.ts][sovereignviewoperationsgetsample]                                             | gets the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Get.json                                                                                                                   |
| [sovereignViewOperationsListByResourceGroupSample.ts][sovereignviewoperationslistbyresourcegroupsample]             | lists the Sovereign View resources within a resource group. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ListByResourceGroup.json                                                                         |
| [sovereignViewOperationsListBySubscriptionSample.ts][sovereignviewoperationslistbysubscriptionsample]               | lists the Sovereign View resources within a subscription. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ListBySubscription.json                                                                            |
| [sovereignViewOperationsOperationalStatusSample.ts][sovereignviewoperationsoperationalstatussample]                 | gets the operational status for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_OperationalStatus.json                                                                          |
| [sovereignViewOperationsRemediateSample.ts][sovereignviewoperationsremediatesample]                                 | remediates the Sovereign View resource for the given Azure Resource Manager resource IDs. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Remediate.json                                                     |
| [sovereignViewOperationsRemediationResultSample.ts][sovereignviewoperationsremediationresultsample]                 | fetches the result of a previously triggered remediation. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_RemediationResult.json                                                                             |
| [sovereignViewOperationsUpdateSample.ts][sovereignviewoperationsupdatesample]                                       | updates the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Update.json                                                                                                             |

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
node dist/operationsCheckNameAvailabilityLocalSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsCheckNameAvailabilityLocalSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationschecknameavailabilitylocalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/operationsCheckNameAvailabilityLocalSample.ts
[operationschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/operationsCheckNameAvailabilitySample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/operationsListSample.ts
[sovereignviewoperationscompliancedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsComplianceDetailsSample.ts
[sovereignviewoperationscomplianceresourcedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsComplianceResourceDetailsSample.ts
[sovereignviewoperationscompliancesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsComplianceSummarySample.ts
[sovereignviewoperationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsCreateSample.ts
[sovereignviewoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsDeleteSample.ts
[sovereignviewoperationsfiltervaluessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsFilterValuesSample.ts
[sovereignviewoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsGetSample.ts
[sovereignviewoperationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsListByResourceGroupSample.ts
[sovereignviewoperationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsListBySubscriptionSample.ts
[sovereignviewoperationsoperationalstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsOperationalStatusSample.ts
[sovereignviewoperationsremediatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsRemediateSample.ts
[sovereignviewoperationsremediationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsRemediationResultSample.ts
[sovereignviewoperationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/typescript/src/sovereignViewOperationsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sovereign?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sovereign/arm-sovereign/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
