# @azure/arm-guestconfiguration client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-guestconfiguration in some common scenarios.

| **File Name**                                                                                                                                         | **Description**                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [guestConfigurationAssignmentReportsGetSample.ts][guestconfigurationassignmentreportsgetsample]                                                       | get a report for the guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getGuestConfigurationAssignmentReportById.json                                           |
| [guestConfigurationAssignmentReportsListSample.ts][guestconfigurationassignmentreportslistsample]                                                     | list all reports for the guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllGuestConfigurationAssignmentReports.json                              |
| [guestConfigurationAssignmentReportsVmssGetSample.ts][guestconfigurationassignmentreportsvmssgetsample]                                               | get a report for the VMSS guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getVMSSGuestConfigurationAssignmentReportById.json                                  |
| [guestConfigurationAssignmentReportsVmssListSample.ts][guestconfigurationassignmentreportsvmsslistsample]                                             | list all reports for the VMSS guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllVMSSGuestConfigurationAssignmentReports.json                     |
| [guestConfigurationAssignmentsCreateOrUpdateSample.ts][guestconfigurationassignmentscreateorupdatesample]                                             | creates an association between a VM and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationAssignment.json                                                |
| [guestConfigurationAssignmentsDeleteSample.ts][guestconfigurationassignmentsdeletesample]                                                             | delete a guest configuration assignment x-ms-original-file: 2024-04-05/deleteGuestConfigurationAssignment.json                                                                            |
| [guestConfigurationAssignmentsGetSample.ts][guestconfigurationassignmentsgetsample]                                                                   | get information about a guest configuration assignment x-ms-original-file: 2024-04-05/getGuestConfigurationAssignment.json                                                                |
| [guestConfigurationAssignmentsListSample.ts][guestconfigurationassignmentslistsample]                                                                 | list all guest configuration assignments for a virtual machine. x-ms-original-file: 2024-04-05/listGuestConfigurationAssignments.json                                                     |
| [guestConfigurationAssignmentsRGListSample.ts][guestconfigurationassignmentsrglistsample]                                                             | list all guest configuration assignments for a resource group. x-ms-original-file: 2024-04-05/listRGGuestConfigurationAssignments.json                                                    |
| [guestConfigurationAssignmentsSubscriptionListSample.ts][guestconfigurationassignmentssubscriptionlistsample]                                         | list all guest configuration assignments for a subscription. x-ms-original-file: 2024-04-05/listSubGuestConfigurationAssignments.json                                                     |
| [guestConfigurationAssignmentsVmssCreateOrUpdateSample.ts][guestconfigurationassignmentsvmsscreateorupdatesample]                                     | creates an association between a VMSS and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationVMSSAssignment.json                                          |
| [guestConfigurationAssignmentsVmssDeleteSample.ts][guestconfigurationassignmentsvmssdeletesample]                                                     | delete a guest configuration assignment for VMSS x-ms-original-file: 2024-04-05/deleteGuestConfigurationVMSSAssignment.json                                                               |
| [guestConfigurationAssignmentsVmssGetSample.ts][guestconfigurationassignmentsvmssgetsample]                                                           | get information about a guest configuration assignment for VMSS x-ms-original-file: 2024-04-05/getVMSSGuestConfigurationAssignment.json                                                   |
| [guestConfigurationAssignmentsVmssListSample.ts][guestconfigurationassignmentsvmsslistsample]                                                         | list all guest configuration assignments for VMSS. x-ms-original-file: 2024-04-05/listVMSSGuestConfigurationAssignments.json                                                              |
| [guestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateSample.ts][guestconfigurationconnectedvmwarevsphereassignmentscreateorupdatesample] | creates an association between a Connected VM Sphere machine and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationConnectedVMwarevSphereAssignment.json |
| [guestConfigurationConnectedVMwarevSphereAssignmentsDeleteSample.ts][guestconfigurationconnectedvmwarevsphereassignmentsdeletesample]                 | delete a guest configuration assignment x-ms-original-file: 2024-04-05/deleteGuestConfigurationConnectedVMwarevSphereAssignment.json                                                      |
| [guestConfigurationConnectedVMwarevSphereAssignmentsGetSample.ts][guestconfigurationconnectedvmwarevsphereassignmentsgetsample]                       | get information about a guest configuration assignment x-ms-original-file: 2024-04-05/getGuestConfigurationConnectedVMwarevSphereAssignment.json                                          |
| [guestConfigurationConnectedVMwarevSphereAssignmentsListSample.ts][guestconfigurationconnectedvmwarevsphereassignmentslistsample]                     | list all guest configuration assignments for an ARC machine. x-ms-original-file: 2024-04-05/listGuestConfigurationConnectedVMwarevSphereAssignments.json                                  |
| [guestConfigurationConnectedVMwarevSphereAssignmentsReportsGetSample.ts][guestconfigurationconnectedvmwarevsphereassignmentsreportsgetsample]         | get a report for the guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getGuestConfigurationConnectedVMwarevSphereAssignmentReportById.json                     |
| [guestConfigurationConnectedVMwarevSphereAssignmentsReportsListSample.ts][guestconfigurationconnectedvmwarevsphereassignmentsreportslistsample]       | list all reports for the guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllGuestConfigurationConnectedVMwarevSphereAssignmentsReports.json       |
| [guestConfigurationHcrpAssignmentReportsGetSample.ts][guestconfigurationhcrpassignmentreportsgetsample]                                               | get a report for the guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getGuestConfigurationHCRPAssignmentReportById.json                                       |
| [guestConfigurationHcrpAssignmentReportsListSample.ts][guestconfigurationhcrpassignmentreportslistsample]                                             | list all reports for the guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllGuestConfigurationHCRPAssignmentReports.json                          |
| [guestConfigurationHcrpAssignmentsCreateOrUpdateSample.ts][guestconfigurationhcrpassignmentscreateorupdatesample]                                     | creates an association between a ARC machine and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationHCRPAssignment.json                                   |
| [guestConfigurationHcrpAssignmentsDeleteSample.ts][guestconfigurationhcrpassignmentsdeletesample]                                                     | delete a guest configuration assignment x-ms-original-file: 2024-04-05/deleteGuestConfigurationHCRPAssignment.json                                                                        |
| [guestConfigurationHcrpAssignmentsGetSample.ts][guestconfigurationhcrpassignmentsgetsample]                                                           | get information about a guest configuration assignment x-ms-original-file: 2024-04-05/getGuestConfigurationHCRPAssignment.json                                                            |
| [guestConfigurationHcrpAssignmentsListSample.ts][guestconfigurationhcrpassignmentslistsample]                                                         | list all guest configuration assignments for an ARC machine. x-ms-original-file: 2024-04-05/listGuestConfigurationHCRPAssignments.json                                                    |

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
node dist/guestConfigurationAssignmentReportsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/guestConfigurationAssignmentReportsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[guestconfigurationassignmentreportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentReportsGetSample.ts
[guestconfigurationassignmentreportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentReportsListSample.ts
[guestconfigurationassignmentreportsvmssgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentReportsVmssGetSample.ts
[guestconfigurationassignmentreportsvmsslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentReportsVmssListSample.ts
[guestconfigurationassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsCreateOrUpdateSample.ts
[guestconfigurationassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsDeleteSample.ts
[guestconfigurationassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsGetSample.ts
[guestconfigurationassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsListSample.ts
[guestconfigurationassignmentsrglistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsRGListSample.ts
[guestconfigurationassignmentssubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsSubscriptionListSample.ts
[guestconfigurationassignmentsvmsscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsVmssCreateOrUpdateSample.ts
[guestconfigurationassignmentsvmssdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsVmssDeleteSample.ts
[guestconfigurationassignmentsvmssgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsVmssGetSample.ts
[guestconfigurationassignmentsvmsslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationAssignmentsVmssListSample.ts
[guestconfigurationconnectedvmwarevsphereassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateSample.ts
[guestconfigurationconnectedvmwarevsphereassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationConnectedVMwarevSphereAssignmentsDeleteSample.ts
[guestconfigurationconnectedvmwarevsphereassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationConnectedVMwarevSphereAssignmentsGetSample.ts
[guestconfigurationconnectedvmwarevsphereassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationConnectedVMwarevSphereAssignmentsListSample.ts
[guestconfigurationconnectedvmwarevsphereassignmentsreportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationConnectedVMwarevSphereAssignmentsReportsGetSample.ts
[guestconfigurationconnectedvmwarevsphereassignmentsreportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationConnectedVMwarevSphereAssignmentsReportsListSample.ts
[guestconfigurationhcrpassignmentreportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationHcrpAssignmentReportsGetSample.ts
[guestconfigurationhcrpassignmentreportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationHcrpAssignmentReportsListSample.ts
[guestconfigurationhcrpassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationHcrpAssignmentsCreateOrUpdateSample.ts
[guestconfigurationhcrpassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationHcrpAssignmentsDeleteSample.ts
[guestconfigurationhcrpassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationHcrpAssignmentsGetSample.ts
[guestconfigurationhcrpassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/typescript/src/guestConfigurationHcrpAssignmentsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-guestconfiguration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/guestconfiguration/arm-guestconfiguration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
