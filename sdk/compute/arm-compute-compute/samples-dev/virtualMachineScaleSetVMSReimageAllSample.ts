// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks.
 *
 * @summary allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_ReimageAll_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMReimageAllMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.reimageAll(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks.
 *
 * @summary allows you to re-image all the disks ( including data disks ) in the a VM scale set instance. This operation is only supported for managed disks.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_ReimageAll_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMReimageAllMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.reimageAll(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMReimageAllMaximumSetGen();
  await virtualMachineScaleSetVMReimageAllMinimumSetGen();
}

main().catch(console.error);
