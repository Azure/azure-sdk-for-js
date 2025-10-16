# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.js][checknameavailabilitysample]                 | To check whether a resource name is available. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/CheckNameAvailability.json                          |
| [ledgerBackupSample.js][ledgerbackupsample]                                   | Backs up a Confidential Ledger Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Backup.json                            |
| [ledgerCreateSample.js][ledgercreatesample]                                   | Creates a Confidential Ledger with the specified ledger parameters. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Create.json |
| [ledgerDeleteSample.js][ledgerdeletesample]                                   | Deletes an existing Confidential Ledger. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Delete.json                            |
| [ledgerGetSample.js][ledgergetsample]                                         | Retrieves the properties of a Confidential Ledger. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Get.json                     |
| [ledgerListByResourceGroupSample.js][ledgerlistbyresourcegroupsample]         | Retrieves the properties of all Confidential Ledgers. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_List.json                 |
| [ledgerListBySubscriptionSample.js][ledgerlistbysubscriptionsample]           | Retrieves the properties of all Confidential Ledgers. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_ListBySub.json            |
| [ledgerRestoreSample.js][ledgerrestoresample]                                 | Restores a Confidential Ledger Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Restore.json                           |
| [ledgerUpdateSample.js][ledgerupdatesample]                                   | Updates properties of Confidential Ledger x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Update.json                           |
| [managedCcfBackupSample.js][managedccfbackupsample]                           | Backs up a Managed CCF Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Backup.json                                            |
| [managedCcfCreateSample.js][managedccfcreatesample]                           | Creates a Managed CCF with the specified Managed CCF parameters. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Create.json            |
| [managedCcfDeleteSample.js][managedccfdeletesample]                           | Deletes an existing Managed CCF. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Delete.json                                            |
| [managedCcfGetSample.js][managedccfgetsample]                                 | Retrieves the properties of a Managed CCF app. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Get.json                                 |
| [managedCcfListByResourceGroupSample.js][managedccflistbyresourcegroupsample] | Retrieves the properties of all Managed CCF apps. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_List.json                             |
| [managedCcfListBySubscriptionSample.js][managedccflistbysubscriptionsample]   | Retrieves the properties of all Managed CCF. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_ListBySub.json                             |
| [managedCcfRestoreSample.js][managedccfrestoresample]                         | Restores a Managed CCF Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Restore.json                                           |
| [managedCcfUpdateSample.js][managedccfupdatesample]                           | Updates properties of Managed CCF x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Update.json                                           |
| [operationsListSample.js][operationslistsample]                               | Retrieves a list of available API operations x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/Operations_Get.json                                   |

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
node checkNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env CONFIDENTIALLEDGER_SUBSCRIPTION_ID="<confidentialledger subscription id>" node checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/checkNameAvailabilitySample.js
[ledgerbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerBackupSample.js
[ledgercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerCreateSample.js
[ledgerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerDeleteSample.js
[ledgergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerGetSample.js
[ledgerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerListByResourceGroupSample.js
[ledgerlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerListBySubscriptionSample.js
[ledgerrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerRestoreSample.js
[ledgerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/ledgerUpdateSample.js
[managedccfbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfBackupSample.js
[managedccfcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfCreateSample.js
[managedccfdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfDeleteSample.js
[managedccfgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfGetSample.js
[managedccflistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfListByResourceGroupSample.js
[managedccflistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfListBySubscriptionSample.js
[managedccfrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfRestoreSample.js
[managedccfupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/managedCcfUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-confidentialledger?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confidentialledger/arm-confidentialledger/README.md
