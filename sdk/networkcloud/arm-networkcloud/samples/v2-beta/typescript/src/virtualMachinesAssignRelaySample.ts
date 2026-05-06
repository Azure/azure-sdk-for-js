// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 *
 * @summary assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 * x-ms-original-file: 2026-05-01-preview/VirtualMachines_AssignRelay.json
 */
async function assignRelayToTheMicrosoftHybridComputeMachineForAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.virtualMachines.assignRelay(
    "resourceGroupName",
    "virtualMachineName",
    {
      virtualMachineAssignRelayParameters: {
        machineId:
          "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.HybridCompute/machines/machineName",
        relayType: "Platform",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assignRelayToTheMicrosoftHybridComputeMachineForAVirtualMachine();
}

main().catch(console.error);
