# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.ts][checknameavailabilitysample]                 | To check whether a resource name is available. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/CheckNameAvailability.json                          |
| [ledgerBackupSample.ts][ledgerbackupsample]                                   | Backs up a Confidential Ledger Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Backup.json                            |
| [ledgerCreateSample.ts][ledgercreatesample]                                   | Creates a Confidential Ledger with the specified ledger parameters. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Create.json |
| [ledgerDeleteSample.ts][ledgerdeletesample]                                   | Deletes an existing Confidential Ledger. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Delete.json                            |
| [ledgerGetSample.ts][ledgergetsample]                                         | Retrieves the properties of a Confidential Ledger. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Get.json                     |
| [ledgerListByResourceGroupSample.ts][ledgerlistbyresourcegroupsample]         | Retrieves the properties of all Confidential Ledgers. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_List.json                 |
| [ledgerListBySubscriptionSample.ts][ledgerlistbysubscriptionsample]           | Retrieves the properties of all Confidential Ledgers. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_ListBySub.json            |
| [ledgerRestoreSample.ts][ledgerrestoresample]                                 | Restores a Confidential Ledger Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Restore.json                           |
| [ledgerUpdateSample.ts][ledgerupdatesample]                                   | Updates properties of Confidential Ledger x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ConfidentialLedger_Update.json                           |
| [managedCcfBackupSample.ts][managedccfbackupsample]                           | Backs up a Managed CCF Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Backup.json                                            |
| [managedCcfCreateSample.ts][managedccfcreatesample]                           | Creates a Managed CCF with the specified Managed CCF parameters. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Create.json            |
| [managedCcfDeleteSample.ts][managedccfdeletesample]                           | Deletes an existing Managed CCF. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Delete.json                                            |
| [managedCcfGetSample.ts][managedccfgetsample]                                 | Retrieves the properties of a Managed CCF app. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Get.json                                 |
| [managedCcfListByResourceGroupSample.ts][managedccflistbyresourcegroupsample] | Retrieves the properties of all Managed CCF apps. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_List.json                             |
| [managedCcfListBySubscriptionSample.ts][managedccflistbysubscriptionsample]   | Retrieves the properties of all Managed CCF. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_ListBySub.json                             |
| [managedCcfRestoreSample.ts][managedccfrestoresample]                         | Restores a Managed CCF Resource. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Restore.json                                           |
| [managedCcfUpdateSample.ts][managedccfupdatesample]                           | Updates properties of Managed CCF x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/ManagedCCF_Update.json                                           |
| [operationsListSample.ts][operationslistsample]                               | Retrieves a list of available API operations x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/preview/2024-09-19-preview/examples/Operations_Get.json                                   |

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
node dist/checkNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env CONFIDENTIALLEDGER_SUBSCRIPTION_ID="<confidentialledger subscription id>" node dist/checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/checkNameAvailabilitySample.ts
[ledgerbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerBackupSample.ts
[ledgercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerCreateSample.ts
[ledgerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerDeleteSample.ts
[ledgergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerGetSample.ts
[ledgerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerListByResourceGroupSample.ts
[ledgerlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerListBySubscriptionSample.ts
[ledgerrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerRestoreSample.ts
[ledgerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/ledgerUpdateSample.ts
[managedccfbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfBackupSample.ts
[managedccfcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfCreateSample.ts
[managedccfdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfDeleteSample.ts
[managedccfgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfGetSample.ts
[managedccflistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfListByResourceGroupSample.ts
[managedccflistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfListBySubscriptionSample.ts
[managedccfrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfRestoreSample.ts
[managedccfupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/managedCcfUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-confidentialledger?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confidentialledger/arm-confidentialledger/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
