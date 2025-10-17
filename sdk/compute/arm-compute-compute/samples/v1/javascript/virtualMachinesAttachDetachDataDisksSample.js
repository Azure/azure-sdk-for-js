// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to attach and detach data disks to/from the virtual machine.
 *
 * @summary attach and detach data disks to/from the virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_AttachDetachDataDisks_MaximumSet_Gen.json
 */
async function virtualMachineAttachDetachDataDisksMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.attachDetachDataDisks(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaa",
    {
      dataDisksToAttach: [
        {
          lun: 1,
          diskId:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_0_disk2_6c4f554bdafa49baa780eb2d128ff39d",
          diskEncryptionSet: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
          },
          caching: "ReadOnly",
          deleteOption: "Delete",
          writeAcceleratorEnabled: true,
        },
        {
          lun: 2,
          diskId:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_2_disk3_7d5e664bdafa49baa780eb2d128ff38e",
          diskEncryptionSet: {
            id: "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/diskEncryptionSets/{existing-diskEncryptionSet-name}",
          },
          caching: "ReadWrite",
          deleteOption: "Detach",
          writeAcceleratorEnabled: false,
        },
      ],
      dataDisksToDetach: [
        {
          diskId:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_1_disk1_1a4e784bdafa49baa780eb2d128ff65x",
          detachOption: "ForceDetach",
        },
        {
          diskId:
            "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_4_disk4_4d4e784bdafa49baa780eb2d256ff41z",
          detachOption: "ForceDetach",
        },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to attach and detach data disks to/from the virtual machine.
 *
 * @summary attach and detach data disks to/from the virtual machine.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_AttachDetachDataDisks_MinimumSet_Gen.json
 */
async function virtualMachineAttachDetachDataDisksMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.attachDetachDataDisks("rgcompute", "azure-vm", {
    dataDisksToAttach: [
      {
        diskId:
          "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_0_disk2_6c4f554bdafa49baa780eb2d128ff39d",
      },
    ],
    dataDisksToDetach: [
      {
        diskId:
          "/subscriptions/{subscription-id}/resourceGroups/myResourceGroup/providers/Microsoft.Compute/disks/vmss3176_vmss3176_1_disk1_1a4e784bdafa49baa780eb2d128ff65x",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await virtualMachineAttachDetachDataDisksMaximumSetGen();
  await virtualMachineAttachDetachDataDisksMinimumSetGen();
}

main().catch(console.error);
