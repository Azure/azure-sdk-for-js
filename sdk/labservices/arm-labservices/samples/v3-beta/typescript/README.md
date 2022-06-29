# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [imagesCreateOrUpdateSample.ts][imagescreateorupdatesample]                 | Updates an image resource via PUT. Creating new resources via PUT will not function. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/putImage.json                                                                                                                            |
| [imagesGetSample.ts][imagesgetsample]                                       | Gets an image resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/getImage.json                                                                                                                                                                                         |
| [imagesListByLabPlanSample.ts][imageslistbylabplansample]                   | Gets all images from galleries attached to a lab plan. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/listImages.json                                                                                                                                                        |
| [imagesUpdateSample.ts][imagesupdatesample]                                 | Updates an image resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/patchImage.json                                                                                                                                                                                    |
| [labPlansCreateOrUpdateSample.ts][labplanscreateorupdatesample]             | Operation to create or update a Lab Plan resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/putLabPlan.json                                                                                                                                                          |
| [labPlansDeleteSample.ts][labplansdeletesample]                             | Operation to delete a Lab Plan resource. Deleting a lab plan does not delete labs associated with a lab plan, nor does it delete shared images added to a gallery via the lab plan permission container. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/deleteLabPlan.json |
| [labPlansGetSample.ts][labplansgetsample]                                   | Retrieves the properties of a Lab Plan. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/getLabPlan.json                                                                                                                                                                     |
| [labPlansListByResourceGroupSample.ts][labplanslistbyresourcegroupsample]   | Returns a list of all lab plans for a subscription and resource group. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/listResourceGroupLabPlans.json                                                                                                                       |
| [labPlansListBySubscriptionSample.ts][labplanslistbysubscriptionsample]     | Returns a list of all lab plans within a subscription x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/listLabPlans.json                                                                                                                                                     |
| [labPlansSaveImageSample.ts][labplanssaveimagesample]                       | Saves an image from a lab VM to the attached shared image gallery. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/saveImageVirtualMachine.json                                                                                                                             |
| [labPlansUpdateSample.ts][labplansupdatesample]                             | Operation to update a Lab Plan resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/patchLabPlan.json                                                                                                                                                                  |
| [labsCreateOrUpdateSample.ts][labscreateorupdatesample]                     | Operation to create or update a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/putLab.json                                                                                                                                                                       |
| [labsDeleteSample.ts][labsdeletesample]                                     | Operation to delete a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/deleteLab.json                                                                                                                                                                              |
| [labsGetSample.ts][labsgetsample]                                           | Returns the properties of a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/getLab.json                                                                                                                                                                           |
| [labsListByResourceGroupSample.ts][labslistbyresourcegroupsample]           | Returns a list of all labs in a resource group. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/listResourceGroupLabs.json                                                                                                                                                      |
| [labsListBySubscriptionSample.ts][labslistbysubscriptionsample]             | Returns a list of all labs for a subscription. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/listLabs.json                                                                                                                                                                    |
| [labsPublishSample.ts][labspublishsample]                                   | Publish or re-publish a lab. This will create or update all lab resources, such as virtual machines. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/publishLab.json                                                                                                            |
| [labsSyncGroupSample.ts][labssyncgroupsample]                               | Action used to manually kick off an AAD group sync job. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/syncLab.json                                                                                                                                                            |
| [labsUpdateSample.ts][labsupdatesample]                                     | Operation to update a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/patchLab.json                                                                                                                                                                               |
| [operationResultsGetSample.ts][operationresultsgetsample]                   | Returns an azure operation result. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/OperationResults/getOperationResult.json                                                                                                                                                          |
| [operationsListSample.ts][operationslistsample]                             | Returns a list of all operations. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabServices/listOperations.json                                                                                                                                                                    |
| [schedulesCreateOrUpdateSample.ts][schedulescreateorupdatesample]           | Operation to create or update a lab schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/putSchedule.json                                                                                                                                                             |
| [schedulesDeleteSample.ts][schedulesdeletesample]                           | Operation to delete a schedule resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/deleteSchedule.json                                                                                                                                                               |
| [schedulesGetSample.ts][schedulesgetsample]                                 | Returns the properties of a lab Schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/getSchedule.json                                                                                                                                                                 |
| [schedulesListByLabSample.ts][scheduleslistbylabsample]                     | Returns a list of all schedules for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/listSchedule.json                                                                                                                                                               |
| [schedulesUpdateSample.ts][schedulesupdatesample]                           | Operation to update a lab schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/patchSchedule.json                                                                                                                                                                     |
| [skusListSample.ts][skuslistsample]                                         | Returns a list of all the Azure Lab Services resource SKUs. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Skus/listSkus.json                                                                                                                                                       |
| [usagesListByLocationSample.ts][usageslistbylocationsample]                 | Returns list of usage per SKU family for the specified subscription in the specified region. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Usages/getUsages.json                                                                                                                   |
| [usersCreateOrUpdateSample.ts][userscreateorupdatesample]                   | Operation to create or update a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/putUser.json                                                                                                                                                                         |
| [usersDeleteSample.ts][usersdeletesample]                                   | Operation to delete a user resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/deleteUser.json                                                                                                                                                                           |
| [usersGetSample.ts][usersgetsample]                                         | Returns the properties of a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/getUser.json                                                                                                                                                                             |
| [usersInviteSample.ts][usersinvitesample]                                   | Operation to invite a user to a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/inviteUser.json                                                                                                                                                                           |
| [usersListByLabSample.ts][userslistbylabsample]                             | Returns a list of all users for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/listUser.json                                                                                                                                                                           |
| [usersUpdateSample.ts][usersupdatesample]                                   | Operation to update a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/patchUser.json                                                                                                                                                                                 |
| [virtualMachinesGetSample.ts][virtualmachinesgetsample]                     | Returns the properties for a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/getVirtualMachine.json                                                                                                                                             |
| [virtualMachinesListByLabSample.ts][virtualmachineslistbylabsample]         | Returns a list of all virtual machines for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/listVirtualMachine.json                                                                                                                                            |
| [virtualMachinesRedeploySample.ts][virtualmachinesredeploysample]           | Action to redeploy a lab virtual machine to a different compute node. For troubleshooting connectivity. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/redeployVirtualMachine.json                                                                                  |
| [virtualMachinesReimageSample.ts][virtualmachinesreimagesample]             | Re-image a lab virtual machine. The virtual machine will be deleted and recreated using the latest published snapshot of the reference environment of the lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/reimageVirtualMachine.json                            |
| [virtualMachinesResetPasswordSample.ts][virtualmachinesresetpasswordsample] | Resets a lab virtual machine password. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/resetPasswordVirtualMachine.json                                                                                                                                              |
| [virtualMachinesStartSample.ts][virtualmachinesstartsample]                 | Action to start a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/startVirtualMachine.json                                                                                                                                                      |
| [virtualMachinesStopSample.ts][virtualmachinesstopsample]                   | Action to stop a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/stopVirtualMachine.json                                                                                                                                                        |

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
node dist/imagesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/imagesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[imagescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/imagesCreateOrUpdateSample.ts
[imagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/imagesGetSample.ts
[imageslistbylabplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/imagesListByLabPlanSample.ts
[imagesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/imagesUpdateSample.ts
[labplanscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansCreateOrUpdateSample.ts
[labplansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansDeleteSample.ts
[labplansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansGetSample.ts
[labplanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansListByResourceGroupSample.ts
[labplanslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansListBySubscriptionSample.ts
[labplanssaveimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansSaveImageSample.ts
[labplansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labPlansUpdateSample.ts
[labscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsCreateOrUpdateSample.ts
[labsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsDeleteSample.ts
[labsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsGetSample.ts
[labslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsListByResourceGroupSample.ts
[labslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsListBySubscriptionSample.ts
[labspublishsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsPublishSample.ts
[labssyncgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsSyncGroupSample.ts
[labsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/labsUpdateSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/operationsListSample.ts
[schedulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/schedulesCreateOrUpdateSample.ts
[schedulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/schedulesDeleteSample.ts
[schedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/schedulesGetSample.ts
[scheduleslistbylabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/schedulesListByLabSample.ts
[schedulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/schedulesUpdateSample.ts
[skuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/skusListSample.ts
[usageslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usagesListByLocationSample.ts
[userscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usersCreateOrUpdateSample.ts
[usersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usersDeleteSample.ts
[usersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usersGetSample.ts
[usersinvitesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usersInviteSample.ts
[userslistbylabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usersListByLabSample.ts
[usersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/usersUpdateSample.ts
[virtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesGetSample.ts
[virtualmachineslistbylabsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesListByLabSample.ts
[virtualmachinesredeploysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesRedeploySample.ts
[virtualmachinesreimagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesReimageSample.ts
[virtualmachinesresetpasswordsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesResetPasswordSample.ts
[virtualmachinesstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesStartSample.ts
[virtualmachinesstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/virtualMachinesStopSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-labservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/labservices/arm-labservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
