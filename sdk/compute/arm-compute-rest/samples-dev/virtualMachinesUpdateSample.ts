// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachinesUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to update a virtual machine.
 *
 * @summary The operation to update a virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Update_DetachDataDiskUsingToBeDetachedProperty.json
 */
async function updateAVMByDetachingDataDisk() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesUpdateParameters = {
    body: {
      properties: {
        hardwareProfile: { vmSize: "Standard_D2_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true },
            },
          ],
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
        },
        storageProfile: {
          dataDisks: [
            {
              createOption: "Empty",
              diskSizeGB: 1023,
              lun: 0,
              toBeDetached: true,
            },
            {
              createOption: "Empty",
              diskSizeGB: 1023,
              lun: 1,
              toBeDetached: false,
            },
          ],
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest",
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" },
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName,
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateAVMByDetachingDataDisk().catch(console.error);
/**
 * This sample demonstrates how to The operation to update a virtual machine.
 *
 * @summary The operation to update a virtual machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachine_Update_ForceDetachDataDisk.json
 */
async function updateAVMByForceDetachingDataDisk() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmName = "myVM";
  const options: VirtualMachinesUpdateParameters = {
    body: {
      properties: {
        hardwareProfile: { vmSize: "Standard_D2_v2" },
        networkProfile: {
          networkInterfaces: [
            {
              id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
              properties: { primary: true },
            },
          ],
        },
        osProfile: {
          adminPassword: "{your-password}",
          adminUsername: "{your-username}",
          computerName: "myVM",
        },
        storageProfile: {
          dataDisks: [
            {
              createOption: "Empty",
              detachOption: "ForceDetach",
              diskSizeGB: 1023,
              lun: 0,
              toBeDetached: true,
            },
            {
              createOption: "Empty",
              diskSizeGB: 1023,
              lun: 1,
              toBeDetached: false,
            },
          ],
          imageReference: {
            offer: "WindowsServer",
            publisher: "MicrosoftWindowsServer",
            sku: "2016-Datacenter",
            version: "latest",
          },
          osDisk: {
            name: "myVMosdisk",
            caching: "ReadWrite",
            createOption: "FromImage",
            managedDisk: { storageAccountType: "Standard_LRS" },
          },
        },
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}",
      subscriptionId,
      resourceGroupName,
      vmName,
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

updateAVMByForceDetachingDataDisk().catch(console.error);
