# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                         | **Description**                                                                                                                                                                                                                  |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.ts][checknameavailabilitysample]         | To check whether a resource name is available. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/CheckNameAvailability.json                          |
| [ledgerCreateSample.ts][ledgercreatesample]                           | Creates a Confidential Ledger with the specified ledger parameters. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/ConfidentialLedger_Create.json |
| [ledgerDeleteSample.ts][ledgerdeletesample]                           | Deletes an existing Confidential Ledger. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/ConfidentialLedger_Delete.json                            |
| [ledgerGetSample.ts][ledgergetsample]                                 | Retrieves the properties of a Confidential Ledger. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/ConfidentialLedger_Get.json                     |
| [ledgerListByResourceGroupSample.ts][ledgerlistbyresourcegroupsample] | Retrieves the properties of all Confidential Ledgers. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/ConfidentialLedger_List.json                 |
| [ledgerListBySubscriptionSample.ts][ledgerlistbysubscriptionsample]   | Retrieves the properties of all Confidential Ledgers. x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/ConfidentialLedger_ListBySub.json            |
| [ledgerUpdateSample.ts][ledgerupdatesample]                           | Updates properties of Confidential Ledger x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/ConfidentialLedger_Update.json                           |
| [operationsListSample.ts][operationslistsample]                       | Retrieves a list of available API operations x-ms-original-file: specification/confidentialledger/resource-manager/Microsoft.ConfidentialLedger/stable/2022-05-13/examples/Operations_Get.json                                   |

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
node dist/checkNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/checkNameAvailabilitySample.ts
[ledgercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/ledgerCreateSample.ts
[ledgerdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/ledgerDeleteSample.ts
[ledgergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/ledgerGetSample.ts
[ledgerlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/ledgerListByResourceGroupSample.ts
[ledgerlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/ledgerListBySubscriptionSample.ts
[ledgerupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/ledgerUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/confidentialledger/arm-confidentialledger/samples/v1/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-confidentialledger?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/confidentialledger/arm-confidentialledger/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
