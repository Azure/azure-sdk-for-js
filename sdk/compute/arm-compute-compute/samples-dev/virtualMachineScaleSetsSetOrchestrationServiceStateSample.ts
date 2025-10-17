// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to changes ServiceState property for a given service
 *
 * @summary changes ServiceState property for a given service
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_SetOrchestrationServiceState_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetSetOrchestrationServiceStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.setOrchestrationServiceState(
    "rgcompute",
    "aaaaaaaaaaaaaaaa",
    { serviceName: "AutomaticRepairs", action: "Resume" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to changes ServiceState property for a given service
 *
 * @summary changes ServiceState property for a given service
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_SetOrchestrationServiceState_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetSetOrchestrationServiceStateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.setOrchestrationServiceState(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    { serviceName: "AutomaticRepairs", action: "Resume" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetSetOrchestrationServiceStateMaximumSetGen();
  await virtualMachineScaleSetSetOrchestrationServiceStateMinimumSetGen();
}

main().catch(console.error);
