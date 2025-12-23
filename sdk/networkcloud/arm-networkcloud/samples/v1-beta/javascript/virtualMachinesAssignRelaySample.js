// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 *
 * @summary Assigns a relay to the specified Microsoft.HybridCompute machine associated with the provided virtual machine.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/preview/2025-07-01-preview/examples/VirtualMachines_AssignRelay.json
 */
async function assignRelayToTheMicrosoftHybridComputeMachineForAVirtualMachine() {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] || "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName = process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const virtualMachineName = "virtualMachineName";
  const virtualMachineAssignRelayParameters = {
    machineId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.HybridCompute/machines/machineName",
    relayType: "Platform",
  };
  const options = {
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

async function main() {
  await assignRelayToTheMicrosoftHybridComputeMachineForAVirtualMachine();
}

main().catch(console.error);
