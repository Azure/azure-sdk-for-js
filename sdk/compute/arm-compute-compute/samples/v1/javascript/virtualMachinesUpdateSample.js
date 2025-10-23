// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a virtual machine.
 *
 * @summary the operation to update a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Update_DetachDataDiskUsingToBeDetachedProperty.json
 */
async function updateAVMByDetachingDataDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.update("myResourceGroup", "myVM", {
    properties: {
      hardwareProfile: { vmSize: "Standard_D2_v2" },
      storageProfile: {
        imageReference: {
          sku: "2016-Datacenter",
          publisher: "MicrosoftWindowsServer",
          version: "latest",
          offer: "WindowsServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
        dataDisks: [
          {
            diskSizeGB: 1023,
            createOption: "Empty",
            lun: 0,
            toBeDetached: true,
          },
          {
            diskSizeGB: 1023,
            createOption: "Empty",
            lun: 1,
            toBeDetached: false,
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

/**
 * This sample demonstrates how to the operation to update a virtual machine.
 *
 * @summary the operation to update a virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Update_ForceDetachDataDisk.json
 */
async function updateAVMByForceDetachingDataDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.update("myResourceGroup", "myVM", {
    properties: {
      hardwareProfile: { vmSize: "Standard_D2_v2" },
      storageProfile: {
        imageReference: {
          sku: "2016-Datacenter",
          publisher: "MicrosoftWindowsServer",
          version: "latest",
          offer: "WindowsServer",
        },
        osDisk: {
          caching: "ReadWrite",
          managedDisk: { storageAccountType: "Standard_LRS" },
          name: "myVMosdisk",
          createOption: "FromImage",
        },
        dataDisks: [
          {
            diskSizeGB: 1023,
            createOption: "Empty",
            lun: 0,
            toBeDetached: true,
            detachOption: "ForceDetach",
          },
          {
            diskSizeGB: 1023,
            createOption: "Empty",
            lun: 1,
            toBeDetached: false,
          },
        ],
      },
      osProfile: {
        adminUsername: "{your-username}",
        computerName: "myVM",
        adminPassword: "{your-password}",
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Network/networkInterfaces/{existing-nic-name}",
            properties: { primary: true },
          },
        ],
      },
    },
  });
}

async function main() {
  await updateAVMByDetachingDataDisk();
  await updateAVMByForceDetachingDataDisk();
}

main().catch(console.error);
