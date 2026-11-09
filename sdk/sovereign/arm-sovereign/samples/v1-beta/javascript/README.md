# @azure/arm-sovereign client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-sovereign in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsCheckNameAvailabilityLocalSample.js][operationschecknameavailabilitylocalsample]                         | implements local CheckNameAvailability operations x-ms-original-file: 2026-10-31-preview/Operations_CheckNameAvailabilityLocal.json                                                                                         |
| [operationsCheckNameAvailabilitySample.js][operationschecknameavailabilitysample]                                   | implements global CheckNameAvailability operations x-ms-original-file: 2026-10-31-preview/Operations_CheckNameAvailability.json                                                                                             |
| [operationsListSample.js][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2026-10-31-preview/Operations_List.json                                                                                                                            |
| [sovereignViewOperationsComplianceDetailsSample.js][sovereignviewoperationscompliancedetailssample]                 | gets compliance details for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceDetails.json                                                                              |
| [sovereignViewOperationsComplianceResourceDetailsSample.js][sovereignviewoperationscomplianceresourcedetailssample] | gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceResourceDetails.json |
| [sovereignViewOperationsComplianceSummarySample.js][sovereignviewoperationscompliancesummarysample]                 | gets the compliance summary for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceSummary.json                                                                          |
| [sovereignViewOperationsCreateSample.js][sovereignviewoperationscreatesample]                                       | creates or updates the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Create.json                                                                                                  |
| [sovereignViewOperationsDeleteSample.js][sovereignviewoperationsdeletesample]                                       | deletes the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Delete.json                                                                                                             |
| [sovereignViewOperationsFilterValuesSample.js][sovereignviewoperationsfiltervaluessample]                           | gets filter values for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_FilterValues.json                                                                                        |
| [sovereignViewOperationsGetSample.js][sovereignviewoperationsgetsample]                                             | gets the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Get.json                                                                                                                   |
| [sovereignViewOperationsListByResourceGroupSample.js][sovereignviewoperationslistbyresourcegroupsample]             | lists the Sovereign View resources within a resource group. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ListByResourceGroup.json                                                                         |
| [sovereignViewOperationsListBySubscriptionSample.js][sovereignviewoperationslistbysubscriptionsample]               | lists the Sovereign View resources within a subscription. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ListBySubscription.json                                                                            |
| [sovereignViewOperationsOperationalStatusSample.js][sovereignviewoperationsoperationalstatussample]                 | gets the operational status for the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_OperationalStatus.json                                                                          |
| [sovereignViewOperationsRemediateSample.js][sovereignviewoperationsremediatesample]                                 | remediates the Sovereign View resource for the given Azure Resource Manager resource IDs. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Remediate.json                                                     |
| [sovereignViewOperationsRemediationResultSample.js][sovereignviewoperationsremediationresultsample]                 | fetches the result of a previously triggered remediation. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_RemediationResult.json                                                                             |
| [sovereignViewOperationsUpdateSample.js][sovereignviewoperationsupdatesample]                                       | updates the Sovereign View resource. x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Update.json                                                                                                             |

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
node operationsCheckNameAvailabilityLocalSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsCheckNameAvailabilityLocalSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationschecknameavailabilitylocalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/operationsCheckNameAvailabilityLocalSample.js
[operationschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/operationsCheckNameAvailabilitySample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/operationsListSample.js
[sovereignviewoperationscompliancedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsComplianceDetailsSample.js
[sovereignviewoperationscomplianceresourcedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsComplianceResourceDetailsSample.js
[sovereignviewoperationscompliancesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsComplianceSummarySample.js
[sovereignviewoperationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsCreateSample.js
[sovereignviewoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsDeleteSample.js
[sovereignviewoperationsfiltervaluessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsFilterValuesSample.js
[sovereignviewoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsGetSample.js
[sovereignviewoperationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsListByResourceGroupSample.js
[sovereignviewoperationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsListBySubscriptionSample.js
[sovereignviewoperationsoperationalstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsOperationalStatusSample.js
[sovereignviewoperationsremediatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsRemediateSample.js
[sovereignviewoperationsremediationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsRemediationResultSample.js
[sovereignviewoperationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sovereign/arm-sovereign/samples/v1-beta/javascript/sovereignViewOperationsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sovereign?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sovereign/arm-sovereign/README.md
