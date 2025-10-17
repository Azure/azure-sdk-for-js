// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts one or more virtual machines in a VM scale set.
 *
 * @summary starts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Start_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetStartMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.start(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    { vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to starts one or more virtual machines in a VM scale set.
 *
 * @summary starts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Start_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetStartMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.start("rgcompute", "aaaaaaaaaaaaaaaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetStartMaximumSetGen();
  await virtualMachineScaleSetStartMinimumSetGen();
}

main().catch(console.error);
