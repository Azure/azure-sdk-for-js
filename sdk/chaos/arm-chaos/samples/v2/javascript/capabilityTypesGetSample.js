// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Capability Type resource for given Target Type and location.
 *
 * @summary get a Capability Type resource for given Target Type and location.
 * x-ms-original-file: 2025-01-01/CapabilityTypes_Get.json
 */
async function getACapabilityTypeForAVirtualMachineTargetResourceOnWestus2Location() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.capabilityTypes.get(
    "westus2",
    "Microsoft-VirtualMachine",
    "Shutdown-1.0",
  );
  console.log(result);
}

async function main() {
  await getACapabilityTypeForAVirtualMachineTargetResourceOnWestus2Location();
}

main().catch(console.error);
