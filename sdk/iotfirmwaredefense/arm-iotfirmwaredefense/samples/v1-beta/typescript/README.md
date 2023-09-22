# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [firmwareCreateSample.ts][firmwarecreatesample]                                                       | The operation to create a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Create_MaximumSet_Gen.json                                                                                                                   |
| [firmwareDeleteSample.ts][firmwaredeletesample]                                                       | The operation to delete a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Delete_MaximumSet_Gen.json                                                                                                                   |
| [firmwareGenerateBinaryHardeningDetailsSample.ts][firmwaregeneratebinaryhardeningdetailssample]       | The operation to get binary hardening details for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateBinaryHardeningDetails_MaximumSet_Gen.json                                                                 |
| [firmwareGenerateBinaryHardeningSummarySample.ts][firmwaregeneratebinaryhardeningsummarysample]       | The operation to list the binary hardening summary percentages for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateBinaryHardeningSummary_MaximumSet_Gen.json                                                |
| [firmwareGenerateComponentDetailsSample.ts][firmwaregeneratecomponentdetailssample]                   | The operation to get component details for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateComponentDetails_MaximumSet_Gen.json                                                                              |
| [firmwareGenerateCryptoCertificateSummarySample.ts][firmwaregeneratecryptocertificatesummarysample]   | The operation to provide a high level summary of the discovered cryptographic certificates reported for the firmware image. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateCryptoCertificateSummary_MaximumSet_Gen.json |
| [firmwareGenerateCryptoKeySummarySample.ts][firmwaregeneratecryptokeysummarysample]                   | The operation to provide a high level summary of the discovered cryptographic keys reported for the firmware image. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateCryptoKeySummary_MaximumSet_Gen.json                 |
| [firmwareGenerateCveSummarySample.ts][firmwaregeneratecvesummarysample]                               | The operation to provide a high level summary of the CVEs reported for the firmware image. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateCveSummary_MaximumSet_Gen.json                                                |
| [firmwareGenerateDownloadUrlSample.ts][firmwaregeneratedownloadurlsample]                             | The operation to a url for file download. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateDownloadUrl_MaximumSet_Gen.json                                                                                                |
| [firmwareGenerateFilesystemDownloadUrlSample.ts][firmwaregeneratefilesystemdownloadurlsample]         | The operation to a url for tar file download. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateFilesystemDownloadUrl_MaximumSet_Gen.json                                                                                  |
| [firmwareGenerateSummarySample.ts][firmwaregeneratesummarysample]                                     | The operation to get a scan summary. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateSummary_MaximumSet_Gen.json                                                                                                         |
| [firmwareGetSample.ts][firmwaregetsample]                                                             | Get firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Get_MaximumSet_Gen.json                                                                                                                                            |
| [firmwareListByWorkspaceSample.ts][firmwarelistbyworkspacesample]                                     | Lists all of firmwares inside a workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListByWorkspace_MaximumSet_Gen.json                                                                                                   |
| [firmwareListGenerateBinaryHardeningListSample.ts][firmwarelistgeneratebinaryhardeninglistsample]     | The operation to list all binary hardening result for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateBinaryHardeningList_MaximumSet_Gen.json                                                            |
| [firmwareListGenerateComponentListSample.ts][firmwarelistgeneratecomponentlistsample]                 | The operation to list all components result for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateComponentList_MaximumSet_Gen.json                                                                        |
| [firmwareListGenerateCryptoCertificateListSample.ts][firmwarelistgeneratecryptocertificatelistsample] | The operation to list all crypto certificates for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateCryptoCertificateList_MaximumSet_Gen.json                                                              |
| [firmwareListGenerateCryptoKeyListSample.ts][firmwarelistgeneratecryptokeylistsample]                 | The operation to list all crypto keys for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateCryptoKeyList_MaximumSet_Gen.json                                                                              |
| [firmwareListGenerateCveListSample.ts][firmwarelistgeneratecvelistsample]                             | The operation to list all cve results for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateCveList_MaximumSet_Gen.json                                                                                    |
| [firmwareListGeneratePasswordHashListSample.ts][firmwarelistgeneratepasswordhashlistsample]           | The operation to list all password hashes for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGeneratePasswordHashList_MaximumSet_Gen.json                                                                       |
| [firmwareUpdateSample.ts][firmwareupdatesample]                                                       | The operation to update firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Update_MaximumSet_Gen.json                                                                                                                     |
| [operationsListSample.ts][operationslistsample]                                                       | Lists the operations for this resource provider x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Operations_List_MaximumSet_Gen.json                                                                                                       |
| [workspacesCreateSample.ts][workspacescreatesample]                                                   | The operation to create or update a firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Create_MaximumSet_Gen.json                                                                                    |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                   | The operation to delete a firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Delete_MaximumSet_Gen.json                                                                                              |
| [workspacesGenerateUploadUrlSample.ts][workspacesgenerateuploadurlsample]                             | The operation to get a url for file upload. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json                                                                                              |
| [workspacesGetSample.ts][workspacesgetsample]                                                         | Get firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Get_MaximumSet_Gen.json                                                                                                                       |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                         | Lists all of the firmware analysis workspaces in the specified resource group. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                                                         |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                           | Lists all of the firmware analysis workspaces in the specified subscription. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_ListBySubscription_MaximumSet_Gen.json                                                            |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                   | The operation to update a firmware analysis workspaces. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Update_MaximumSet_Gen.json                                                                                             |

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
node dist/firmwareCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID="<iotfirmwaredefense subscription id>" IOTFIRMWAREDEFENSE_RESOURCE_GROUP="<iotfirmwaredefense resource group>" IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID="<iotfirmwaredefense subscription id>" IOTFIRMWAREDEFENSE_RESOURCE_GROUP="<iotfirmwaredefense resource group>" node dist/firmwareCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[firmwarecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareCreateSample.ts
[firmwaredeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareDeleteSample.ts
[firmwaregeneratebinaryhardeningdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateBinaryHardeningDetailsSample.ts
[firmwaregeneratebinaryhardeningsummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateBinaryHardeningSummarySample.ts
[firmwaregeneratecomponentdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateComponentDetailsSample.ts
[firmwaregeneratecryptocertificatesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateCryptoCertificateSummarySample.ts
[firmwaregeneratecryptokeysummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateCryptoKeySummarySample.ts
[firmwaregeneratecvesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateCveSummarySample.ts
[firmwaregeneratedownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateDownloadUrlSample.ts
[firmwaregeneratefilesystemdownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateFilesystemDownloadUrlSample.ts
[firmwaregeneratesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGenerateSummarySample.ts
[firmwaregetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareGetSample.ts
[firmwarelistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListByWorkspaceSample.ts
[firmwarelistgeneratebinaryhardeninglistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListGenerateBinaryHardeningListSample.ts
[firmwarelistgeneratecomponentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListGenerateComponentListSample.ts
[firmwarelistgeneratecryptocertificatelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListGenerateCryptoCertificateListSample.ts
[firmwarelistgeneratecryptokeylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListGenerateCryptoKeyListSample.ts
[firmwarelistgeneratecvelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListGenerateCveListSample.ts
[firmwarelistgeneratepasswordhashlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareListGeneratePasswordHashListSample.ts
[firmwareupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/firmwareUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/operationsListSample.ts
[workspacescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesCreateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgenerateuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesGenerateUploadUrlSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-iotfirmwaredefense?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
