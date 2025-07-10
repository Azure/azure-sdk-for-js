# @azure/arm-sqlvirtualmachine client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-sqlvirtualmachine in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availabilityGroupListenersCreateOrUpdateSample.js][availabilitygrouplistenerscreateorupdatesample]     | creates or updates an availability group listener. x-ms-original-file: 2023-10-01/CreateOrUpdateAvailabilityGroupListener.json                                      |
| [availabilityGroupListenersDeleteSample.js][availabilitygrouplistenersdeletesample]                     | deletes an availability group listener. x-ms-original-file: 2023-10-01/DeleteAvailabilityGroupListener.json                                                         |
| [availabilityGroupListenersGetSample.js][availabilitygrouplistenersgetsample]                           | gets an availability group listener. x-ms-original-file: 2023-10-01/GetAvailabilityGroupListener.json                                                               |
| [availabilityGroupListenersListByGroupSample.js][availabilitygrouplistenerslistbygroupsample]           | lists all availability group listeners in a SQL virtual machine group. x-ms-original-file: 2023-10-01/ListByGroupAvailabilityGroupListener.json                     |
| [operationsListSample.js][operationslistsample]                                                         | lists all of the available SQL Virtual Machine Rest API operations. x-ms-original-file: 2023-10-01/ListOperation.json                                               |
| [sqlVirtualMachineGroupsCreateOrUpdateSample.js][sqlvirtualmachinegroupscreateorupdatesample]           | creates or updates a SQL virtual machine group. x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineGroup.json                                            |
| [sqlVirtualMachineGroupsDeleteSample.js][sqlvirtualmachinegroupsdeletesample]                           | deletes a SQL virtual machine group. x-ms-original-file: 2023-10-01/DeleteSqlVirtualMachineGroup.json                                                               |
| [sqlVirtualMachineGroupsGetSample.js][sqlvirtualmachinegroupsgetsample]                                 | gets a SQL virtual machine group. x-ms-original-file: 2023-10-01/GetSqlVirtualMachineGroup.json                                                                     |
| [sqlVirtualMachineGroupsListByResourceGroupSample.js][sqlvirtualmachinegroupslistbyresourcegroupsample] | gets all SQL virtual machine groups in a resource group. x-ms-original-file: 2023-10-01/ListByResourceGroupSqlVirtualMachineGroup.json                              |
| [sqlVirtualMachineGroupsListSample.js][sqlvirtualmachinegroupslistsample]                               | gets all SQL virtual machine groups in a subscription. x-ms-original-file: 2023-10-01/ListSubscriptionSqlVirtualMachineGroup.json                                   |
| [sqlVirtualMachineGroupsUpdateSample.js][sqlvirtualmachinegroupsupdatesample]                           | updates SQL virtual machine group tags. x-ms-original-file: 2023-10-01/UpdateSqlVirtualMachineGroup.json                                                            |
| [sqlVirtualMachineTroubleshootTroubleshootSample.js][sqlvirtualmachinetroubleshoottroubleshootsample]   | starts SQL virtual machine troubleshooting. x-ms-original-file: 2023-10-01/TroubleshootSqlVirtualMachine.json                                                       |
| [sqlVirtualMachinesCreateOrUpdateSample.js][sqlvirtualmachinescreateorupdatesample]                     | creates or updates a SQL virtual machine. x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineAutomatedBackupWeekly.json                                  |
| [sqlVirtualMachinesDeleteSample.js][sqlvirtualmachinesdeletesample]                                     | deletes a SQL virtual machine. x-ms-original-file: 2023-10-01/DeleteSqlVirtualMachine.json                                                                          |
| [sqlVirtualMachinesFetchDCAssessmentSample.js][sqlvirtualmachinesfetchdcassessmentsample]               | starts SQL best practices Assessment with Disk Config rules on SQL virtual machine x-ms-original-file: 2023-10-01/StartDiskConfigAssessmentOnSqlVirtualMachine.json |
| [sqlVirtualMachinesGetSample.js][sqlvirtualmachinesgetsample]                                           | gets a SQL virtual machine. x-ms-original-file: 2023-10-01/GetSqlVirtualMachine.json                                                                                |
| [sqlVirtualMachinesListByResourceGroupSample.js][sqlvirtualmachineslistbyresourcegroupsample]           | gets all SQL virtual machines in a resource group. x-ms-original-file: 2023-10-01/ListByResourceGroupSqlVirtualMachine.json                                         |
| [sqlVirtualMachinesListBySqlVmGroupSample.js][sqlvirtualmachineslistbysqlvmgroupsample]                 | gets the list of sql virtual machines in a SQL virtual machine group. x-ms-original-file: 2023-10-01/ListBySqlVirtualMachineGroupSqlVirtualMachine.json             |
| [sqlVirtualMachinesListSample.js][sqlvirtualmachineslistsample]                                         | gets all SQL virtual machines in a subscription. x-ms-original-file: 2023-10-01/ListSubscriptionSqlVirtualMachine.json                                              |
| [sqlVirtualMachinesRedeploySample.js][sqlvirtualmachinesredeploysample]                                 | uninstalls and reinstalls the SQL IaaS Extension. x-ms-original-file: 2023-10-01/RedeploySqlVirtualMachine.json                                                     |
| [sqlVirtualMachinesStartAssessmentSample.js][sqlvirtualmachinesstartassessmentsample]                   | starts SQL best practices Assessment on SQL virtual machine. x-ms-original-file: 2023-10-01/StartAssessmentOnSqlVirtualMachine.json                                 |
| [sqlVirtualMachinesUpdateSample.js][sqlvirtualmachinesupdatesample]                                     | updates SQL virtual machine tags. x-ms-original-file: 2023-10-01/UpdateSqlVirtualMachine.json                                                                       |

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
node availabilityGroupListenersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node availabilityGroupListenersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availabilitygrouplistenerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/availabilityGroupListenersCreateOrUpdateSample.js
[availabilitygrouplistenersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/availabilityGroupListenersDeleteSample.js
[availabilitygrouplistenersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/availabilityGroupListenersGetSample.js
[availabilitygrouplistenerslistbygroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/availabilityGroupListenersListByGroupSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/operationsListSample.js
[sqlvirtualmachinegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineGroupsCreateOrUpdateSample.js
[sqlvirtualmachinegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineGroupsDeleteSample.js
[sqlvirtualmachinegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineGroupsGetSample.js
[sqlvirtualmachinegroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineGroupsListByResourceGroupSample.js
[sqlvirtualmachinegroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineGroupsListSample.js
[sqlvirtualmachinegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineGroupsUpdateSample.js
[sqlvirtualmachinetroubleshoottroubleshootsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachineTroubleshootTroubleshootSample.js
[sqlvirtualmachinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesCreateOrUpdateSample.js
[sqlvirtualmachinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesDeleteSample.js
[sqlvirtualmachinesfetchdcassessmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesFetchDCAssessmentSample.js
[sqlvirtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesGetSample.js
[sqlvirtualmachineslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesListByResourceGroupSample.js
[sqlvirtualmachineslistbysqlvmgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesListBySqlVmGroupSample.js
[sqlvirtualmachineslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesListSample.js
[sqlvirtualmachinesredeploysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesRedeploySample.js
[sqlvirtualmachinesstartassessmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesStartAssessmentSample.js
[sqlvirtualmachinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/javascript/sqlVirtualMachinesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sqlvirtualmachine?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/README.md
