# @azure/arm-confidentialledger client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-confidentialledger in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                                                                   |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.js][checknameavailabilitysample]         | to check whether a resource name is available. x-ms-original-file: 2026-02-23/CheckNameAvailability.json                                                          |
| [ledgerCreateSample.js][ledgercreatesample]                           | creates a Confidential Ledger with the specified ledger parameters. x-ms-original-file: 2026-02-23/ConfidentialLedger_Create.json                                 |
| [ledgerDeleteSample.js][ledgerdeletesample]                           | deletes an existing Confidential Ledger. x-ms-original-file: 2026-02-23/ConfidentialLedger_Delete.json                                                            |
| [ledgerFilesExportSample.js][ledgerfilesexportsample]                 | copies the ledger files and the service certificate to a customer's storage account of choice. x-ms-original-file: 2026-02-23/ConfidentialLedger_FilesExport.json |
| [ledgerGetSample.js][ledgergetsample]                                 | retrieves the properties of a Confidential Ledger. x-ms-original-file: 2026-02-23/ConfidentialLedger_Get.json                                                     |
| [ledgerListByResourceGroupSample.js][ledgerlistbyresourcegroupsample] | retrieves the properties of all Confidential Ledgers. x-ms-original-file: 2026-02-23/ConfidentialLedger_List.json                                                 |
| [ledgerListBySubscriptionSample.js][ledgerlistbysubscriptionsample]   | retrieves the properties of all Confidential Ledgers. x-ms-original-file: 2026-02-23/ConfidentialLedger_ListBySub.json                                            |
| [ledgerUpdateSample.js][ledgerupdatesample]                           | updates properties of Confidential Ledger x-ms-original-file: 2026-02-23/ConfidentialLedger_Update.json                                                           |
| [operationsListSample.js][operationslistsample]                       | list the operations for the provider x-ms-original-file: 2026-02-23/Operations_Get.json                                                                           |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/checkNameAvailabilitySample.js
[ledgercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerCreateSample.js
[ledgerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerDeleteSample.js
[ledgerfilesexportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerFilesExportSample.js
[ledgergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerGetSample.js
[ledgerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerListByResourceGroupSample.js
[ledgerlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerListBySubscriptionSample.js
[ledgerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/ledgerUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v2-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-confidentialledger?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confidentialledger/arm-confidentialledger/README.md
