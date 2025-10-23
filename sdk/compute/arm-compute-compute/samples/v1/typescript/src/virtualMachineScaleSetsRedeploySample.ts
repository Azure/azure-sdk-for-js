// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 *
 * @summary shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Redeploy_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRedeployMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.redeploy(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 *
 * @summary shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Redeploy_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRedeployMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.redeploy(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetRedeployMaximumSetGen();
  await virtualMachineScaleSetRedeployMinimumSetGen();
}

main().catch(console.error);
