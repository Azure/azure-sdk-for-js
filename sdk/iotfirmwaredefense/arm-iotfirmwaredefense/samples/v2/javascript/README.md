# @azure/arm-iotfirmwaredefense client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-iotfirmwaredefense in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                          |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [binaryHardeningListByFirmwareSample.js][binaryhardeninglistbyfirmwaresample]       | lists binary hardening analysis results of a firmware. x-ms-original-file: 2025-08-02/BinaryHardening_ListByFirmware_MaximumSet_Gen.json                                                 |
| [cryptoCertificatesListByFirmwareSample.js][cryptocertificateslistbyfirmwaresample] | lists crypto certificate analysis results of a firmware. x-ms-original-file: 2025-08-02/CryptoCertificates_ListByFirmware_MaximumSet_Gen.json                                            |
| [cryptoKeysListByFirmwareSample.js][cryptokeyslistbyfirmwaresample]                 | lists crypto key analysis results of a firmware. x-ms-original-file: 2025-08-02/CryptoKeys_ListByFirmware_MaximumSet_Gen.json                                                            |
| [cvesListByFirmwareSample.js][cveslistbyfirmwaresample]                             | lists CVE analysis results of a firmware. x-ms-original-file: 2025-08-02/Cves_ListByFirmware_MaximumSet_Gen.json                                                                         |
| [firmwaresCreateSample.js][firmwarescreatesample]                                   | the operation to create a firmware. x-ms-original-file: 2025-08-02/Firmwares_Create_MaximumSet_Gen.json                                                                                  |
| [firmwaresDeleteSample.js][firmwaresdeletesample]                                   | the operation to delete a firmware. x-ms-original-file: 2025-08-02/Firmwares_Delete_MaximumSet_Gen.json                                                                                  |
| [firmwaresGetSample.js][firmwaresgetsample]                                         | get firmware. x-ms-original-file: 2025-08-02/Firmwares_Get_MaximumSet_Gen.json                                                                                                           |
| [firmwaresListByWorkspaceSample.js][firmwareslistbyworkspacesample]                 | lists all of firmwares inside a workspace. x-ms-original-file: 2025-08-02/Firmwares_ListByWorkspace_MaximumSet_Gen.json                                                                  |
| [firmwaresUpdateSample.js][firmwaresupdatesample]                                   | the operation to update firmware. x-ms-original-file: 2025-08-02/Firmwares_Update_MaximumSet_Gen.json                                                                                    |
| [operationsListSample.js][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2025-08-02/Operations_List_MaximumSet_Gen.json                                                                                  |
| [passwordHashesListByFirmwareSample.js][passwordhasheslistbyfirmwaresample]         | lists password hash analysis results of a firmware. x-ms-original-file: 2025-08-02/PasswordHashes_ListByFirmware_MaximumSet_Gen.json                                                     |
| [sbomComponentsListByFirmwareSample.js][sbomcomponentslistbyfirmwaresample]         | lists sbom analysis results of a firmware. x-ms-original-file: 2025-08-02/SbomComponents_ListByFirmware_MaximumSet_Gen.json                                                              |
| [summariesGetSample.js][summariesgetsample]                                         | get an analysis result summary of a firmware by name. x-ms-original-file: 2025-08-02/Summaries_Get_MaximumSet_Gen.json                                                                   |
| [summariesListByFirmwareSample.js][summarieslistbyfirmwaresample]                   | lists analysis result summary names of a firmware. To fetch the full summary data, get that summary by name. x-ms-original-file: 2025-08-02/Summaries_ListByFirmware_MaximumSet_Gen.json |
| [usageMetricsGetSample.js][usagemetricsgetsample]                                   | gets monthly usage information for a workspace. x-ms-original-file: 2025-08-02/UsageMetrics_Get_MaximumSet_Gen.json                                                                      |
| [usageMetricsListByWorkspaceSample.js][usagemetricslistbyworkspacesample]           | lists monthly usage information for a workspace. x-ms-original-file: 2025-08-02/UsageMetrics_ListByWorkspace_MaximumSet_Gen.json                                                         |
| [workspacesCreateSample.js][workspacescreatesample]                                 | the operation to create or update a firmware analysis workspace. x-ms-original-file: 2025-08-02/Workspaces_Create_MaximumSet_Gen.json                                                    |
| [workspacesDeleteSample.js][workspacesdeletesample]                                 | the operation to delete a firmware analysis workspace. x-ms-original-file: 2025-08-02/Workspaces_Delete_MaximumSet_Gen.json                                                              |
| [workspacesGenerateUploadUrlSample.js][workspacesgenerateuploadurlsample]           | generate a URL for uploading a firmware image. x-ms-original-file: 2025-08-02/Workspaces_GenerateUploadUrl_MaximumSet_Gen.json                                                           |
| [workspacesGetSample.js][workspacesgetsample]                                       | get firmware analysis workspace. x-ms-original-file: 2025-08-02/Workspaces_Get_MaximumSet_Gen.json                                                                                       |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]       | lists all of the firmware analysis workspaces in the specified resource group. x-ms-original-file: 2025-08-02/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                         |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]         | lists all of the firmware analysis workspaces in the specified subscription. x-ms-original-file: 2025-08-02/Workspaces_ListBySubscription_MaximumSet_Gen.json                            |
| [workspacesUpdateSample.js][workspacesupdatesample]                                 | the operation to update a firmware analysis workspaces. x-ms-original-file: 2025-08-02/Workspaces_Update_MaximumSet_Gen.json                                                             |

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
node binaryHardeningListByFirmwareSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node binaryHardeningListByFirmwareSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[binaryhardeninglistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/binaryHardeningListByFirmwareSample.js
[cryptocertificateslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/cryptoCertificatesListByFirmwareSample.js
[cryptokeyslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/cryptoKeysListByFirmwareSample.js
[cveslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/cvesListByFirmwareSample.js
[firmwarescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/firmwaresCreateSample.js
[firmwaresdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/firmwaresDeleteSample.js
[firmwaresgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/firmwaresGetSample.js
[firmwareslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/firmwaresListByWorkspaceSample.js
[firmwaresupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/firmwaresUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/operationsListSample.js
[passwordhasheslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/passwordHashesListByFirmwareSample.js
[sbomcomponentslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/sbomComponentsListByFirmwareSample.js
[summariesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/summariesGetSample.js
[summarieslistbyfirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/summariesListByFirmwareSample.js
[usagemetricsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/usageMetricsGetSample.js
[usagemetricslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/usageMetricsListByWorkspaceSample.js
[workspacescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesCreateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesDeleteSample.js
[workspacesgenerateuploadurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesGenerateUploadUrlSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/samples/v2/javascript/workspacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-iotfirmwaredefense?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/iotfirmwaredefense/arm-iotfirmwaredefense/README.md
