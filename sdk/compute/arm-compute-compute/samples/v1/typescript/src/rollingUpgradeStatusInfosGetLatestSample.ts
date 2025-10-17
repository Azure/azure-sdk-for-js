// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of the latest virtual machine scale set rolling upgrade.
 *
 * @summary gets the status of the latest virtual machine scale set rolling upgrade.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_GetLatest_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeGetLatestMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.rollingUpgradeStatusInfos.getLatest(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of the latest virtual machine scale set rolling upgrade.
 *
 * @summary gets the status of the latest virtual machine scale set rolling upgrade.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_GetLatest_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeGetLatestMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.rollingUpgradeStatusInfos.getLatest("rgcompute", "aaaaaaaaaaaaaaaaa");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetRollingUpgradeGetLatestMaximumSetGen();
  await virtualMachineScaleSetRollingUpgradeGetLatestMinimumSetGen();
}

main().catch(console.error);
