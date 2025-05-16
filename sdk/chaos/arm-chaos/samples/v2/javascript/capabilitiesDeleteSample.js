// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Capability that extends a Target resource.
 *
 * @summary delete a Capability that extends a Target resource.
 * x-ms-original-file: 2025-01-01/Capabilities_Delete.json
 */
async function deleteACapabilityThatExtendsAVirtualMachineTargetResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.capabilities.delete(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
    "Microsoft-VirtualMachine",
    "Shutdown-1.0",
  );
}

async function main() {
  await deleteACapabilityThatExtendsAVirtualMachineTargetResource();
}

main().catch(console.error);
