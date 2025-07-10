# @azure/arm-sqlvirtualmachine client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-sqlvirtualmachine in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [availabilityGroupListenersCreateOrUpdateSample.ts][availabilitygrouplistenerscreateorupdatesample]     | creates or updates an availability group listener. x-ms-original-file: 2023-10-01/CreateOrUpdateAvailabilityGroupListener.json                                      |
| [availabilityGroupListenersDeleteSample.ts][availabilitygrouplistenersdeletesample]                     | deletes an availability group listener. x-ms-original-file: 2023-10-01/DeleteAvailabilityGroupListener.json                                                         |
| [availabilityGroupListenersGetSample.ts][availabilitygrouplistenersgetsample]                           | gets an availability group listener. x-ms-original-file: 2023-10-01/GetAvailabilityGroupListener.json                                                               |
| [availabilityGroupListenersListByGroupSample.ts][availabilitygrouplistenerslistbygroupsample]           | lists all availability group listeners in a SQL virtual machine group. x-ms-original-file: 2023-10-01/ListByGroupAvailabilityGroupListener.json                     |
| [operationsListSample.ts][operationslistsample]                                                         | lists all of the available SQL Virtual Machine Rest API operations. x-ms-original-file: 2023-10-01/ListOperation.json                                               |
| [sqlVirtualMachineGroupsCreateOrUpdateSample.ts][sqlvirtualmachinegroupscreateorupdatesample]           | creates or updates a SQL virtual machine group. x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineGroup.json                                            |
| [sqlVirtualMachineGroupsDeleteSample.ts][sqlvirtualmachinegroupsdeletesample]                           | deletes a SQL virtual machine group. x-ms-original-file: 2023-10-01/DeleteSqlVirtualMachineGroup.json                                                               |
| [sqlVirtualMachineGroupsGetSample.ts][sqlvirtualmachinegroupsgetsample]                                 | gets a SQL virtual machine group. x-ms-original-file: 2023-10-01/GetSqlVirtualMachineGroup.json                                                                     |
| [sqlVirtualMachineGroupsListByResourceGroupSample.ts][sqlvirtualmachinegroupslistbyresourcegroupsample] | gets all SQL virtual machine groups in a resource group. x-ms-original-file: 2023-10-01/ListByResourceGroupSqlVirtualMachineGroup.json                              |
| [sqlVirtualMachineGroupsListSample.ts][sqlvirtualmachinegroupslistsample]                               | gets all SQL virtual machine groups in a subscription. x-ms-original-file: 2023-10-01/ListSubscriptionSqlVirtualMachineGroup.json                                   |
| [sqlVirtualMachineGroupsUpdateSample.ts][sqlvirtualmachinegroupsupdatesample]                           | updates SQL virtual machine group tags. x-ms-original-file: 2023-10-01/UpdateSqlVirtualMachineGroup.json                                                            |
| [sqlVirtualMachineTroubleshootTroubleshootSample.ts][sqlvirtualmachinetroubleshoottroubleshootsample]   | starts SQL virtual machine troubleshooting. x-ms-original-file: 2023-10-01/TroubleshootSqlVirtualMachine.json                                                       |
| [sqlVirtualMachinesCreateOrUpdateSample.ts][sqlvirtualmachinescreateorupdatesample]                     | creates or updates a SQL virtual machine. x-ms-original-file: 2023-10-01/CreateOrUpdateSqlVirtualMachineAutomatedBackupWeekly.json                                  |
| [sqlVirtualMachinesDeleteSample.ts][sqlvirtualmachinesdeletesample]                                     | deletes a SQL virtual machine. x-ms-original-file: 2023-10-01/DeleteSqlVirtualMachine.json                                                                          |
| [sqlVirtualMachinesFetchDCAssessmentSample.ts][sqlvirtualmachinesfetchdcassessmentsample]               | starts SQL best practices Assessment with Disk Config rules on SQL virtual machine x-ms-original-file: 2023-10-01/StartDiskConfigAssessmentOnSqlVirtualMachine.json |
| [sqlVirtualMachinesGetSample.ts][sqlvirtualmachinesgetsample]                                           | gets a SQL virtual machine. x-ms-original-file: 2023-10-01/GetSqlVirtualMachine.json                                                                                |
| [sqlVirtualMachinesListByResourceGroupSample.ts][sqlvirtualmachineslistbyresourcegroupsample]           | gets all SQL virtual machines in a resource group. x-ms-original-file: 2023-10-01/ListByResourceGroupSqlVirtualMachine.json                                         |
| [sqlVirtualMachinesListBySqlVmGroupSample.ts][sqlvirtualmachineslistbysqlvmgroupsample]                 | gets the list of sql virtual machines in a SQL virtual machine group. x-ms-original-file: 2023-10-01/ListBySqlVirtualMachineGroupSqlVirtualMachine.json             |
| [sqlVirtualMachinesListSample.ts][sqlvirtualmachineslistsample]                                         | gets all SQL virtual machines in a subscription. x-ms-original-file: 2023-10-01/ListSubscriptionSqlVirtualMachine.json                                              |
| [sqlVirtualMachinesRedeploySample.ts][sqlvirtualmachinesredeploysample]                                 | uninstalls and reinstalls the SQL IaaS Extension. x-ms-original-file: 2023-10-01/RedeploySqlVirtualMachine.json                                                     |
| [sqlVirtualMachinesStartAssessmentSample.ts][sqlvirtualmachinesstartassessmentsample]                   | starts SQL best practices Assessment on SQL virtual machine. x-ms-original-file: 2023-10-01/StartAssessmentOnSqlVirtualMachine.json                                 |
| [sqlVirtualMachinesUpdateSample.ts][sqlvirtualmachinesupdatesample]                                     | updates SQL virtual machine tags. x-ms-original-file: 2023-10-01/UpdateSqlVirtualMachine.json                                                                       |

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
node dist/availabilityGroupListenersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/availabilityGroupListenersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[availabilitygrouplistenerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/availabilityGroupListenersCreateOrUpdateSample.ts
[availabilitygrouplistenersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/availabilityGroupListenersDeleteSample.ts
[availabilitygrouplistenersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/availabilityGroupListenersGetSample.ts
[availabilitygrouplistenerslistbygroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/availabilityGroupListenersListByGroupSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/operationsListSample.ts
[sqlvirtualmachinegroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineGroupsCreateOrUpdateSample.ts
[sqlvirtualmachinegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineGroupsDeleteSample.ts
[sqlvirtualmachinegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineGroupsGetSample.ts
[sqlvirtualmachinegroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineGroupsListByResourceGroupSample.ts
[sqlvirtualmachinegroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineGroupsListSample.ts
[sqlvirtualmachinegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineGroupsUpdateSample.ts
[sqlvirtualmachinetroubleshoottroubleshootsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachineTroubleshootTroubleshootSample.ts
[sqlvirtualmachinescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesCreateOrUpdateSample.ts
[sqlvirtualmachinesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesDeleteSample.ts
[sqlvirtualmachinesfetchdcassessmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesFetchDCAssessmentSample.ts
[sqlvirtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesGetSample.ts
[sqlvirtualmachineslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesListByResourceGroupSample.ts
[sqlvirtualmachineslistbysqlvmgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesListBySqlVmGroupSample.ts
[sqlvirtualmachineslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesListSample.ts
[sqlvirtualmachinesredeploysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesRedeploySample.ts
[sqlvirtualmachinesstartassessmentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesStartAssessmentSample.ts
[sqlvirtualmachinesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/samples/v5/typescript/src/sqlVirtualMachinesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-sqlvirtualmachine?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/sqlvirtualmachine/arm-sqlvirtualmachine/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
