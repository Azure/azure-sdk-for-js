// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to attach and detach data disks to/from a virtual machine in a VM scale set.
 *
 * @summary attach and detach data disks to/from a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_AttachDetachDataDisks_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMAttachDetachDataDisksMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.attachDetachDataDisks(
    "rgcompute",
    "azure-vmscaleset",
    "0",
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
 * This sample demonstrates how to attach and detach data disks to/from a virtual machine in a VM scale set.
 *
 * @summary attach and detach data disks to/from a virtual machine in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_AttachDetachDataDisks_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMAttachDetachDataDisksMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.attachDetachDataDisks(
    "rgcompute",
    "azure-vmscaleset",
    "0",
    {
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
    },
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetVMAttachDetachDataDisksMaximumSetGen();
  await virtualMachineScaleSetVMAttachDetachDataDisksMinimumSetGen();
}

main().catch(console.error);
