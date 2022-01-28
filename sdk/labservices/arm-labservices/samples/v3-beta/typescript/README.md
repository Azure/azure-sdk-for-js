# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                 | **Description**                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deleteLab.ts][deletelab]                                     | Operation to delete a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/deleteLab.json                                                                                                                                                                              |
| [deleteLabPlan.ts][deletelabplan]                             | Operation to delete a Lab Plan resource. Deleting a lab plan does not delete labs associated with a lab plan, nor does it delete shared images added to a gallery via the lab plan permission container. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/deleteLabPlan.json |
| [deleteSchedule.ts][deleteschedule]                           | Operation to delete a schedule resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/deleteSchedule.json                                                                                                                                                               |
| [deleteUser.ts][deleteuser]                                   | Operation to delete a user resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/deleteUser.json                                                                                                                                                                           |
| [getImage.ts][getimage]                                       | Gets an image resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/getImage.json                                                                                                                                                                                         |
| [getLab.ts][getlab]                                           | Returns the properties of a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/getLab.json                                                                                                                                                                           |
| [getLabPlan.ts][getlabplan]                                   | Retrieves the properties of a Lab Plan. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/getLabPlan.json                                                                                                                                                                     |
| [getListSchedule.ts][getlistschedule]                         | Returns a list of all schedules for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/listSchedule.json                                                                                                                                                               |
| [getOperationResult.ts][getoperationresult]                   | Returns an azure operation result. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/OperationResults/getOperationResult.json                                                                                                                                                          |
| [getSchedule.ts][getschedule]                                 | Returns the properties of a lab Schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/getSchedule.json                                                                                                                                                                 |
| [getUser.ts][getuser]                                         | Returns the properties of a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/getUser.json                                                                                                                                                                             |
| [getVirtualMachine.ts][getvirtualmachine]                     | Returns the properties for a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/getVirtualMachine.json                                                                                                                                             |
| [inviteUser.ts][inviteuser]                                   | Operation to invite a user to a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/inviteUser.json                                                                                                                                                                           |
| [listImages.ts][listimages]                                   | Gets all images from galleries attached to a lab plan. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/listImages.json                                                                                                                                                        |
| [listLabPlans.ts][listlabplans]                               | Returns a list of all lab plans within a subscription x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/listLabPlans.json                                                                                                                                                     |
| [listLabs.ts][listlabs]                                       | Returns a list of all labs for a subscription. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/listLabs.json                                                                                                                                                                    |
| [listOperations.ts][listoperations]                           | Returns a list of all operations. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabServices/listOperations.json                                                                                                                                                                    |
| [listResourceGroupLabPlans.ts][listresourcegrouplabplans]     | Returns a list of all lab plans for a subscription and resource group. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/listResourceGroupLabPlans.json                                                                                                                       |
| [listResourceGroupLabs.ts][listresourcegrouplabs]             | Returns a list of all labs in a resource group. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/listResourceGroupLabs.json                                                                                                                                                      |
| [listSkus.ts][listskus]                                       | Returns a list of all the Azure Lab Services resource SKUs. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Skus/listSkus.json                                                                                                                                                       |
| [listUsages.ts][listusages]                                   | Returns list of usage per SKU family for the specified subscription in the specified region. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Usages/getUsages.json                                                                                                                   |
| [listUser.ts][listuser]                                       | Returns a list of all users for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/listUser.json                                                                                                                                                                           |
| [listVirtualMachine.ts][listvirtualmachine]                   | Returns a list of all virtual machines for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/listVirtualMachine.json                                                                                                                                            |
| [patchImage.ts][patchimage]                                   | Updates an image resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/patchImage.json                                                                                                                                                                                    |
| [patchLab.ts][patchlab]                                       | Operation to update a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/patchLab.json                                                                                                                                                                               |
| [patchLabPlan.ts][patchlabplan]                               | Operation to update a Lab Plan resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/patchLabPlan.json                                                                                                                                                                  |
| [patchSchedule.ts][patchschedule]                             | Operation to update a lab schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/patchSchedule.json                                                                                                                                                                     |
| [patchUser.ts][patchuser]                                     | Operation to update a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/patchUser.json                                                                                                                                                                                 |
| [publishLab.ts][publishlab]                                   | Publish or re-publish a lab. This will create or update all lab resources, such as virtual machines. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/publishLab.json                                                                                                            |
| [putImage.ts][putimage]                                       | Updates an image resource via PUT. Creating new resources via PUT will not function. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/putImage.json                                                                                                                            |
| [putLab.ts][putlab]                                           | Operation to create or update a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/putLab.json                                                                                                                                                                       |
| [putLabPlan.ts][putlabplan]                                   | Operation to create or update a Lab Plan resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/putLabPlan.json                                                                                                                                                          |
| [putSchedule.ts][putschedule]                                 | Operation to create or update a lab schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/putSchedule.json                                                                                                                                                             |
| [putUser.ts][putuser]                                         | Operation to create or update a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/putUser.json                                                                                                                                                                         |
| [redeployVirtualMachine.ts][redeployvirtualmachine]           | Action to redeploy a lab virtual machine to a different compute node. For troubleshooting connectivity. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/redeployVirtualMachine.json                                                                                  |
| [reimageVirtualMachine.ts][reimagevirtualmachine]             | Re-image a lab virtual machine. The virtual machine will be deleted and recreated using the latest published snapshot of the reference environment of the lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/reimageVirtualMachine.json                            |
| [resetPasswordVirtualMachine.ts][resetpasswordvirtualmachine] | Resets a lab virtual machine password. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/resetPasswordVirtualMachine.json                                                                                                                                              |
| [saveImageVirtualMachine.ts][saveimagevirtualmachine]         | Saves an image from a lab VM to the attached shared image gallery. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/saveImageVirtualMachine.json                                                                                                                             |
| [startVirtualMachine.ts][startvirtualmachine]                 | Action to start a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/startVirtualMachine.json                                                                                                                                                      |
| [stopVirtualMachine.ts][stopvirtualmachine]                   | Action to stop a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/stopVirtualMachine.json                                                                                                                                                        |
| [syncLab.ts][synclab]                                         | Action used to manually kick off an AAD group sync job. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/syncLab.json                                                                                                                                                            |

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
node dist/deleteLab.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/deleteLab.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletelab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/deleteLab.ts
[deletelabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/deleteLabPlan.ts
[deleteschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/deleteSchedule.ts
[deleteuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/deleteUser.ts
[getimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getImage.ts
[getlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getLab.ts
[getlabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getLabPlan.ts
[getlistschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getListSchedule.ts
[getoperationresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getOperationResult.ts
[getschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getSchedule.ts
[getuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getUser.ts
[getvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/getVirtualMachine.ts
[inviteuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/inviteUser.ts
[listimages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listImages.ts
[listlabplans]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listLabPlans.ts
[listlabs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listLabs.ts
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listOperations.ts
[listresourcegrouplabplans]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listResourceGroupLabPlans.ts
[listresourcegrouplabs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listResourceGroupLabs.ts
[listskus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listSkus.ts
[listusages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listUsages.ts
[listuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listUser.ts
[listvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/listVirtualMachine.ts
[patchimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/patchImage.ts
[patchlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/patchLab.ts
[patchlabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/patchLabPlan.ts
[patchschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/patchSchedule.ts
[patchuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/patchUser.ts
[publishlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/publishLab.ts
[putimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/putImage.ts
[putlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/putLab.ts
[putlabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/putLabPlan.ts
[putschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/putSchedule.ts
[putuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/putUser.ts
[redeployvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/redeployVirtualMachine.ts
[reimagevirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/reimageVirtualMachine.ts
[resetpasswordvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/resetPasswordVirtualMachine.ts
[saveimagevirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/saveImageVirtualMachine.ts
[startvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/startVirtualMachine.ts
[stopvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/stopVirtualMachine.ts
[synclab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/typescript/src/syncLab.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-labservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/labservices/arm-labservices/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
