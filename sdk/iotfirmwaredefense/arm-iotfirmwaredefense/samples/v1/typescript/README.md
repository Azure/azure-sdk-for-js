# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                   | **Description**                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [binaryHardeningListByFirmwareSample.ts][binaryhardeninglistbyfirmwaresample]                   | Lists binary hardening analysis results of a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/BinaryHardening_ListByFirmware_MaximumSet_Gen.json                                                 |
| [cryptoCertificatesListByFirmwareSample.ts][cryptocertificateslistbyfirmwaresample]             | Lists cryptographic certificate analysis results found in a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/CryptoCertificates_ListByFirmware_MaximumSet_Gen.json                               |
| [cryptoKeysListByFirmwareSample.ts][cryptokeyslistbyfirmwaresample]                             | Lists cryptographic key analysis results found in a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/CryptoKeys_ListByFirmware_MaximumSet_Gen.json                                               |
| [cvesListByFirmwareSample.ts][cveslistbyfirmwaresample]                                         | Lists CVE analysis results of a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Cves_ListByFirmware_MaximumSet_Gen.json                                                                         |
| [firmwaresCreateSample.ts][firmwarescreatesample]                                               | The operation to create a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_Create_MaximumSet_Gen.json                                                                                  |
| [firmwaresDeleteSample.ts][firmwaresdeletesample]                                               | The operation to delete a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_Delete_MaximumSet_Gen.json                                                                                  |
| [firmwaresGenerateDownloadUrlSample.ts][firmwaresgeneratedownloadurlsample]                     | The operation to a url for file download. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_GenerateDownloadUrl_MaximumSet_Gen.json                                                               |
| [firmwaresGenerateFilesystemDownloadUrlSample.ts][firmwaresgeneratefilesystemdownloadurlsample] | The operation to a url for tar file download. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_GenerateFilesystemDownloadUrl_MaximumSet_Gen.json                                                 |
| [firmwaresGetSample.ts][firmwaresgetsample]                                                     | Get firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_Get_MaximumSet_Gen.json                                                                                                           |
| [firmwaresListByWorkspaceSample.ts][firmwareslistbyworkspacesample]                             | Lists all of firmwares inside a workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_ListByWorkspace_MaximumSet_Gen.json                                                                  |
| [firmwaresUpdateSample.ts][firmwaresupdatesample]                                               | The operation to update firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Firmwares_Update_MaximumSet_Gen.json                                                                                    |
| [operationsListSample.ts][operationslistsample]                                                 | Lists the operations for this resource provider x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Operations_List_MaximumSet_Gen.json                                                                       |
| [passwordHashesListByFirmwareSample.ts][passwordhasheslistbyfirmwaresample]                     | Lists password hash analysis results of a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/PasswordHashes_ListByFirmware_MaximumSet_Gen.json                                                     |
| [sbomComponentsListByFirmwareSample.ts][sbomcomponentslistbyfirmwaresample]                     | Lists SBOM analysis results of a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/SbomComponents_ListByFirmware_MaximumSet_Gen.json                                                              |
| [summariesGetSample.ts][summariesgetsample]                                                     | Get an analysis result summary of a firmware by name. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Summaries_Get_MaximumSet_Gen.json                                                                   |
| [summariesListByFirmwareSample.ts][summarieslistbyfirmwaresample]                               | Lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Summaries_ListByFirmware_MaximumSet_Gen.json |
| [workspacesCreateSample.ts][workspacescreatesample]                                             | The operation to create or update a firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_Create_MaximumSet_Gen.json                                                    |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                             | The operation to delete a firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_Delete_MaximumSet_Gen.json                                                              |
| [workspacesGenerateUploadUrlSample.ts][workspacesgenerateuploadurlsample]                       | The operation to get a url for file upload. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json                                                              |
| [workspacesGetSample.ts][workspacesgetsample]                                                   | Get firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_Get_MaximumSet_Gen.json                                                                                       |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                   | Lists all of the firmware analysis workspaces in the specified resource group. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                         |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                     | Lists all of the firmware analysis workspaces in the specified subscription. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_ListBySubscription_MaximumSet_Gen.json                            |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                             | The operation to update a firmware analysis workspaces. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/stable/2024-01-10/examples/Workspaces_Update_MaximumSet_Gen.json                                                             |

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
npx cross-env IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID="<iotfirmwaredefense subscription id>" IOTFIRMWAREDEFENSE_RESOURCE_GROUP="<iotfirmwaredefense resource group>" node dist/binaryHardeningListByFirmwareSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[binaryhardeninglistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/binaryHardeningListByFirmwareSample.ts
[cryptocertificateslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/cryptoCertificatesListByFirmwareSample.ts
[cryptokeyslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/cryptoKeysListByFirmwareSample.ts
[cveslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/cvesListByFirmwareSample.ts
[firmwarescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresCreateSample.ts
[firmwaresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresDeleteSample.ts
[firmwaresgeneratedownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresGenerateDownloadUrlSample.ts
[firmwaresgeneratefilesystemdownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresGenerateFilesystemDownloadUrlSample.ts
[firmwaresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresGetSample.ts
[firmwareslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresListByWorkspaceSample.ts
[firmwaresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/firmwaresUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/operationsListSample.ts
[passwordhasheslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/passwordHashesListByFirmwareSample.ts
[sbomcomponentslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/sbomComponentsListByFirmwareSample.ts
[summariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/summariesGetSample.ts
[summarieslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/summariesListByFirmwareSample.ts
[workspacescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesCreateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesDeleteSample.ts
[workspacesgenerateuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesGenerateUploadUrlSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1/typescript/src/workspacesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-iotfirmwaredefense?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
