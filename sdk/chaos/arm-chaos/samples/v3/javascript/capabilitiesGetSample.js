// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Capability resource that extends a Target resource.
 *
 * @summary get a Capability resource that extends a Target resource.
 * x-ms-original-file: 2025-01-01/Capabilities_Get.json
 */
async function getACapabilityThatExtendsAVirtualMachineTargetResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.capabilities.get(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
    "Microsoft-VirtualMachine",
    "Shutdown-1.0",
  );
  console.log(result);
}

async function main() {
  await getACapabilityThatExtendsAVirtualMachineTargetResource();
}

main().catch(console.error);
