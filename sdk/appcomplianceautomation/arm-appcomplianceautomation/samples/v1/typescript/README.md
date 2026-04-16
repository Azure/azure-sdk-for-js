# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [evidenceCreateOrUpdateSample.ts][evidencecreateorupdatesample]                                       | Create or Update an evidence a specified report x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_CreateOrUpdate.json                                                                                                        |
| [evidenceDeleteSample.ts][evidencedeletesample]                                                       | Delete an existent evidence from a specified report x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_Delete.json                                                                                                            |
| [evidenceDownloadSample.ts][evidencedownloadsample]                                                   | Download evidence file. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_Download.json                                                                                                                                      |
| [evidenceGetSample.ts][evidencegetsample]                                                             | Get the evidence metadata x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_Get.json                                                                                                                                         |
| [evidenceListByReportSample.ts][evidencelistbyreportsample]                                           | Returns a paginated list of evidences for a specified report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Evidence_ListByReport.json                                                                                            |
| [operationsListSample.ts][operationslistsample]                                                       | List the operations for the provider x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Operations_List.json                                                                                                                           |
| [providerActionsCheckNameAvailabilitySample.ts][provideractionschecknameavailabilitysample]           | Check if the given name is available for a report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_CheckNameAvailability.json                                                                                                |
| [providerActionsGetCollectionCountSample.ts][provideractionsgetcollectioncountsample]                 | Get the count of reports. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_GetCollectionCount.json                                                                                                                            |
| [providerActionsGetOverviewStatusSample.ts][provideractionsgetoverviewstatussample]                   | Get the resource overview status. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_GetOverviewStatus.json                                                                                                                     |
| [providerActionsListInUseStorageAccountsSample.ts][provideractionslistinusestorageaccountssample]     | List the storage accounts which are in use by related reports x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ListInUseStorageAccountsWithSubscriptions.json                                                                        |
| [providerActionsOnboardSample.ts][provideractionsonboardsample]                                       | Onboard given subscriptions to Microsoft.AppComplianceAutomation provider. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Onboard.json                                                                                             |
| [providerActionsTriggerEvaluationSample.ts][provideractionstriggerevaluationsample]                   | Trigger quick evaluation for the given subscriptions. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/TriggerEvaluation.json                                                                                                        |
| [reportCreateOrUpdateSample.ts][reportcreateorupdatesample]                                           | Create a new AppComplianceAutomation report or update an exiting AppComplianceAutomation report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_CreateOrUpdate.json                                                         |
| [reportDeleteSample.ts][reportdeletesample]                                                           | Delete an AppComplianceAutomation report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Delete.json                                                                                                                        |
| [reportFixSample.ts][reportfixsample]                                                                 | Fix the AppComplianceAutomation report error. e.g: App Compliance Automation Tool service unregistered, automation removed. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Fix.json                                         |
| [reportGetSample.ts][reportgetsample]                                                                 | Get the AppComplianceAutomation report and its properties. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Get.json                                                                                                          |
| [reportGetScopingQuestionsSample.ts][reportgetscopingquestionssample]                                 | Fix the AppComplianceAutomation report error. e.g: App Compliance Automation Tool service unregistered, automation removed. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_GetScopingQuestions.json                         |
| [reportListSample.ts][reportlistsample]                                                               | Get the AppComplianceAutomation report list for the tenant. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_List.json                                                                                                        |
| [reportNestedResourceCheckNameAvailabilitySample.ts][reportnestedresourcechecknameavailabilitysample] | Checks the report's nested resource name availability, e.g: Webhooks, Evidences, Snapshots. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_NestedResourceCheckNameAvailability_Report_Evidence_Check_Name_Availability.json |
| [reportSyncCertRecordSample.ts][reportsynccertrecordsample]                                           | Synchronize attestation record from app compliance. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_SyncCertRecord.json                                                                                                      |
| [reportUpdateSample.ts][reportupdatesample]                                                           | Update an exiting AppComplianceAutomation report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Update.json                                                                                                                |
| [reportVerifySample.ts][reportverifysample]                                                           | Verify the AppComplianceAutomation report health status. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Report_Verify.json                                                                                                         |
| [scopingConfigurationCreateOrUpdateSample.ts][scopingconfigurationcreateorupdatesample]               | Get the AppComplianceAutomation scoping configuration of the specific report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_CreateOrUpdate.json                                                              |
| [scopingConfigurationDeleteSample.ts][scopingconfigurationdeletesample]                               | Clean the AppComplianceAutomation scoping configuration of the specific report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_Delete.json                                                                    |
| [scopingConfigurationGetSample.ts][scopingconfigurationgetsample]                                     | Get the AppComplianceAutomation scoping configuration of the specific report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_Get.json                                                                         |
| [scopingConfigurationListSample.ts][scopingconfigurationlistsample]                                   | Returns a list format of the singleton scopingConfiguration for a specified report. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/ScopingConfiguration_List.json                                                                  |
| [snapshotDownloadSample.ts][snapshotdownloadsample]                                                   | Download compliance needs from snapshot, like: Compliance Report, Resource List. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Download_Snapshot_Download_Compliance_Detailed_Pdf_Report.json                            |
| [snapshotGetSample.ts][snapshotgetsample]                                                             | Get the AppComplianceAutomation snapshot and its properties. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_Get.json                                                                                                      |
| [snapshotListSample.ts][snapshotlistsample]                                                           | Get the AppComplianceAutomation snapshot list. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Snapshot_List.json                                                                                                                   |
| [webhookCreateOrUpdateSample.ts][webhookcreateorupdatesample]                                         | Create a new AppComplianceAutomation webhook or update an exiting AppComplianceAutomation webhook. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_CreateOrUpdate.json                                                      |
| [webhookDeleteSample.ts][webhookdeletesample]                                                         | Delete an AppComplianceAutomation webhook. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_Delete.json                                                                                                                      |
| [webhookGetSample.ts][webhookgetsample]                                                               | Get the AppComplianceAutomation webhook and its properties. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_Get.json                                                                                                        |
| [webhookListSample.ts][webhooklistsample]                                                             | Get the AppComplianceAutomation webhook list. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_List.json                                                                                                                     |
| [webhookUpdateSample.ts][webhookupdatesample]                                                         | Update an exiting AppComplianceAutomation webhook. x-ms-original-file: specification/appcomplianceautomation/resource-manager/Microsoft.AppComplianceAutomation/stable/2024-06-27/examples/Webhook_Update.json                                                                                                              |

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
node dist/evidenceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/evidenceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[evidencecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/evidenceCreateOrUpdateSample.ts
[evidencedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/evidenceDeleteSample.ts
[evidencedownloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/evidenceDownloadSample.ts
[evidencegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/evidenceGetSample.ts
[evidencelistbyreportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/evidenceListByReportSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/operationsListSample.ts
[provideractionschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/providerActionsCheckNameAvailabilitySample.ts
[provideractionsgetcollectioncountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/providerActionsGetCollectionCountSample.ts
[provideractionsgetoverviewstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/providerActionsGetOverviewStatusSample.ts
[provideractionslistinusestorageaccountssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/providerActionsListInUseStorageAccountsSample.ts
[provideractionsonboardsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/providerActionsOnboardSample.ts
[provideractionstriggerevaluationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/providerActionsTriggerEvaluationSample.ts
[reportcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportCreateOrUpdateSample.ts
[reportdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportDeleteSample.ts
[reportfixsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportFixSample.ts
[reportgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportGetSample.ts
[reportgetscopingquestionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportGetScopingQuestionsSample.ts
[reportlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportListSample.ts
[reportnestedresourcechecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportNestedResourceCheckNameAvailabilitySample.ts
[reportsynccertrecordsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportSyncCertRecordSample.ts
[reportupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportUpdateSample.ts
[reportverifysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/reportVerifySample.ts
[scopingconfigurationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/scopingConfigurationCreateOrUpdateSample.ts
[scopingconfigurationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/scopingConfigurationDeleteSample.ts
[scopingconfigurationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/scopingConfigurationGetSample.ts
[scopingconfigurationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/scopingConfigurationListSample.ts
[snapshotdownloadsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/snapshotDownloadSample.ts
[snapshotgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/snapshotGetSample.ts
[snapshotlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/snapshotListSample.ts
[webhookcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/webhookCreateOrUpdateSample.ts
[webhookdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/webhookDeleteSample.ts
[webhookgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/webhookGetSample.ts
[webhooklistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/webhookListSample.ts
[webhookupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/samples/v1/typescript/src/webhookUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-appcomplianceautomation?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appcomplianceautomation/arm-appcomplianceautomation/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
