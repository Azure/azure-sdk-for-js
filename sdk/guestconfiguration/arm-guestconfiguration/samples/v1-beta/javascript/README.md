# @azure/arm-guestconfiguration client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-guestconfiguration in some common scenarios.

| **File Name**                                                                                                                                         | **Description**                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [guestConfigurationAssignmentReportsGetSample.js][guestconfigurationassignmentreportsgetsample]                                                       | get a report for the guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getGuestConfigurationAssignmentReportById.json                                           |
| [guestConfigurationAssignmentReportsListSample.js][guestconfigurationassignmentreportslistsample]                                                     | list all reports for the guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllGuestConfigurationAssignmentReports.json                              |
| [guestConfigurationAssignmentReportsVmssGetSample.js][guestconfigurationassignmentreportsvmssgetsample]                                               | get a report for the VMSS guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getVMSSGuestConfigurationAssignmentReportById.json                                  |
| [guestConfigurationAssignmentReportsVmssListSample.js][guestconfigurationassignmentreportsvmsslistsample]                                             | list all reports for the VMSS guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllVMSSGuestConfigurationAssignmentReports.json                     |
| [guestConfigurationAssignmentsCreateOrUpdateSample.js][guestconfigurationassignmentscreateorupdatesample]                                             | creates an association between a VM and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationAssignment.json                                                |
| [guestConfigurationAssignmentsDeleteSample.js][guestconfigurationassignmentsdeletesample]                                                             | delete a guest configuration assignment x-ms-original-file: 2024-04-05/deleteGuestConfigurationAssignment.json                                                                            |
| [guestConfigurationAssignmentsGetSample.js][guestconfigurationassignmentsgetsample]                                                                   | get information about a guest configuration assignment x-ms-original-file: 2024-04-05/getGuestConfigurationAssignment.json                                                                |
| [guestConfigurationAssignmentsListSample.js][guestconfigurationassignmentslistsample]                                                                 | list all guest configuration assignments for a virtual machine. x-ms-original-file: 2024-04-05/listGuestConfigurationAssignments.json                                                     |
| [guestConfigurationAssignmentsRGListSample.js][guestconfigurationassignmentsrglistsample]                                                             | list all guest configuration assignments for a resource group. x-ms-original-file: 2024-04-05/listRGGuestConfigurationAssignments.json                                                    |
| [guestConfigurationAssignmentsSubscriptionListSample.js][guestconfigurationassignmentssubscriptionlistsample]                                         | list all guest configuration assignments for a subscription. x-ms-original-file: 2024-04-05/listSubGuestConfigurationAssignments.json                                                     |
| [guestConfigurationAssignmentsVmssCreateOrUpdateSample.js][guestconfigurationassignmentsvmsscreateorupdatesample]                                     | creates an association between a VMSS and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationVMSSAssignment.json                                          |
| [guestConfigurationAssignmentsVmssDeleteSample.js][guestconfigurationassignmentsvmssdeletesample]                                                     | delete a guest configuration assignment for VMSS x-ms-original-file: 2024-04-05/deleteGuestConfigurationVMSSAssignment.json                                                               |
| [guestConfigurationAssignmentsVmssGetSample.js][guestconfigurationassignmentsvmssgetsample]                                                           | get information about a guest configuration assignment for VMSS x-ms-original-file: 2024-04-05/getVMSSGuestConfigurationAssignment.json                                                   |
| [guestConfigurationAssignmentsVmssListSample.js][guestconfigurationassignmentsvmsslistsample]                                                         | list all guest configuration assignments for VMSS. x-ms-original-file: 2024-04-05/listVMSSGuestConfigurationAssignments.json                                                              |
| [guestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateSample.js][guestconfigurationconnectedvmwarevsphereassignmentscreateorupdatesample] | creates an association between a Connected VM Sphere machine and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationConnectedVMwarevSphereAssignment.json |
| [guestConfigurationConnectedVMwarevSphereAssignmentsDeleteSample.js][guestconfigurationconnectedvmwarevsphereassignmentsdeletesample]                 | delete a guest configuration assignment x-ms-original-file: 2024-04-05/deleteGuestConfigurationConnectedVMwarevSphereAssignment.json                                                      |
| [guestConfigurationConnectedVMwarevSphereAssignmentsGetSample.js][guestconfigurationconnectedvmwarevsphereassignmentsgetsample]                       | get information about a guest configuration assignment x-ms-original-file: 2024-04-05/getGuestConfigurationConnectedVMwarevSphereAssignment.json                                          |
| [guestConfigurationConnectedVMwarevSphereAssignmentsListSample.js][guestconfigurationconnectedvmwarevsphereassignmentslistsample]                     | list all guest configuration assignments for an ARC machine. x-ms-original-file: 2024-04-05/listGuestConfigurationConnectedVMwarevSphereAssignments.json                                  |
| [guestConfigurationConnectedVMwarevSphereAssignmentsReportsGetSample.js][guestconfigurationconnectedvmwarevsphereassignmentsreportsgetsample]         | get a report for the guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getGuestConfigurationConnectedVMwarevSphereAssignmentReportById.json                     |
| [guestConfigurationConnectedVMwarevSphereAssignmentsReportsListSample.js][guestconfigurationconnectedvmwarevsphereassignmentsreportslistsample]       | list all reports for the guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllGuestConfigurationConnectedVMwarevSphereAssignmentsReports.json       |
| [guestConfigurationHcrpAssignmentReportsGetSample.js][guestconfigurationhcrpassignmentreportsgetsample]                                               | get a report for the guest configuration assignment, by reportId. x-ms-original-file: 2024-04-05/getGuestConfigurationHCRPAssignmentReportById.json                                       |
| [guestConfigurationHcrpAssignmentReportsListSample.js][guestconfigurationhcrpassignmentreportslistsample]                                             | list all reports for the guest configuration assignment, latest report first. x-ms-original-file: 2024-04-05/listAllGuestConfigurationHCRPAssignmentReports.json                          |
| [guestConfigurationHcrpAssignmentsCreateOrUpdateSample.js][guestconfigurationhcrpassignmentscreateorupdatesample]                                     | creates an association between a ARC machine and guest configuration x-ms-original-file: 2024-04-05/createOrUpdateGuestConfigurationHCRPAssignment.json                                   |
| [guestConfigurationHcrpAssignmentsDeleteSample.js][guestconfigurationhcrpassignmentsdeletesample]                                                     | delete a guest configuration assignment x-ms-original-file: 2024-04-05/deleteGuestConfigurationHCRPAssignment.json                                                                        |
| [guestConfigurationHcrpAssignmentsGetSample.js][guestconfigurationhcrpassignmentsgetsample]                                                           | get information about a guest configuration assignment x-ms-original-file: 2024-04-05/getGuestConfigurationHCRPAssignment.json                                                            |
| [guestConfigurationHcrpAssignmentsListSample.js][guestconfigurationhcrpassignmentslistsample]                                                         | list all guest configuration assignments for an ARC machine. x-ms-original-file: 2024-04-05/listGuestConfigurationHCRPAssignments.json                                                    |

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
node guestConfigurationAssignmentReportsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node guestConfigurationAssignmentReportsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[guestconfigurationassignmentreportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentReportsGetSample.js
[guestconfigurationassignmentreportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentReportsListSample.js
[guestconfigurationassignmentreportsvmssgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentReportsVmssGetSample.js
[guestconfigurationassignmentreportsvmsslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentReportsVmssListSample.js
[guestconfigurationassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsCreateOrUpdateSample.js
[guestconfigurationassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsDeleteSample.js
[guestconfigurationassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsGetSample.js
[guestconfigurationassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsListSample.js
[guestconfigurationassignmentsrglistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsRGListSample.js
[guestconfigurationassignmentssubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsSubscriptionListSample.js
[guestconfigurationassignmentsvmsscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsVmssCreateOrUpdateSample.js
[guestconfigurationassignmentsvmssdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsVmssDeleteSample.js
[guestconfigurationassignmentsvmssgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsVmssGetSample.js
[guestconfigurationassignmentsvmsslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationAssignmentsVmssListSample.js
[guestconfigurationconnectedvmwarevsphereassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateSample.js
[guestconfigurationconnectedvmwarevsphereassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationConnectedVMwarevSphereAssignmentsDeleteSample.js
[guestconfigurationconnectedvmwarevsphereassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationConnectedVMwarevSphereAssignmentsGetSample.js
[guestconfigurationconnectedvmwarevsphereassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationConnectedVMwarevSphereAssignmentsListSample.js
[guestconfigurationconnectedvmwarevsphereassignmentsreportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationConnectedVMwarevSphereAssignmentsReportsGetSample.js
[guestconfigurationconnectedvmwarevsphereassignmentsreportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationConnectedVMwarevSphereAssignmentsReportsListSample.js
[guestconfigurationhcrpassignmentreportsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationHcrpAssignmentReportsGetSample.js
[guestconfigurationhcrpassignmentreportslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationHcrpAssignmentReportsListSample.js
[guestconfigurationhcrpassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationHcrpAssignmentsCreateOrUpdateSample.js
[guestconfigurationhcrpassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationHcrpAssignmentsDeleteSample.js
[guestconfigurationhcrpassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationHcrpAssignmentsGetSample.js
[guestconfigurationhcrpassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/guestconfiguration/arm-guestconfiguration/samples/v1-beta/javascript/guestConfigurationHcrpAssignmentsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-guestconfiguration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/guestconfiguration/arm-guestconfiguration/README.md
