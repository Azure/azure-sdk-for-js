# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                 | **Description**                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [deleteLab.js][deletelab]                                     | Operation to delete a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/deleteLab.json                                                                                                                                                                              |
| [deleteLabPlan.js][deletelabplan]                             | Operation to delete a Lab Plan resource. Deleting a lab plan does not delete labs associated with a lab plan, nor does it delete shared images added to a gallery via the lab plan permission container. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/deleteLabPlan.json |
| [deleteSchedule.js][deleteschedule]                           | Operation to delete a schedule resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/deleteSchedule.json                                                                                                                                                               |
| [deleteUser.js][deleteuser]                                   | Operation to delete a user resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/deleteUser.json                                                                                                                                                                           |
| [getImage.js][getimage]                                       | Gets an image resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/getImage.json                                                                                                                                                                                         |
| [getLab.js][getlab]                                           | Returns the properties of a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/getLab.json                                                                                                                                                                           |
| [getLabPlan.js][getlabplan]                                   | Retrieves the properties of a Lab Plan. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/getLabPlan.json                                                                                                                                                                     |
| [getListSchedule.js][getlistschedule]                         | Returns a list of all schedules for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/listSchedule.json                                                                                                                                                               |
| [getOperationResult.js][getoperationresult]                   | Returns an azure operation result. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/OperationResults/getOperationResult.json                                                                                                                                                          |
| [getSchedule.js][getschedule]                                 | Returns the properties of a lab Schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/getSchedule.json                                                                                                                                                                 |
| [getUser.js][getuser]                                         | Returns the properties of a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/getUser.json                                                                                                                                                                             |
| [getVirtualMachine.js][getvirtualmachine]                     | Returns the properties for a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/getVirtualMachine.json                                                                                                                                             |
| [inviteUser.js][inviteuser]                                   | Operation to invite a user to a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/inviteUser.json                                                                                                                                                                           |
| [listImages.js][listimages]                                   | Gets all images from galleries attached to a lab plan. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/listImages.json                                                                                                                                                        |
| [listLabPlans.js][listlabplans]                               | Returns a list of all lab plans within a subscription x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/listLabPlans.json                                                                                                                                                     |
| [listLabs.js][listlabs]                                       | Returns a list of all labs for a subscription. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/listLabs.json                                                                                                                                                                    |
| [listOperations.js][listoperations]                           | Returns a list of all operations. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabServices/listOperations.json                                                                                                                                                                    |
| [listResourceGroupLabPlans.js][listresourcegrouplabplans]     | Returns a list of all lab plans for a subscription and resource group. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/listResourceGroupLabPlans.json                                                                                                                       |
| [listResourceGroupLabs.js][listresourcegrouplabs]             | Returns a list of all labs in a resource group. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/listResourceGroupLabs.json                                                                                                                                                      |
| [listSkus.js][listskus]                                       | Returns a list of all the Azure Lab Services resource SKUs. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Skus/listSkus.json                                                                                                                                                       |
| [listUsages.js][listusages]                                   | Returns list of usage per SKU family for the specified subscription in the specified region. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Usages/getUsages.json                                                                                                                   |
| [listUser.js][listuser]                                       | Returns a list of all users for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/listUser.json                                                                                                                                                                           |
| [listVirtualMachine.js][listvirtualmachine]                   | Returns a list of all virtual machines for a lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/listVirtualMachine.json                                                                                                                                            |
| [patchImage.js][patchimage]                                   | Updates an image resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/patchImage.json                                                                                                                                                                                    |
| [patchLab.js][patchlab]                                       | Operation to update a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/patchLab.json                                                                                                                                                                               |
| [patchLabPlan.js][patchlabplan]                               | Operation to update a Lab Plan resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/patchLabPlan.json                                                                                                                                                                  |
| [patchSchedule.js][patchschedule]                             | Operation to update a lab schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/patchSchedule.json                                                                                                                                                                     |
| [patchUser.js][patchuser]                                     | Operation to update a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/patchUser.json                                                                                                                                                                                 |
| [publishLab.js][publishlab]                                   | Publish or re-publish a lab. This will create or update all lab resources, such as virtual machines. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/publishLab.json                                                                                                            |
| [putImage.js][putimage]                                       | Updates an image resource via PUT. Creating new resources via PUT will not function. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Images/putImage.json                                                                                                                            |
| [putLab.js][putlab]                                           | Operation to create or update a lab resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/putLab.json                                                                                                                                                                       |
| [putLabPlan.js][putlabplan]                                   | Operation to create or update a Lab Plan resource. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/putLabPlan.json                                                                                                                                                          |
| [putSchedule.js][putschedule]                                 | Operation to create or update a lab schedule. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Schedules/putSchedule.json                                                                                                                                                             |
| [putUser.js][putuser]                                         | Operation to create or update a lab user. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Users/putUser.json                                                                                                                                                                         |
| [redeployVirtualMachine.js][redeployvirtualmachine]           | Action to redeploy a lab virtual machine to a different compute node. For troubleshooting connectivity. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/redeployVirtualMachine.json                                                                                  |
| [reimageVirtualMachine.js][reimagevirtualmachine]             | Re-image a lab virtual machine. The virtual machine will be deleted and recreated using the latest published snapshot of the reference environment of the lab. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/reimageVirtualMachine.json                            |
| [resetPasswordVirtualMachine.js][resetpasswordvirtualmachine] | Resets a lab virtual machine password. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/resetPasswordVirtualMachine.json                                                                                                                                              |
| [saveImageVirtualMachine.js][saveimagevirtualmachine]         | Saves an image from a lab VM to the attached shared image gallery. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/LabPlans/saveImageVirtualMachine.json                                                                                                                             |
| [startVirtualMachine.js][startvirtualmachine]                 | Action to start a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/startVirtualMachine.json                                                                                                                                                      |
| [stopVirtualMachine.js][stopvirtualmachine]                   | Action to stop a lab virtual machine. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/VirtualMachines/stopVirtualMachine.json                                                                                                                                                        |
| [syncLab.js][synclab]                                         | Action used to manually kick off an AAD group sync job. x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/preview/2021-11-15-preview/examples/Labs/syncLab.json                                                                                                                                                            |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node deleteLab.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node deleteLab.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[deletelab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/deleteLab.js
[deletelabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/deleteLabPlan.js
[deleteschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/deleteSchedule.js
[deleteuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/deleteUser.js
[getimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getImage.js
[getlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getLab.js
[getlabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getLabPlan.js
[getlistschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getListSchedule.js
[getoperationresult]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getOperationResult.js
[getschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getSchedule.js
[getuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getUser.js
[getvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/getVirtualMachine.js
[inviteuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/inviteUser.js
[listimages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listImages.js
[listlabplans]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listLabPlans.js
[listlabs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listLabs.js
[listoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listOperations.js
[listresourcegrouplabplans]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listResourceGroupLabPlans.js
[listresourcegrouplabs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listResourceGroupLabs.js
[listskus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listSkus.js
[listusages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listUsages.js
[listuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listUser.js
[listvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/listVirtualMachine.js
[patchimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/patchImage.js
[patchlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/patchLab.js
[patchlabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/patchLabPlan.js
[patchschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/patchSchedule.js
[patchuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/patchUser.js
[publishlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/publishLab.js
[putimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/putImage.js
[putlab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/putLab.js
[putlabplan]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/putLabPlan.js
[putschedule]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/putSchedule.js
[putuser]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/putUser.js
[redeployvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/redeployVirtualMachine.js
[reimagevirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/reimageVirtualMachine.js
[resetpasswordvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/resetPasswordVirtualMachine.js
[saveimagevirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/saveImageVirtualMachine.js
[startvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/startVirtualMachine.js
[stopvirtualmachine]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/stopVirtualMachine.js
[synclab]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/labservices/arm-labservices/samples/v3-beta/javascript/syncLab.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-labservices?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/labservices/arm-labservices/README.md
