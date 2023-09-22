# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [firmwareCreateSample.js][firmwarecreatesample]                                                       | The operation to create a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Create_MaximumSet_Gen.json                                                                                                                   |
| [firmwareDeleteSample.js][firmwaredeletesample]                                                       | The operation to delete a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Delete_MaximumSet_Gen.json                                                                                                                   |
| [firmwareGenerateBinaryHardeningDetailsSample.js][firmwaregeneratebinaryhardeningdetailssample]       | The operation to get binary hardening details for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateBinaryHardeningDetails_MaximumSet_Gen.json                                                                 |
| [firmwareGenerateBinaryHardeningSummarySample.js][firmwaregeneratebinaryhardeningsummarysample]       | The operation to list the binary hardening summary percentages for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateBinaryHardeningSummary_MaximumSet_Gen.json                                                |
| [firmwareGenerateComponentDetailsSample.js][firmwaregeneratecomponentdetailssample]                   | The operation to get component details for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateComponentDetails_MaximumSet_Gen.json                                                                              |
| [firmwareGenerateCryptoCertificateSummarySample.js][firmwaregeneratecryptocertificatesummarysample]   | The operation to provide a high level summary of the discovered cryptographic certificates reported for the firmware image. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateCryptoCertificateSummary_MaximumSet_Gen.json |
| [firmwareGenerateCryptoKeySummarySample.js][firmwaregeneratecryptokeysummarysample]                   | The operation to provide a high level summary of the discovered cryptographic keys reported for the firmware image. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateCryptoKeySummary_MaximumSet_Gen.json                 |
| [firmwareGenerateCveSummarySample.js][firmwaregeneratecvesummarysample]                               | The operation to provide a high level summary of the CVEs reported for the firmware image. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateCveSummary_MaximumSet_Gen.json                                                |
| [firmwareGenerateDownloadUrlSample.js][firmwaregeneratedownloadurlsample]                             | The operation to a url for file download. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateDownloadUrl_MaximumSet_Gen.json                                                                                                |
| [firmwareGenerateFilesystemDownloadUrlSample.js][firmwaregeneratefilesystemdownloadurlsample]         | The operation to a url for tar file download. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateFilesystemDownloadUrl_MaximumSet_Gen.json                                                                                  |
| [firmwareGenerateSummarySample.js][firmwaregeneratesummarysample]                                     | The operation to get a scan summary. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_GenerateSummary_MaximumSet_Gen.json                                                                                                         |
| [firmwareGetSample.js][firmwaregetsample]                                                             | Get firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Get_MaximumSet_Gen.json                                                                                                                                            |
| [firmwareListByWorkspaceSample.js][firmwarelistbyworkspacesample]                                     | Lists all of firmwares inside a workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListByWorkspace_MaximumSet_Gen.json                                                                                                   |
| [firmwareListGenerateBinaryHardeningListSample.js][firmwarelistgeneratebinaryhardeninglistsample]     | The operation to list all binary hardening result for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateBinaryHardeningList_MaximumSet_Gen.json                                                            |
| [firmwareListGenerateComponentListSample.js][firmwarelistgeneratecomponentlistsample]                 | The operation to list all components result for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateComponentList_MaximumSet_Gen.json                                                                        |
| [firmwareListGenerateCryptoCertificateListSample.js][firmwarelistgeneratecryptocertificatelistsample] | The operation to list all crypto certificates for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateCryptoCertificateList_MaximumSet_Gen.json                                                              |
| [firmwareListGenerateCryptoKeyListSample.js][firmwarelistgeneratecryptokeylistsample]                 | The operation to list all crypto keys for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateCryptoKeyList_MaximumSet_Gen.json                                                                              |
| [firmwareListGenerateCveListSample.js][firmwarelistgeneratecvelistsample]                             | The operation to list all cve results for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGenerateCveList_MaximumSet_Gen.json                                                                                    |
| [firmwareListGeneratePasswordHashListSample.js][firmwarelistgeneratepasswordhashlistsample]           | The operation to list all password hashes for a firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_ListGeneratePasswordHashList_MaximumSet_Gen.json                                                                       |
| [firmwareUpdateSample.js][firmwareupdatesample]                                                       | The operation to update firmware. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Firmware_Update_MaximumSet_Gen.json                                                                                                                     |
| [operationsListSample.js][operationslistsample]                                                       | Lists the operations for this resource provider x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Operations_List_MaximumSet_Gen.json                                                                                                       |
| [workspacesCreateSample.js][workspacescreatesample]                                                   | The operation to create or update a firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Create_MaximumSet_Gen.json                                                                                    |
| [workspacesDeleteSample.js][workspacesdeletesample]                                                   | The operation to delete a firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Delete_MaximumSet_Gen.json                                                                                              |
| [workspacesGenerateUploadUrlSample.js][workspacesgenerateuploadurlsample]                             | The operation to get a url for file upload. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json                                                                                              |
| [workspacesGetSample.js][workspacesgetsample]                                                         | Get firmware analysis workspace. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Get_MaximumSet_Gen.json                                                                                                                       |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]                         | Lists all of the firmware analysis workspaces in the specified resource group. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                                                         |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]                           | Lists all of the firmware analysis workspaces in the specified subscription. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_ListBySubscription_MaximumSet_Gen.json                                                            |
| [workspacesUpdateSample.js][workspacesupdatesample]                                                   | The operation to update a firmware analysis workspaces. x-ms-original-file: specification/fist/resource-manager/Microsoft.IoTFirmwareDefense/preview/2023-02-08-preview/examples/Workspaces_Update_MaximumSet_Gen.json                                                                                             |

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
node firmwareCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID="<iotfirmwaredefense subscription id>" IOTFIRMWAREDEFENSE_RESOURCE_GROUP="<iotfirmwaredefense resource group>" IOTFIRMWAREDEFENSE_SUBSCRIPTION_ID="<iotfirmwaredefense subscription id>" IOTFIRMWAREDEFENSE_RESOURCE_GROUP="<iotfirmwaredefense resource group>" node firmwareCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[firmwarecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareCreateSample.js
[firmwaredeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareDeleteSample.js
[firmwaregeneratebinaryhardeningdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateBinaryHardeningDetailsSample.js
[firmwaregeneratebinaryhardeningsummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateBinaryHardeningSummarySample.js
[firmwaregeneratecomponentdetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateComponentDetailsSample.js
[firmwaregeneratecryptocertificatesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateCryptoCertificateSummarySample.js
[firmwaregeneratecryptokeysummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateCryptoKeySummarySample.js
[firmwaregeneratecvesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateCveSummarySample.js
[firmwaregeneratedownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateDownloadUrlSample.js
[firmwaregeneratefilesystemdownloadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateFilesystemDownloadUrlSample.js
[firmwaregeneratesummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGenerateSummarySample.js
[firmwaregetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareGetSample.js
[firmwarelistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListByWorkspaceSample.js
[firmwarelistgeneratebinaryhardeninglistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListGenerateBinaryHardeningListSample.js
[firmwarelistgeneratecomponentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListGenerateComponentListSample.js
[firmwarelistgeneratecryptocertificatelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListGenerateCryptoCertificateListSample.js
[firmwarelistgeneratecryptokeylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListGenerateCryptoKeyListSample.js
[firmwarelistgeneratecvelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListGenerateCveListSample.js
[firmwarelistgeneratepasswordhashlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareListGeneratePasswordHashListSample.js
[firmwareupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/firmwareUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/operationsListSample.js
[workspacescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesCreateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesDeleteSample.js
[workspacesgenerateuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesGenerateUploadUrlSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v1-beta/javascript/workspacesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-iotfirmwaredefense?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/README.md
