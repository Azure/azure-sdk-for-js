# @azure/arm-iotfirmwaredefense client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-iotfirmwaredefense in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                          |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [binaryHardeningListByFirmwareSample.ts][binaryhardeninglistbyfirmwaresample]       | lists binary hardening analysis results of a firmware. x-ms-original-file: 2025-08-02/BinaryHardening_ListByFirmware_MaximumSet_Gen.json                                                 |
| [cryptoCertificatesListByFirmwareSample.ts][cryptocertificateslistbyfirmwaresample] | lists crypto certificate analysis results of a firmware. x-ms-original-file: 2025-08-02/CryptoCertificates_ListByFirmware_MaximumSet_Gen.json                                            |
| [cryptoKeysListByFirmwareSample.ts][cryptokeyslistbyfirmwaresample]                 | lists crypto key analysis results of a firmware. x-ms-original-file: 2025-08-02/CryptoKeys_ListByFirmware_MaximumSet_Gen.json                                                            |
| [cvesListByFirmwareSample.ts][cveslistbyfirmwaresample]                             | lists CVE analysis results of a firmware. x-ms-original-file: 2025-08-02/Cves_ListByFirmware_MaximumSet_Gen.json                                                                         |
| [firmwaresCreateSample.ts][firmwarescreatesample]                                   | the operation to create a firmware. x-ms-original-file: 2025-08-02/Firmwares_Create_MaximumSet_Gen.json                                                                                  |
| [firmwaresDeleteSample.ts][firmwaresdeletesample]                                   | the operation to delete a firmware. x-ms-original-file: 2025-08-02/Firmwares_Delete_MaximumSet_Gen.json                                                                                  |
| [firmwaresGetSample.ts][firmwaresgetsample]                                         | get firmware. x-ms-original-file: 2025-08-02/Firmwares_Get_MaximumSet_Gen.json                                                                                                           |
| [firmwaresListByWorkspaceSample.ts][firmwareslistbyworkspacesample]                 | lists all of firmwares inside a workspace. x-ms-original-file: 2025-08-02/Firmwares_ListByWorkspace_MaximumSet_Gen.json                                                                  |
| [firmwaresUpdateSample.ts][firmwaresupdatesample]                                   | the operation to update firmware. x-ms-original-file: 2025-08-02/Firmwares_Update_MaximumSet_Gen.json                                                                                    |
| [operationsListSample.ts][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2025-08-02/Operations_List_MaximumSet_Gen.json                                                                                  |
| [passwordHashesListByFirmwareSample.ts][passwordhasheslistbyfirmwaresample]         | lists password hash analysis results of a firmware. x-ms-original-file: 2025-08-02/PasswordHashes_ListByFirmware_MaximumSet_Gen.json                                                     |
| [sbomComponentsListByFirmwareSample.ts][sbomcomponentslistbyfirmwaresample]         | lists sbom analysis results of a firmware. x-ms-original-file: 2025-08-02/SbomComponents_ListByFirmware_MaximumSet_Gen.json                                                              |
| [summariesGetSample.ts][summariesgetsample]                                         | get an analysis result summary of a firmware by name. x-ms-original-file: 2025-08-02/Summaries_Get_MaximumSet_Gen.json                                                                   |
| [summariesListByFirmwareSample.ts][summarieslistbyfirmwaresample]                   | lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name. x-ms-original-file: 2025-08-02/Summaries_ListByFirmware_MaximumSet_Gen.json |
| [usageMetricsGetSample.ts][usagemetricsgetsample]                                   | gets monthly usage information for a workspace. x-ms-original-file: 2025-08-02/UsageMetrics_Get_MaximumSet_Gen.json                                                                      |
| [usageMetricsListByWorkspaceSample.ts][usagemetricslistbyworkspacesample]           | lists monthly usage information for a workspace. x-ms-original-file: 2025-08-02/UsageMetrics_ListByWorkspace_MaximumSet_Gen.json                                                         |
| [workspacesCreateSample.ts][workspacescreatesample]                                 | the operation to create or update a firmware analysis workspace. x-ms-original-file: 2025-08-02/Workspaces_Create_MaximumSet_Gen.json                                                    |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                 | the operation to delete a firmware analysis workspace. x-ms-original-file: 2025-08-02/Workspaces_Delete_MaximumSet_Gen.json                                                              |
| [workspacesGenerateUploadUrlSample.ts][workspacesgenerateuploadurlsample]           | generate a URL for uploading a firmware image. x-ms-original-file: 2025-08-02/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json                                                           |
| [workspacesGetSample.ts][workspacesgetsample]                                       | get firmware analysis workspace. x-ms-original-file: 2025-08-02/Workspaces_Get_MaximumSet_Gen.json                                                                                       |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]       | lists all of the firmware analysis workspaces in the specified resource group. x-ms-original-file: 2025-08-02/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                         |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]         | lists all of the firmware analysis workspaces in the specified subscription. x-ms-original-file: 2025-08-02/Workspaces_ListBySubscription_MaximumSet_Gen.json                            |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                 | the operation to update a firmware analysis workspaces. x-ms-original-file: 2025-08-02/Workspaces_Update_MaximumSet_Gen.json                                                             |

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
node dist/binaryHardeningListByFirmwareSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/binaryHardeningListByFirmwareSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[binaryhardeninglistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/binaryHardeningListByFirmwareSample.ts
[cryptocertificateslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/cryptoCertificatesListByFirmwareSample.ts
[cryptokeyslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/cryptoKeysListByFirmwareSample.ts
[cveslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/cvesListByFirmwareSample.ts
[firmwarescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/firmwaresCreateSample.ts
[firmwaresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/firmwaresDeleteSample.ts
[firmwaresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/firmwaresGetSample.ts
[firmwareslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/firmwaresListByWorkspaceSample.ts
[firmwaresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/firmwaresUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/operationsListSample.ts
[passwordhasheslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/passwordHashesListByFirmwareSample.ts
[sbomcomponentslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/sbomComponentsListByFirmwareSample.ts
[summariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/summariesGetSample.ts
[summarieslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/summariesListByFirmwareSample.ts
[usagemetricsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/usageMetricsGetSample.ts
[usagemetricslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/usageMetricsListByWorkspaceSample.ts
[workspacescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesCreateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesDeleteSample.ts
[workspacesgenerateuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesGenerateUploadUrlSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-iotfirmwaredefense?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
