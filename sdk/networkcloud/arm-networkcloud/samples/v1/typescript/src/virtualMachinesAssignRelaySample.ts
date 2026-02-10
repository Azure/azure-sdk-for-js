// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VirtualMachineAssignRelayParameters,
  VirtualMachinesAssignRelayOptionalParams} from "@azure/arm-networkcloud";
import {
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 *
 * @summary Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/VirtualMachines_AssignRelay.json
 */
async function assignRelayToTheMicrosoftHybridComputeMachineForAVirtualMachine(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const virtualMachineName = "virtualMachineName";
  const virtualMachineAssignRelayParameters: VirtualMachineAssignRelayParameters =
    {
      machineId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.HybridCompute/machines/machineName",
      relayType: "Platform",
    };
  const options: VirtualMachinesAssignRelayOptionalParams = {
    virtualMachineAssignRelayParameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.virtualMachines.beginAssignRelayAndWait(
    resourceGroupName,
    virtualMachineName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await assignRelayToTheMicrosoftHybridComputeMachineForAVirtualMachine();
}

main().catch(console.error);
